import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";
import { AppConfig } from "../../config/AppConfig";
import { DataContext } from "../../utils";
import { AppLoader } from "../../components";
import { NotFound } from "../index";
import { ApiEndpoint } from "../../config/ApiEndpoint";
import { HttpRequest } from "../../config/ApiConfig";

const Posts = () => {
  const base_url = AppConfig.SITE_URL;
  const httpRequest = HttpRequest(); // Create an instance of the HttpRequest module
  const { slug_name } = useParams();
  const { lang, menuData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined ? "/" + slug_name + "/" : "";

  useEffect(() => {
    // console.log("param", slug_name);
    getPostsData();
  }, [lang, menuData, slug_name]);


  const getPostsData = async () => {
    const url = `/${lang}${ApiEndpoint.GET_POSTS}?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;
    try {
      setLoading(true);
      httpRequest
        .httpGet(url)
        .then((result) => {
          console.log("posts result", result);
          result.map((postData) => {
            if (postData?.id == AppConfig?.SITE_FRONT_PAGE) {
              setData(postData);
            } else {
              if (postData?.slug === slug_name) {
                console.log(
                  "menuItem with page",
                  postData?.slug,
                  slug_name,
                  curl
                );
                setData(postData);
              } else {
                // console.log("menuItem without page", postData, curl);
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
      console.log("Exception comming while getPostsData", error);
    }
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <AppLoader />
        ) : (
          <div>
            {data ? (
              <div className="dynamic">
                {data?.post_media?._thumbnail_id[0]?.full_path && (
                  <img
                    src={data?.post_media?._thumbnail_id[0]?.full_path}
                    alt={data?.post_media?._thumbnail_id[0]?.alt}
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.content?.rendered,
                  }}
                />
              </div>
            ) : (
              <NotFound />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
