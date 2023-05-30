import React from "react";
import "./Featured.scss";
import { Link } from "react-router-dom";

function Featured() {
  return (
    <div className="outer-div">
      <div className="wrapper">
        <div className="leftSide">
          <h1>
            Discover the <span>ideal freelance</span> solutions for your business needs.
          </h1>
          <div className="popularOptions">
            <span>Popular Options:</span>
            <Link to="/gigs/graphics&design">
              <button>Logo Design</button>
            </Link>
            <Link to="/gigs/programming&tech"><button>Website Design</button></Link>
            <Link to="/gigs/writing&translation"><button>Essay Writing</button></Link>
            <Link to="/gigs/photography"><button>Photography</button></Link>
          </div>
        </div>
        <div className="rightSide">
          <img src="./img/freelancer.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
