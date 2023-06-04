import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";

const Profile = () => {
  const { username } = useParams();
  const { data } = useContext(DataContext);
  const cd = data.filter((e) => e.slug === username);
  const content = cd[0].content || "";
  const userName = cd[0].title;

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
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ))}
    </>
  );
};

export default Profile;