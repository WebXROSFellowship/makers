import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";
import { MenuDataContext } from "../Utils";
import "@styles/style.scss"

const Profile = () => {
  const { username } = useParams();
  const { lang } = useContext(DataContext);
  const { menuData } = useContext(MenuDataContext);

  const curl = "/profile/"+username+"/";
  const data = menuData[lang];
  const cd = data?.filter((e) => e?.url === curl);
  const content = cd[0]?.content || "";
  const userName = cd[0]?.title;

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://staging.webxr.link/wp-json/wp/v2/media?media`)
      .then((response) => response.json())
      .then((data) => {
        const profileImage = data.find((image) => image.slug === username);
        const imageUrl = profileImage ? profileImage.guid.rendered : "";
        setImages([imageUrl]);
      })
      .catch((error) => console.log(error));
  }, [username]);

  return (
    <>
      <h1>{userName}</h1>
      {images.map((imageUrl, index) => (
        <div key={index} className="profile_container">
        <img src={imageUrl} alt={`Image ${index}`} className="profile-img" />
        </div>
      ))}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
    </>
  );
};

export default Profile;