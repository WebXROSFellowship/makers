import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@styles/style.scss";
import { AppConfig } from "../../config/appConfig";
import { DataContext } from "../../utils";
import { AppLoader } from "../../components";
import { AFrame, NotFound } from "../index";

const Body = () => {
  const base_url = AppConfig.SITE_URL;
  const { slug_name } = useParams();
  const { lang } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const curl = slug_name !== undefined && "/" + slug_name + "/";

  useEffect(() => {
    fetchdata();
  }, [lang, slug_name]);

  const fetchdata = async () => {
    const url = `${base_url}/${lang}/wp-json/wp/v2/pages?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        result.map((pageData) => {
          if (pageData?.id == AppConfig?.SITE_FRONT_PAGE) {
            setData(pageData);
            setLoading(false);
          } else {
            if (pageData?.slug === slug_name) {
              console.log("menuItem with page", pageData, curl);
              setData(pageData);
              setLoading(false);
            } else {
              setLoading(false);
              // console.log("menuItem without page", pageData, curl);
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
      <div className="container-fluid">
        {loading ? (
          <AppLoader />
        ) : (
          <div>
            {data ? (
              <div>
                {data?.properties_3D?.use_aframe ? (
                  <AFrame aframeData={data}/>
                ) : (
                  <div className="content">
                    <h1
                      dangerouslySetInnerHTML={{
                        __html: data?.title?.rendered,
                      }}
                    />

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
                )}
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

export default Body;
