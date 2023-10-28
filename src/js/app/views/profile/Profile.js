import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";

import { AppConfig } from "../../config/AppConfig";
import { AppLoader } from "../../components";
import {NotFound} from "../index";
import { DataContext } from "../../utils";
import { ApiEndpoint } from "../../config/ApiEndpoint";
import { HttpRequest } from "../../config/ApiConfig";

const Profile = () => {
  const base_url = AppConfig.SITE_URL;
  const httpRequest = HttpRequest(); // Create an instance of the HttpRequest module
  const { slug_name } = useParams();
  const { lang, menuData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined && "/profile/" + slug_name + "/";

  useEffect(() => {
    getProfilesData();
  }, [lang, menuData, slug_name]);


  const getProfilesData = async () => {
    const url = `/${lang}${ApiEndpoint.GET_PROFILES}?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;
    try {
      setLoading(true);
      httpRequest
        .httpGet(url)
        .then((result) => {
          result.map((profileData) => {
            if (profileData?.id == AppConfig?.SITE_FRONT_PAGE) {
              setData(profileData);
            } else {
              if (profileData?.slug === slug_name) {
                console.log(
                  "menuItem with page",
                  profileData?.slug,
                  slug_name,
                  curl
                );
                setData(profileData);
              } else {
                setLoading(false);
                // console.log("menuItem without page", profileData, curl);
              }
            }
          });
        })
        .catch((error) => {
          console.log("Error when getting body data", error);
        })
        .finally((result) => {
          console.log("finaly response", result);
          setLoading(false);
        });
    } catch (error) {
      console.log("Exception comming while getProfilesData", error);
    }
  };


  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          {data ? (
            <div className="profile">
              <div>
                <h1 className="profile-text"> {data?.title?.rendered}</h1>
                {data?.post_media?._thumbnail_id[0]?.full_path && (
                  <div className="profile_container">
                    <img
                      src={data?.post_media?._thumbnail_id[0]?.full_path}
                      alt={data?.post_media?._thumbnail_id[0]?.alt}
                      className="profile-img"
                    />
                  </div>
                )}
                <div
                  className="profile-text"
                  dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}
                />
              </div>
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default Profile;
