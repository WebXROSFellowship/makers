import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";
import { AppConfig } from "../../config/appConfig";
import { DataContext } from "../../utils";
import { AppLoader } from "../../components";
import { NotFound } from "../index";

const Posts = () => {
  const base_url = AppConfig.SITE_URL;
  const { slug_name } = useParams();
  const { lang, menuData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined ? "/" + slug_name + "/" : "";

  useEffect(() => {
    console.log("param", slug_name);
    fetchdata();
  }, [lang, menuData, slug_name]);

  const fetchdata = async () => {
    const url = `${base_url}/${lang}/wp-json/wp/v2/posts?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,video,type,cats,tags&filter[orderby]=ID&order=asc&per_page=100`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("posts result", result);
        result.map((postData) => {
          if (postData?.id == AppConfig?.SITE_FRONT_PAGE) {
            setData(postData);
            setLoading(false);
          } else {
            if (postData?.slug === slug_name) {
              console.log(
                "menuItem with page",
                postData?.slug,
                slug_name,
                curl
              );
              setData(postData);
              setLoading(false);
            } else {
              setLoading(false);
              // console.log("menuItem without page", postData, curl);
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
