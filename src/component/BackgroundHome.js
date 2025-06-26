import {useState,useEffect,React} from 'react'
import './background.css'




export default function Background(){
 const [isMobile,setMobile]= useState(window.innerWidth > 834? false:true);
  function checkScreen(){
    if (window.innerWidth < 834) {
      setMobile(true)
    }
    else {
      setMobile(false)
    }
    console.log(isMobile);
    
  }
  const background = <spline-viewer url="https://prod.spline.design/9SykX1kSLX4RqWtm/scene.splinecode"></spline-viewer>;
  useEffect(()=>{
    window.addEventListener("resize",checkScreen);
  })
    return(
        isMobile ? null : background
        
    )
}