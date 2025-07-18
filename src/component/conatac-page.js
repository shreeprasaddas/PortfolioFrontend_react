import React from "react";
import './contact-page.css'
import { menuClose } from "./NavBar";
import ContactBackground from "./contact-background";


export default function Contact() {
  return (
    <>
    <ContactBackground/>
    <div className="contact-card" onClick={menuClose}>
      <div className="contact-content">
        <div className="text-content">
          <hr />
          <h1>
            Let’s Work <br />
            <span>Together</span>
          </h1>
          <p>
            Got a project in mind or simply want to connect? Drop me a message
            below and let's bring your ideas to life. Your digital journey
            starts here.
          </p>
        </div>
        <div className="social-media-conatact">
          <ul>
            <li>
              <logo>
                {/*?xml version="1.0" encoding="utf-8"?*/}
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="122.879px"
                  height="88.855px"
                  viewBox="0 0 122.879 88.855"
                  enableBackground="new 0 0 122.879 88.855"
                  xmlSpace="preserve"
                >
                  <g>
                    <path d="M7.048,0h108.784c1.939,0,3.701,0.794,4.977,2.069c1.277,1.277,2.07,3.042,2.07,4.979v74.759 c0,1.461-0.451,2.822-1.221,3.951c-0.141,0.365-0.361,0.705-0.662,0.994c-0.201,0.189-0.422,0.344-0.656,0.461 c-1.225,1.021-2.799,1.643-4.508,1.643H7.048c-1.937,0-3.701-0.793-4.979-2.07C0.794,85.51,0,83.748,0,81.807V7.048 c0-1.941,0.792-3.704,2.068-4.979C3.344,0.792,5.107,0,7.048,0L7.048,0z M5.406,78.842l38.124-38.22L5.406,9.538V78.842 L5.406,78.842z M47.729,44.045L8.424,83.449h105.701L76.563,44.051L64.18,54.602l0,0c-0.971,0.83-2.425,0.877-3.453,0.043 L47.729,44.045L47.729,44.045z M80.674,40.549l36.799,38.598V9.198L80.674,40.549L80.674,40.549z M8.867,5.406l53.521,43.639 l51.223-43.639H8.867L8.867,5.406z" />
                  </g>
                </svg>
              </logo>{" "}
              shreepsd2@gmail.com
            </li>
            <li>
              <logo>
                {/*?xml version="1.0" encoding="utf-8"?*/}
                {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </logo>{" "}
              +977 9825752227
            </li>
            <li>
              <logo>
                <svg
                  fill="#000000"
                  height="800px"
                  width="800px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="-143 145 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z
                      M339,617c0,5.5-4.5,10-10,10h-432c-5.5,0-10-4.5-10-10V185c0-5.5,4.5-10,10-10h432c5.5,0,10,4.5,10,10V617z"
                    />
                    <path
                      d="M146.8,313.7c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3
                     c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H51.2v38.3h26.5v133h49.6v-133h39.3l2.9-38.3h-42.2v-29.9C127.3,317.4,136.5,313.7,146.8,313.7z"
                    />
                  </g>
                </svg>
              </logo>{" "}
              <a href="https://www.facebook.com/shreeprashad.das.7">Facebook</a>
            </li>
            <li>
              <logo>
                <svg
                  fill="#000000"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                </svg>
              </logo>{" "}
              <a href="https://www.linkedin.com/in/shree-prasad-das-64b9b42ab/">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <form action="http://localhost:9000/form" className="contact-form" method="post">
        <div className="conatact-form-details">
          <div className="name-details">
            <label htmlFor="name" className="name-label">
              First Name
            </label>
            <input type="text" className="cont-name" name="name" id="name" />
            <label htmlFor="middle" className="name-label">
              Middle Name
            </label>
            <input
              type="text"
              name="middle"
              id="middle"
              className="cont-name"
            />
            <label htmlFor="last" className="name-label">
              Last Name
            </label>
            <input type="text" id="last" name="last" className="cont-name" />
          </div>
          <div className="other-details">
            <label htmlFor="email" className="other-label">
              Email
            </label>
            <input
              type="email"
              className="cont-details"
              id="email"
              name="email"
            />
            <label htmlFor="phone" className="other-label">
              Phone No
            </label>
            <input
              type="phone"
              className="cont-details"
              id="phone"
              name="phone"
            />
            <label htmlFor="adderess" className="other-label">
              Adderess
            </label>
            <input
              type="adderess"
              className="cont-details"
              id="adderess"
              name="adderess"
            />
          </div>
        </div>
        <textarea
          name="message"
          id="message"
          placeholder="Enter Your Message"
          defaultValue={""}
        />
        <div className="s-btn">
          <button type="submit" className="submit-btn" id="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
