import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";
import { AppConfig } from "../../config/AppConfig";
import { DataContext } from "../../utils";
import { AppLoader } from "../../components";
import { AFrame, NotFound } from "../index";
import { ApiEndpoint } from "../../config/ApiEndpoint";
import { HttpRequest } from "../../config/ApiConfig";

const Body = () => {
  const base_url = AppConfig.SITE_URL;
  const httpRequest = HttpRequest(); // Create an instance of the HttpRequest module
  const { slug_name } = useParams();
  const { lang, menuData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined && "/" + slug_name + "/";

  useEffect(() => {
    getPagesData();
  }, [lang, menuData, slug_name]);


  const getPagesData = async () => {
    const url = `/${lang}${ApiEndpoint.GET_PAGES}?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;
    try {
      setLoading(true);
      httpRequest
        .httpGet(url)
        .then((result) => {
          console.log("GET_PAGES Api Result...", result);
          result?.map((pageData) => {
            if (pageData?.id == AppConfig?.SITE_FRONT_PAGE) {
              setData(pageData);
            } else {
              if (pageData?.slug === slug_name) {
                // console.log(
                //   "menuItem with page",
                //   pageData?.slug,
                //   slug_name,
                //   curl
                // );
                setData(pageData);
              } else {
                // console.log("menuItem without page", pageData, curl);
              }
            }
          });
        })
        .catch((error) => {
          console.log("Error when getting PAGES data", error);
        })
        .finally((result) => {
          console.log("finaly response", result);
          setLoading(false);
        });
    } catch (error) {
      console.log("Exception comming while getPagesData", error);
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          {data ? (
            <div className="content">
              {data?.properties_3D?.use_aframe ? (
                <AFrame aFrameData={data} />
              ) : (
                <div className="container">
                  <h1>{data?.title?.rendered}</h1>

                  {data?.post_media?._thumbnail_id[0]?.full_path && (
                    <div className="featured-image">
                      <img
                        src={data?.post_media?._thumbnail_id[0]?.full_path}
                        alt={data?.post_media?._thumbnail_id[0]?.alt}
                      />
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.content?.rendered,
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
};

export default Body;
