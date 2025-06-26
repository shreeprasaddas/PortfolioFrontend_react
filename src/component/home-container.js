import './home_container.css'
import { menuClose } from "./NavBar";


export default function HomeContainer(props) {
  return (
    <div className="home-container" onClick={menuClose}>
      <div className="home-content">
        <h1>
          <span>Welcome To The</span> Creative Realm of {props.name} <br />
          <span>Portfolio Showcase</span>
        </h1>
        <p>
            {props.paragraph}
        </p>
        <h1 className="about-skill-heading">
          Skills
        </h1>
        <div className="about-skills">
          <div className="skill-logo" id="skill-mongodb-logo">
            <img src="Assets/logo/mongodb-svgrepo-com (1).png" alt="mongodb" />
          </div>
          <div className="skill-logo" id="skill-express-logo">
            <img src="Assets/logo/express-svgrepo-com (2).png" alt="skill-logo" />
          </div>
          <div className="skill-logo" id="skill-react-logo">
              <img src="Assets/logo/react-svgrepo-com.png" alt="logo" />
          </div>
          <div className="skill-logo" id="skill-nodejs-logo">
                <img src="Assets/logo/node-js-svgrepo-com.png" alt="logo" />
          </div>
          <div className="skill-logo" id="skill-python-logo">
              <img src="Assets/logo/python-svgrepo-com.png" alt="logo" />
          </div>
        </div>
        <button className="Download-cv-button">CONTACT ME</button>
      </div>
      <div className="home-image">
        <img src="Assets/images/home-page.png" alt="home-image" />
      </div>
    </div>
  );
}
