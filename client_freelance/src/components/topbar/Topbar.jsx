import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from '../../context';
import "./Topbar.scss";

function Topbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { connect, address } = useStateContext();
  const navigate = useNavigate();
  
  const [active, setActive] = useState(false);
  const isActive = () => {
    (window.scrollY > 0) ? setActive(true) : setActive(false);
  };  
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className={active || pathname !== "/" ? "topbar open" : "topbar"}>
      <div className="container">
        <div className="logotype">
          <Link className="link" to="/">
            <span className="text">gighub</span>
          </Link>
        </div>

        <div className="navlinks">
          <Link className="link" to="/gigs">
            Explore
          </Link>
          {address ? (<> 
            <Link className="link" to="/mygigs">
              My Gigs
            </Link>
            <Link className="link" to="/orders">
              Orders
            </Link>
            <Link className="link" to="/purchases">
              Purchases
            </Link>
            <Link className="link" to="/messages">
              Messages
            </Link>
          </>) : (
              <button  onClick={()=>connect()}>
                Login
              </button>
          )}
        </div>
      </div>
      
      {(pathname !== "/" || active) && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/gigs/graphics&design">
              Graphics & Design
            </Link>
            <Link className="link" to="/gigs/digital_marketing">
              Digital Marketing
            </Link>
            <Link className="link" to="/gigs/writing&translation">
              Writing & Translation
            </Link>
            <Link className="link" to="/gigs/video&animation">
            Video & Animation
            </Link>
            <Link className="link" to="/gigs/music&audio">
              Music & Audio
            </Link>
            <Link className="link" to="/gigs/programming&tech">
              Programming & Tech
            </Link>
            <Link className="link" to="/gigs/data">
              Data
            </Link>
            <Link className="link" to="/gigs/business">
              Business
            </Link>
            <Link className="link" to="/gigs/lifestyle">
              Lifestyle
            </Link>
            <Link className="link" to="/gigs/photography">
              Photography
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Topbar;
