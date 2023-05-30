import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="outerDiv">
      <div className="wrapper">
        <hr />
        <div className="innerWrapper">
          <div className="leftSide">
            <h2>gighub</h2>
            <span>© GigHub Ltd. 2023</span>
          </div>
          <div className="right">
            <div className="contacts">
              <a href="https://www.instagram.com/_issagulov_/"><img src="/img/instagram.png"/></a>
              <a href="https://www.facebook.com/abish.issagulov"><img src="/img/facebook.png"/></a>
              <a href="https://www.linkedin.com/in/abish-issagulov-723342235/"><img src="/img/linkedin.png"/></a>
            </div>
            <div className="nice">
              <img src="/img/internet.png" alt="" />
              <span>English</span>
            </div>
            <div className="nice">
              <img src="/img/klay.png" alt="" />
              <span>KLAY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
