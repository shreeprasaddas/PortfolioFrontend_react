import {React, useEffect, useState} from "react";
import './second-home.css'
import SecondHomeBackground from "./second-home-background";
import isAMobile from "./DeviceSize";
import ProfileIMG from './second-home-page-image.png';
import { menuClose } from "./NavBar";
import resume from './resume.pdf'
import getData from "./click";

const data = getData();
console.log(data);
export default function SecondHome() {
  const [isMobile,setMobile]= useState(window.innerWidth > 720? false:true);
  function checkScreen(){
    if (window.innerWidth < 834) {
      setMobile(true)
    }
    else {
      setMobile(false)
    }
    console.log(isMobile);
    
  }
  const profileImage= <div className="main-home-image-section">
    <img src={ProfileIMG} alt="profile image" />
    <svg className="home-svg1" id="eQMZKBaLNFf1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision" project-id="570795cb7d1a43608ca02fb39cb12a43" export-id="11011a9321584b159543a503af35a6c8" cached="false"><defs><linearGradient id="eQMZKBaLNFf2-fill" x1="0.136807" y1={1} x2="0.879059" y2="0.018992" spreadMethod="pad" gradientUnits="objectBoundingBox" gradientTransform="translate(0 0)"><stop id="eQMZKBaLNFf2-fill-0" offset="0%" stopColor="rgba(19,160,160,0.39)" /><stop id="eQMZKBaLNFf2-fill-1" offset="100%" stopColor="rgba(245,255,255,0.26)" /></linearGradient></defs><rect width="243.529412" height="214.588235" rx={44} ry={44} transform="matrix(.889853 0 0 1.046052 43.412017 26.823598)" fill="url(#eQMZKBaLNFf2-fill)" strokeWidth={0} /></svg>

  </div>
  const profile3d =     <div className="main-home-image-section">  <spline-viewer url="https://prod.spline.design/YSlJOskRtM4w2-IC/scene.splinecode" /></div>;
  useEffect(()=>{
    window.addEventListener("resize",checkScreen);
  })
  return (
    <>
    <SecondHomeBackground/>
    <div className="home-section" onClick={menuClose}>
     <style dangerouslySetInnerHTML={{__html: "\n        body{\n          display:block;\n        }\n      " }} />

      <div className="main-home-content">
        <h1>
          HI There, <br />
          I'm Shree <span>Prasad</span>
        </h1>
        <p>I am A Full Stack Web Developer </p>
        <a href={resume} download="Shreeprasad Resume"><button className="donload-cv-btn">Download CV</button></a>
      </div>
      
        {isMobile? profileImage :profile3d }
        
      
    </div>
    </>
  );
}
