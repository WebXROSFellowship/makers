import React from 'react'
import "./../../../scss/style.scss";

const Body = () => {


const SITE_URL=process.env.SITE_URL;
  const HOME_URL=process.env.HOME_URL;
  const SITE_TITLE=process.env.SITE_TITLE;
  const SITE_TAGLINE=process.env.SITE_TAGLINE;

  console.log("Site url", SITE_URL);


  return (
    <div class='mainpage'>
      <h1>WEBXR  OPEN SOURCE FELLOWSHIP</h1>
      <p style={{ marginBottom: '20px' }}>
        “I think it’s actually our obligation and duty to figure out on our side what can we do to make the VR platform take advantage of this trillion plus dollars of content on all of the flat screens.”
      - 
        <i> John Carmack, Meta Connect Keynote, 2021</i>
        <br></br>
        <br></br>
        This quote is an essential reminder, that there is an enormous amount of text, images, and video waiting to populate XR worlds. 42% of all websites on the internet use WordPress as a Content Management System (CMS). Our open-source project aims to make it easy to enable WebXR in WordPress using a customizable theme. This will empower content owners to publish their assets already stored in 2D sites into an immersive format.
        <br></br>
        <br></br>
        The strategic approach of enabling entire content libraries stored in WordPress to be presented in WebXR will propel the growth of the Immersive Web, by allowing sites to gradually phase-in presentation of content in Virtual and Augmented Reality without having to change CMS platforms. WordPress's impressive reach, with over 400 million websites using it, and a 64.3% share of the CMS market, makes converting WordPress websites into 3D Experiences a massive market opportunity which will draw developer talent to advance their careers in the Metaverse.
    
      <br></br>
      <br></br>
        Over the past three years, Powersimple has been using WordPress as an effective admin tool to structure data and populate WebXR sites, with text and image content, and even interactive 3D models. This effectively bridges the gap between the 2D internet of the past and the Immersive Web of the future. The XROS Fellowship, sponsored by FICCI (Federation of Indian Chambers of Commerce & Industry) and Meta, is sponsoring a stipend for six talented students who have been selected from a pool of 120 applicants, to dedicate over 2,000 hours of development time toward repackaging this open-source theme for mass-market use. The project is guided by Ben Erwin, who has over 25-years of experience as a web developer, with 15 specializing in WordPress.
      </p>
    </div>
  )
}  

export default Body;