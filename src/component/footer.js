import React from "react";  
import './footer.css';
import { menuClose } from "./NavBar";

export default function Footer(){
    return(
       <footer>
  <div className="footer_detail" onClick={menuClose}>
    <h1>Mern Stack <span className="footer_span">Developer</span></h1>
    <p>© 2024 Shreeprasad. This portfolio showcases my journey and projects in web design and development. Connect with me on LinkedIn, GitHub, and Twitter. For any inquiries, feel free to reach out via email at your.email@example.com.</p>
  </div>
  <div className="footer_link">

    <div className="footer_facebook footer-logo"><svg className="logo-svg" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xmlSpace="preserve">
        <g>
          <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z
              M339,617c0,5.5-4.5,10-10,10h-432c-5.5,0-10-4.5-10-10V185c0-5.5,4.5-10,10-10h432c5.5,0,10,4.5,10,10V617z" />
          <path d="M146.8,313.7c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3
             c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H51.2v38.3h26.5v133h49.6v-133h39.3l2.9-38.3h-42.2v-29.9C127.3,317.4,136.5,313.7,146.8,313.7z" />
        </g>
      </svg></div>
    <div className="footer_linkdin footer-logo"><svg className="logo-svg"fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="LinkedIn">
          <g>
            <path d="M18.44,3.06H5.56a2.507,2.507,0,0,0-2.5,2.5V18.44a2.507,2.507,0,0,0,2.5,2.5H18.44a2.5,2.5,0,0,0,2.5-2.5V5.56A2.5,2.5,0,0,0,18.44,3.06Zm1.5,15.38a1.511,1.511,0,0,1-1.5,1.5H5.56a1.511,1.511,0,0,1-1.5-1.5V5.56a1.511,1.511,0,0,1,1.5-1.5H18.44a1.511,1.511,0,0,1,1.5,1.5Z" />
            <g>
              <path d="M6.376,10.748a1,1,0,1,1,2,0v6.5h0a1,1,0,0,1-2,0Z" />
              <circle cx="7.376" cy="6.744" r={1} />
              <path d="M17.62,13.37v3.88a1,1,0,1,1-2,0V13.37a1.615,1.615,0,1,0-3.23,0v3.88a1,1,0,0,1-2,0v-6.5a1.016,1.016,0,0,1,1-1,.94.94,0,0,1,.84.47,3.609,3.609,0,0,1,5.39,3.15Z" />
            </g>
          </g>
        </g>
      </svg></div>
    <div className="footer_youtube footer-logo">{/*?xml version="1.0" encoding="iso-8859-1"?*/}
      {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
      <svg className="logo-svg" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xmlSpace="preserve">
        <g id="XMLID_822_">
          <path id="XMLID_823_" d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938
                  C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527
                  C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991
                  c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764
                  c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861
                  C204.394,157.263,202.325,160.684,199.021,162.41z" />
        </g>
      </svg></div>
    <div className="footer_instagram footer-logo">
      <svg className="logo-svg" xmlns="http://www.w3.org/2000/svg" width={2500} height={2500} viewBox="0 0 2476 2476" id="instagram"><path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5" /></svg>
    </div>
  </div>
</footer>

    )
}