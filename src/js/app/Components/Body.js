import React, { useEffect, useState } from 'react';

import "@styles/style.scss";

const Body = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');


  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch('https://staging.webxr.link/wp-json/wp/v2/pages?slug=webxr-open-source-fellowship&_embed');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        const page = data[0];

        if (page && page._embedded && page._embedded['wp:featuredmedia']) {
          const mediaData = page._embedded['wp:featuredmedia'][0];
          const imageUrl = mediaData.media_details.sizes.full.source_url;
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchImageData();
    
  }, []);


  return (
    <>
   
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
    
    {/* <div className="mainpage">
      <h1 className='body-head'>WEBXR  OPEN SOURCE FELLOWSHIP</h1>
      <p className='mb-4 body-text'>
        “I think it’s actually our obligation and duty to figure out on our side what can we do to make the VR platform take advantage of this trillion plus dollars of content on all of the flat screens.”
      - 
        <i> John Carmack, Meta Connect Keynote, 2021</i>
        <br></br>
        <br></br>
        This quote is an essential reminder, that there is an enormous amount of
        text, images, and video waiting to populate XR worlds. 42% of all
        websites on the internet use WordPress as a Content Management System
        (CMS). Our open-source project aims to make it easy to enable WebXR in
        WordPress using a customizable theme. This will empower content owners
        to publish their assets already stored in 2D sites into an immersive
        format.
        <br></br>
        <br></br>
        The strategic approach of enabling entire content libraries stored in
        WordPress to be presented in WebXR will propel the growth of the
        Immersive Web, by allowing sites to gradually phase-in presentation of
        content in Virtual and Augmented Reality without having to change CMS
        platforms. WordPress's impressive reach, with over 400 million websites
        using it, and a 64.3% share of the CMS market, makes converting
        WordPress websites into 3D Experiences a massive market opportunity
        which will draw developer talent to advance their careers in the
        Metaverse.
        <br></br>
        <br></br>
        Over the past three years, Powersimple has been using WordPress as an
        effective admin tool to structure data and populate WebXR sites, with
        text and image content, and even interactive 3D models. This effectively
        bridges the gap between the 2D internet of the past and the Immersive
        Web of the future. The XROS Fellowship, sponsored by FICCI (Federation
        of Indian Chambers of Commerce & Industry) and Meta, is sponsoring a
        stipend for six talented students who have been selected from a pool of
        120 applicants, to dedicate over 2,000 hours of development time toward
        repackaging this open-source theme for mass-market use. The project is
        guided by Ben Erwin, who has over 25-years of experience as a web
        developer, with 15 specializing in WordPress.
        <br></br>
      </p>
    </div> */}
    </>
  );
};

export default Body;
