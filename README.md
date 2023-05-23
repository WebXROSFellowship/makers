# Makers

A Pilot Repository for the XROS Fellowship x Powersimple Project.

## Objective

This hybrid uses AFrame with Wordpress. We are looking forward to building the Aframe functions that would help us to edit or alter the progress in WebXR, while developing. A collection of experiences made with WebXR, which brings together AR and VR on the web to make them more convenient and widely accessible. We’re making it more viable by giving the accessibility to explore more with WebXR. Are you tired of switching back and forth between your text editor, the Inspector, and refreshing? Now you can save your changes from the Inspector directly to your HTML files. The Inspector has built-in support with a save button for the Watcher. Just make sure your entities have defined IDs.

## Setting Up For Developers

1. Use a suitable server engine to set up wordpress, phpMyAdmin and Apache.
2. Inside the wordpress folder, look for wp-content > themes , clone the makers repository here.
3. lnstall node modules

   ```
   npm install
   ```
4. Run the server

   ```
   npm run start
   ```
5. Set up database from sql folder
6. Add the following plugins:

   ```
   * CMS Page Tree View
   * Admin Menu Tree Page View
   * Enable Media Replace
   * Hide Admin Bar
   * Metabox 
   * SVG Support
   * WP REST API - filter fields
   * WPML CMS Nav
   * WPML Media
   * WPML Multilingual CMS
   * WPML Sticky Links
   * WPML String Translation
   ```
7. Add the following commands to wp-config:

   ```
   // to redirect to localhost
   define('WP_HOME','[https://localhost/yourinstall/'](https://localhost/yourinstall/' "https://localhost/yourinstall/'"));
   define('WP_SITEURL','[https://localhost/yourinstall/'](https://localhost/yourinstall/' "https://localhost/yourinstall/'"));

   //this is needed to post glbs
   define('ALLOW_UNFILTERED_UPLOADS', true);
   ```

## Description

1. Data access through REST API in JSON Format
2. Responsive Mega Navigation Menu
3. Multi-lingualism for accessibility.
4. AFRAME integration.
5. Added Accessibility.
6. Added Routing, Profile Pages
7. Dynamic 3d assets retrieval, rendering and saving.
