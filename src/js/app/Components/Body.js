import React, { useEffect, useState } from 'react';

import "@styles/style.scss";
import AppConfig from "../config/appConfig";

const Body = () => {
  const base_url = AppConfig.SITE_URL;
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/wp-json/wp/v2/pages?pages`);
        const data = await response.json();
        const entry = data.find((item) => item.slug === 'webxr-open-source-fellowship');
        if (entry) {
          const contentRendered = entry.content.rendered;
          setContent(contentRendered);

          if (entry._links && entry._links['wp:featuredmedia']) {
            const mediaResponse = await fetch(entry._links['wp:featuredmedia'][0].href);
            const mediaData = await mediaResponse.json();
            const imageUrl = mediaData.media_details.sizes.full.source_url;
            setImageUrl(imageUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
  
    <div className="dynamic">
     {imageUrl ? (
  <img src={imageUrl} alt="Featured Image"/>
) : null}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>

    
  );
};

export default Body;
