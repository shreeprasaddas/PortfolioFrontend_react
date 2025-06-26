import {useState} from 'react'
import { Link } from 'react-router-dom'
import './nav.css';
import MenuCard from './menu_card';
import './menu_button.css'

let menuClick;
export function menuClose(){
  menuClick();
  
}


export default function NavBar(){
  const [isMobile,setMobile]= useState(window.innerWidth > 720? false:true);
  const [triggerVal, setTrig]= useState(false);

    
     
     menuClick= function(){
      if(isMobile){
        setTrig(false);
      }
      
     }
     function trig(){
     setTrig(!triggerVal);
     
     }

    console.log("this is 2nd child element :"+document.getElementById('root').children[1]);
  function checkScreen(){
    if (window.innerWidth < 834) {
      setMobile(true)
    }
    else {
      setMobile(false)
    }

    
  }
  window.addEventListener("resize",checkScreen);
  

  
  console.log(isMobile);
   const nav3dLogo= ()=>{
    return(
      <spline-viewer url="https://prod.spline.design/B6Z0qsiDXXq8DqOw/scene.splinecode" className="slogo" id="nav-logo" />
    )
   }
   
  const Menu =
     <>
       <div className="trigger" id="trigger" onClick={trig}>
         <svg className="bars" viewBox="0 0 100 100" onclick="this.classList.toggle('active')">
           <path className="line top" d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272" />
           <path className="line middle" d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272" />
           <path className="line bottom" d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272" />
         </svg>
       </div>
  </>
;
  

   const desktopNav=<ul>
   <Link to="/">
      <li className="left-nav">Home</li>
      <div className='nav-hovor'></div>
  
   </Link>
   <Link to="/about"><li className="left-nav about-nav">About Us
    </li>
    <div className='nav-hovor'></div>
    </Link>

   <Link to="/portfolio"> 
   <li className="left-nav portfolio">Portfolio</li>
   <div className='nav-hovor'></div>
   </Link>
   <li className="left-nav solution"><select name="solution" id="solution">
       <option value="programming">Solutions</option>
       <option value="math">Math</option>
       <option value="Python">Python</option>
       <option value="Networking">Networking</option>
     </select></li>
   <li className="Search-and-contact">
     <input type="text" className="search right" placeholder="Search" />
     <Link to="/contact"><button className="btn conatct-btn right">Contact Us</button></Link>
   </li>
 </ul>;



 const mobileNav=<ul>
 <Link to="/"className="left-nav"><li >Home</li></Link>
 <li className="left-nav solution"><select name="solution" id="solution">
     <option value="programming">Solutions</option>
     <option value="math">Math</option>
     <option value="Python">Python</option>
     <option value="Networking">Networking</option>
   </select></li>
 <li className="Search-and-contact">
   <Link  to="/contact"><button className="btn conatct-btn right">Contact Us</button></Link>
 </li>
</ul>;



    return(
    <>
    <nav className="main-nav">
        <div className="logo">
             {isMobile ? Menu: nav3dLogo()}
              
            </div>
         
            {isMobile ? mobileNav: desktopNav} 
        </nav>
        {triggerVal?<MenuCard/>:null}
        </>
    )
}


