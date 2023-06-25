import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../utils";

import "@styles/style.scss";
import AppConfig from "../config/appConfig";


const Body = () => {
  const base_url = AppConfig.SITE_URL;
  const [loading, setLoading] = useState(true);
  const [bodyData, setBodyData] = useState("");
  const {lang, setLang} = useContext(DataContext);

  useEffect(() => {
    fetchBodyData();
  }, [lang]);

  const fetchBodyData = async () => {
    const url = `${base_url}/${lang}/wp-json/wp/v2/pages`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        result.map((data) => {
          if (data.slug === "webxr-open-source-fellowship") {
            console.log("image", data?.post_media?._thumbnail_id[0]?.full_path);
            setBodyData(data);
            setLoading(false);
          } else {
            console.log("no data found");
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        console.log("Error when getting body data", error);
      });
  };

  return (
    <div className="container">
      {loading ? (
        <div className="container-md">
          <h1 className="h1">Loading...</h1>
        </div>
      ) : (
        <div>
          {bodyData ? (
            <div className="dynamic">
              {bodyData?.post_media?._thumbnail_id[0]?.full_path ? (
                <img
                  src={bodyData?.post_media?._thumbnail_id[0]?.full_path}
                  alt={bodyData?.post_media?._thumbnail_id[0]?.alt}
                />
              ) : null}
              <div
                dangerouslySetInnerHTML={{
                  __html: bodyData?.content?.rendered,
                }}
              />
            </div>
          ) : (
            <div className="container-md">
              <h1 className="h1">Data not Found...</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Body;
