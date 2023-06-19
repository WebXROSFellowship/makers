import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { StagingDataContext } from "../utils";
import "@styles/style.scss";

import AppConfig from "../config/appConfig";

const Profile = () => {
  const { username } = useParams();
  const { stagingData } = useContext(StagingDataContext);

  const curl = "/profile/" + username + "/";
  const data = stagingData;
  const cd = data?.filter((e) => e?.url === curl);
  const content = cd[0]?.content || "";
  const titleName = cd[0]?.title;
  const [imgLink, setImgLink] = useState("");

  const base_url = AppConfig.SITE_URL;

  useEffect(() => {
    fetch(`${base_url}/wp-json/wp/v2/media?media`)
      .then((response) => response.json())
      .then((data) => {
        const profileImage = data?.find((image) => image?.slug === username);
        const imageUrl = profileImage ? profileImage.guid.rendered : "";
        setImgLink(imageUrl);
      })
      .catch((error) => console.log(error));
  }, [username]);

  return (
    <>
      <h1 className="profile-text">{titleName}</h1>
      <div className="profile_container">
        <img src={imgLink} alt={`${titleName}`} className="profile-img" />
      </div>
      <div
        className="profile-text"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default Profile;
