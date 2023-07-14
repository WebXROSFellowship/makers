import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";
import { AppConfig } from "../../config/appConfig";
import { DataContext, MenuDataContext } from "../../utils";
import { AppLoader } from "../../components";
import { NotFound } from "../index";

const Posts = () => {
  const base_url = AppConfig.SITE_URL;
  const { slug_name } = useParams();
  const { lang } = useContext(DataContext);
  const { menuData } = useContext(MenuDataContext);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined ? "/" + slug_name + "/" : "";
  const menus = [];

  useEffect(() => {
    console.log("param", slug_name);
    fetchdata();
  }, [lang, slug_name]);

  const fetchdata = async () => {
    const url = `${base_url}/${lang}/wp-json/wp/v2/posts`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("posts result", result);
        menuData.map((item) => {
          item?.items?.filter((childItem) => {
            if (childItem?.object == "post") {
              menus.push(childItem);
            }
          });
        });
        console.log("post menus", menus);
        result.map((postData) => {
          // console.log("page ", postData?.slug);
          if (!postData?.properties_3D?.use_aframe) {
            // console.log("page data without Aframe...", postData);
            menus.map((item) => {
              if (item?.url === curl) {
                console.log("menuItem with post", item, curl);
                setData(postData);
                setLoading(false);
              } else {
                setLoading(false);
              }
            });
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
