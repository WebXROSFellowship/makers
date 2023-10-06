import React, { useState, useEffect, useRef, useContext } from "react";
import { AppConfig } from "../../config/AppConfig";
import { AppLoader } from "../../components";
import { DataContext } from "../../utils";

const AFrame = (props) => {
  const base_url = AppConfig.SITE_URL;
  const upload_dir = `${base_url}/wp-content/uploads/`;
  const AFrameData = props?.aframeData;
  // const PAGE_SLUG = AFrameData?.slug;
  // const { activeLanguages } = useContext(DataContext); // For all languages supported
  const [loading, setLoading] = useState(true); // For asset loading
  // const [elementDetected, setElementDetected] = useState(false); // For inspector loaded
  // const langRef = useRef(null); // Current language state
  // const prev_langRef = useRef(null); // Previous language state
  // const data = useRef([{}]); // Data from inspector

  // langRef.current = AFrameData?.languages?.default;
  // prev_langRef.current = AFrameData?.languages?.default;

  useEffect(() => {
    console.log("AFrame Data....", AFrameData);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      {AFrameData && (
        <a-scene
          embedded
          environment="preset: forest; ground: canyon; groundTexture: checkerboard; groundColor: #445; grid: cross;"
          loading-screen="enabled: true;dotsColor: red; backgroundColor: black"
          device-orientation-permission-ui="enabled: false"
          vr-mode-ui="enabled: true"
          webxr="requiredFeatures: hit-test,local-floor;
                optionalFeatures: dom-overlay,unbounded;
                overlayElement: #overlay;"
          cursor="rayOrigin: mouse; fuse: false"
          raycaster="objects: .raycastable"
        >
          {/* assets loading */}
          <a-assets timeout="5000">
            {/* <a-asset-item
              id="skybox"
              src={upload_dir + AFrameData?.properties_3D?.skybox?.src}
              crossOrigin="anonymous"
            ></a-asset-item> */}

            <a-asset-item
              id="world_model"
              src={upload_dir + AFrameData?.properties_3D?.world_model?.src}
              crossOrigin="anonymous"
            ></a-asset-item>
            <a-asset-item
              id="nav_mesh"
              src={upload_dir + AFrameData.properties_3D?.nav_mesh?.src}
              crossOrigin="anonymous"
            ></a-asset-item>
            {AFrameData?.properties_3D?.furniture?.map((furniture) => {
              return (
                <a-asset-item
                  key={furniture?.id}
                  id={furniture?.id}
                  src={base_url + furniture?.full_path}
                  crossOrigin="anonymous"
                ></a-asset-item>
              );
            })}

            {AFrameData?.post_media?.screen_image?.map((scientist) => {
              return (
                <img
                  key={scientist?.id}
                  id={scientist?.id}
                  src={base_url + scientist?.full_path}
                  alt={scientist?.alt}
                  crossOrigin="anonymous"
                ></img>
              );
            })}
          </a-assets>

          {/* CameraRig, Camera and Conrols */}
          <a-entity
            id="cameraRig"
            position="25 10 0"
            rotation-reader
            thumbstick-logging
            movement-controls="constrainToNavMesh: true; speed:1; controls: checkpoint, gamepad, trackpad, keyboard, touch, nipple;"
            checkpoint-controls="mode: animate"
            nipple-controls="mode: static"
          >
            <a-entity
              id="camera"
              camera="active: true"
              position="0 1.6 0"
              rotation="-4.469070802020421 -84.91234523838803 0"
              look-controls="pointerLockEnabled: true"
              wasd-controls="acceleration: 100"
              raycaster="far: 5; objects: .clickable"
            >
              <a-entity
                id="cursor"
                animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
                animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
                animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
                cursor="fuse: true; fuseTimeout: 500"
                position="0 0 -1"
                // geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                material="color: black; shader: flat"
                raycaster="far: 5; objects: .clickable"
              ></a-entity>
            </a-entity>

            <a-entity id="controls">
              {/* hands control */}
              <a-entity
                id="leftHand"
                hand-controls="hand: left; handModelStyle: lowPoly; color: #ffcccc"
                raycaster="far: 5; objects: .clickable"
                // teleport-controls="cameraRig: #cameraRig; teleportOrigin: #camera;"
              />
              <a-entity
                id="rightHand"
                raycaster="far: 5; objects: .clickable"
                hand-controls="hand: right; handModelStyle: lowPoly; color: #ffcccc"
                // teleport-controls="cameraRig: #cameraRig; teleportOrigin: #camera;"
              />

              {/* leaser controls */}
              <a-entity
                id="laser-controls-left-hand"
                laser-controls="hand: left"
                raycaster="objects: .clickable"
                cursor="rayOrigin: mouse"
              />
              <a-entity
                id="laser-controls-right-hand"
                laser-controls="hand: right"
                raycaster="objects: .clickable"
                cursor="rayOrigin: mouse"
              />

              {/* Gear VR Controls */}
              <a-entity
                id="gearvr-controls-left-hand"
                gearvr-controls="hand: left"
              />
              <a-entity
                id="gearvr-controls-left-hand"
                gearvr-controls="hand: right"
              />

              {/* Magic-leap Controls */}
              <a-entity
                id="magicleap-controls-left-hand"
                magicleap-controls="hand: left"
              />
              <a-entity
                id="magicleap-controls-right-hand"
                magicleap-controls="hand: right"
              />

              {/* Oculus go Controls */}
              <a-entity
                id="oculus-go-controls-left-hand"
                oculus-go-controls="hand: left"
              />
              <a-entity
                id="oculus-go-controls-right-hand"
                oculus-go-controls="hand: right"
              />

              {/* Oculus touch Controls */}
              <a-entity
                id="oculus-touch-controls-left-hand"
                oculus-touch-controls="hand: left"
              />
              <a-entity
                id="oculus-touch-controls-right-hand"
                oculus-touch-controls="hand: right"
              />

              {/* HTC Vive controllers/wands */}
              <a-entity
                id="vive-controls-left-hand"
                vive-controls="hand: left"
              />
              <a-entity
                id="vive-controls-right-hand"
                vive-controls="hand: right"
              />

              {/* HTC Vive focus controllers/wands */}
              <a-entity
                id="vive-focus-controls-left-hand"
                vive-focus-controls="hand: left"
              />
              <a-entity
                id="vive-focus-controls-right-hand"
                vive-focus-controls="hand: right"
              />

              {/* Windows-Motion-controls */}
              <a-entity
                id="windows-motion-controls-left-hand"
                windows-motion-controls="hand: left"
              />
              <a-entity
                id="windows-motion-controls-right-hand"
                windows-motion-controls="hand: right"
              />
            </a-entity>
          </a-entity>

          {!loading && (
            <a-entity id="meta-world">
              <a-entity
                id="world_model"
                gltf-model="#world_model"
                position="4.537 0 3.468"
              >
                {/* <a-troika-text
            id="Excerpt"
            value={HtmlToText(AFrameData?.excerpt?.rendered)}
            // {...Data_from_Inspector}
          ></a-troika-text>

           {AFrameData?.properties_3D?.furniture?.map((furniture) => {
            var Obj_id = furniture?.slug;
            var Data_from_Inspector = data?.current?.find(
              (obj) => obj?.id == Obj_id
            );
            if (!Data_from_Inspector) {
              Data_from_Inspector = {
                position: "0 1.6 0",
              };
            }
            return (
              <a-entity
                id={furniture?.slug}
                gltf-model={"#" + furniture?.id}
                key={furniture?.id}
                {...Data_from_Inspector}
              ></a-entity>
            );
          })}
          {AFrameData?.post_media?.screen_image?.map((scientist) => {
            var Obj_id = scientist?.slug;
            var Data_from_Inspector = data?.current?.find(
              (obj) => obj?.id == Obj_id
            );
            var desc_format = data?.current?.find(
              (obj) => obj?.class == "desc_wrapper"
            );
            var cap_format = data?.current?.find(
              (obj) => obj?.class == "caption_wrapper"
            );
            var name_format = data?.current?.find(
              (obj) => obj?.class == "name_wrapper"
            );
            var img_format = data?.current?.find(
              (obj) => obj?.class == "image_wrapper"
            );

            if (!Data_from_Inspector) {
              Data_from_Inspector = {
                position: "0 1.6 0",
              };
            }

            return (
              <a-entity
                id={scientist?.slug}
                type="wrapper"
                key={scientist?.id}
                {...Data_from_Inspector}
              >
                <a-image
                  src={"#" + scientist?.id}
                  {...img_format}
                  type="wrapper"
                  class="image_wrapper"
                ></a-image>
                {activeLanguages?.map((lang) => {
                  var font = `${upload_dir}2023/06/NotoSans-Medium.ttf`;
                  if (lang?.code == "zh-hans") {
                    font = `${upload_dir}2023/06/NotoSansSC-Medium.otf`;
                  }
                  return (
                    <a-entity key={lang?.code} id={lang?.code} visible="false">
                      <a-entity id="toggle" visible="false">
                        <a-troika-text
                          class="desc_wrapper"
                          type="wrapper"
                          value={scientist?.trans[lang?.code]?.desc}
                          font={font}
                          visible="true"
                          {...desc_format}
                        ></a-troika-text>
                        <a-troika-text
                          class="caption_wrapper"
                          type="wrapper"
                          value={scientist?.trans[lang?.code]?.caption}
                          font={font}
                          visible="true"
                          {...cap_format}
                        ></a-troika-text>
                        <a-troika-text
                          class="name_wrapper"
                          type="wrapper"
                          value={scientist?.trans[lang?.code]?.title}
                          font={font}
                          visible="true"
                          {...name_format}
                        ></a-troika-text>
                        {activeLanguages?.map((lang) => {
                          var key = lang?.code;
                          var classname = "btn-wrapper-" + key;
                          var insData = data?.current?.find(
                            (obj) => obj?.class == classname
                          );
                          var font = `${upload_dir}2023/06/NotoSans-Medium.ttf`;
                          if (lang.code == "zh-hans") {
                            font = `${upload_dir}2023/06/NotoSansSC-Medium.otf`;
                          }

                          return (
                            <a-troika-text
                              class={classname}
                              type="wrapper"
                              visible="true"
                              key={classname}
                              value={lang?.native_name}
                              code={key}
                              font={font}
                              onClick={handleButtonClick}
                              {...insData}
                            ></a-troika-text>
                          );
                        })}
                      </a-entity>
                    </a-entity>
                  );
                })}
              </a-entity>
            );
          })}  */}
              </a-entity>

              <a-entity
                nav-mesh
                id="nav_mesh"
                gltf-model="#nav_mesh"
                visible="false"
                position="4.762 0 3.739"
              ></a-entity>
            </a-entity>
          )}

          {/* AFrame sky */}
          <a-sky
            id="skybox"
            color="#6EBAA7"
            // src={
            //   "#" +
            //   Object.keys(AFrameData?.properties_3D).find(
            //     (key) => key == "skybox"
            //   )
            // }
          ></a-sky>

          {/* floor collider */}
          <a-plane
            static-body="shape:  mesh"
            position="0 0 -4"
            visible="false"
            rotation="-90 0 0"
            width="4"
            height="4"
            color="#7BC8A4"
            scale="6 2 2"
          ></a-plane>

          {/* AFrame Lights */}

          <a-light
            id="bulb-1"
            type="directional"
            color="#35227A"
            intensity="0.60"
            position="4.40664 0.98434 0.05053"
            light="type: point; angle: 180"
            rotation="-0.3 50.509 147.30229250797848"
          ></a-light>

          <a-light
            id="bulb-2"
            type="directional"
            color="#FFFFBC"
            intensity="0.50"
            position="3.94786 -1.28516 -0.54807"
            light="type: hemisphere; angle: 90; color: #8778bf"
            rotation="-0.3 50.509 147.30229250797848"
          ></a-light>

          <a-light
            id="bulb-3"
            type="directional"
            color="#FF4400"
            intensity="2"
            position="20.45283 -2.62394 -5.68868"
            light="type: ambient; intensity: 0.3; angle: 180; color: #7156d2"
            rotation="-0.3 50.509 147.30229250797848"
          ></a-light>

          <a-light
            id="bulb-4"
            type="directional"
            color="#FFFFBC"
            intensity="0.50"
            position="-0.21291 -0.99888 0.00254"
            light="type: hemisphere; color: #ffffff; angle: 90"
            rotation="-0.3 50.509 147.30229250797848"
          ></a-light>
        </a-scene>
      )}
    </div>
  );
};

export default AFrame;
