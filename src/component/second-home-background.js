import  {React , useEffect, useState} from "react";
import './background.css';


export default function SecondHomeBackground(){

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
  const background = <spline-viewer url="https://prod.spline.design/W0GUZyJwLsG-vRbg/scene.splinecode"></spline-viewer>;
  useEffect(()=>{
    window.addEventListener("resize",checkScreen);
  })
    return(
        isMobile ? null : background
        
    )

}