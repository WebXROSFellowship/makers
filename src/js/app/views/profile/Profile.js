import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";

import { AppConfig } from "../../config/appConfig";
import { AppLoader } from "../../components";
import {NotFound} from "../index";
import { DataContext } from "../../utils";

const Profile = () => {
  const base_url = AppConfig.SITE_URL;
  const { slug_name } = useParams();
  const { lang, menuData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined && "/profile/" + slug_name + "/";

  useEffect(() => {
    fetchdata();
  }, [lang, menuData, slug_name]);

  const fetchdata = async () => {
    const url = `${base_url}/${lang}/wp-json/wp/v2/profile?fields=id,type,title,content,slug,excerpt,post_media,languages,meta,info,seo,featured_media,screen_images,featured_video,type,industry,support_hardware,feature,thumbnail_url,collaboration_type,platform,cats,tags&filter[orderby]=post_title&order=asc&per_page=100&page=1`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        result.map((profileData) => {
          if (profileData?.id == AppConfig?.SITE_FRONT_PAGE) {
            setData(profileData);
            setLoading(false);
          } else {
            if (profileData?.slug === slug_name) {
              console.log(
                "menuItem with page",
                profileData?.slug,
                slug_name,
                curl
              );
              setData(profileData);
              setLoading(false);
            } else {
              setLoading(false);
              // console.log("menuItem without page", profileData, curl);
            }
          }
        });
      })
      .catch((error) => {
        console.log("Error when getting body data", error);
      });
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
