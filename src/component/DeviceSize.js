import {React} from 'react'

export default function isAMobile(){
    let isMobile;

  if (window.innerWidth < 834) {
      isMobile=true;
  }
  else {
    isMobile=false;
  }
  
    return isMobile;
}

