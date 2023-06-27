import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { StagingDataContext,DataContext } from "../utils";
import "@styles/style.scss";

import {AppConfig} from "../config/appConfig";

const Profile = () => {
  const { username } = useParams();
  const { stagingData } = useContext(StagingDataContext);
  const {lang, setLang} = useContext(DataContext);


  const curl = "/profile/" + username + "/";
  const data = stagingData;
  const cd = data?.filter((e) => e?.url === curl);
  const content = cd[0]?.content || "";
  const titleName = cd[0]?.title;
  const [imgLink, setImgLink] = useState("");

  const base_url = AppConfig.SITE_URL;

  useEffect(() => {
    fetch(`${base_url}/${lang}/wp-json/wp/v2/profile?fields=id,link,thumbnail_url,&filter[orderby]=post_title&order=asc&per_page=100&page=1`)
      .then((response) => response.json())
      .then((data) => {
		const data_id = cd[0]?.object_id || "";
        const profileImage = data?.find((image) => image?.id == data_id);
        const imageUrl = profileImage ? profileImage.thumbnail_url.large : "";
        setImgLink(base_url + imageUrl);
      })
      .catch((error) => console.log(error));
  }, [username,cd]);

  return (
    
    <div><h1 className="profile-text">{titleName}</h1>
      <div className="profile_container">
        <img src={imgLink} alt={`${titleName}`} className="profile-img" />
      </div>
      <div
        className="profile-text"
        dangerouslySetInnerHTML={{ __html: content }}
      /></div>

  );
};

export default Profile;
