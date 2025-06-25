import {React, useEffect, useState} from "react";
import './background.css';


export default function ContactBackground(){
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
    const background =        <spline-viewer url="https://prod.spline.design/bQKr46YGgA3nJp-g/scene.splinecode"></spline-viewer>;
    useEffect(()=>{
      window.addEventListener("resize",checkScreen);
    })
      return(
          isMobile ? null : background
          
      )

}