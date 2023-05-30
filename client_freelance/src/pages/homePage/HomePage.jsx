import React from "react";
import "./HomePage.scss";
import Featured from "../../components/featured/Featured";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div className="homepage">
      <Featured />
      <div className="exploration">
        <div className="wrapper">
          <h1>Categories</h1>
          <div className="items">
              <Link style={{color:'black',textDecoration:'none',alignItems: 'center'}} to="/gigs/graphics&design">
                <div className="fell">
                    <img
                      src="./img/graphics&design.png"
                      alt=""
                    />
                    <div className="ruler"></div>
                    <span>Graphics & Design</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/digital_marketing">
                <div className="fell">
                  <img
                    src="./img/digital-marketing.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Digital Marketing</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/writing&translation">
                <div className="fell">
                  <img
                    src="./img/writing.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Writing & Translation</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/video&animation">
                <div className="fell">
                  <img
                    src="./img/animation.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Video & Animation</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/music&audio">
                <div className="fell">
                  <img
                    src="./img/music.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Music & Audio</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/programming&tech">
                <div className="fell">
                  <img
                    src="./img/coding.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Programming & Tech</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/business">
                <div className="fell">
                  <img
                    src="./img/handshake.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Business</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/lifestyle">
                <div className="fell">
                  <img
                    src="./img/lifestyle.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Lifestyle</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/data">
                <div className="fell">
                  <img
                    src="./img/big-data.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Data</span>
                </div>
              </Link>
              <Link style={{color:'black',textDecoration:'none'}} to="/gigs/photography">
                <div className="fell">
                  <img
                    src="./img/camera.png"
                    alt=""
                  />
                  <div className="ruler"></div>
                  <span>Photography</span>
                </div>
              </Link>
          </div>
        </div>
      </div>
      <div className="whybests">
        <div className="wrapper">
          <div className="fell">
            <h1>Access to a vast pool of freelance expertise available at your disposal</h1>
            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Efficient completion of high-quality work.
            </div>
            <p>
            Discover the ideal freelancer to commence your project in a matter of minutes.
            </p>
            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Optimal solutions tailored to suit every budget.
            </div>
            <p>
            Discover top-notch services at various price ranges, with transparent project-based pricing instead of hourly rates.
            </p>
            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Ensured secure payment transactions on every occasion.
            </div>
            <p>
            Have complete visibility of the upfront cost, ensuring that your payment is not released until you have approved the delivered work.
            </p>
          </div>
          <iframe
            src="https://www.youtube.com/embed/OVh0bMNSFss"
            width="560"
            height="315"
            reason="YouTube Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="whybests dark">
        <div className="wrapper">
          <div className="fell">
            <h1>
              GigHub <i>plus</i> (soon)
            </h1>
            <p>
            Elevate your experience to a carefully tailored package filled with exclusive tools and advantages, designed specifically for businesses.
            </p>

            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Be connected with the ideal talent through the assistance of a dedicated customer success manager
            </div>
            
            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Establish connections with freelancers who possess verified business expertise
            </div>

            <div className="reason">
              <img src="./img/completed.png" alt="" />
              Enhance teamwork management and amplify productivity with a unified and robust workspace
            </div>
          </div>
          <div className="fell">
            <img
              src="./img/businessmen.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
