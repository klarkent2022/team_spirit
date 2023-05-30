import React from "react";
import { Link } from "react-router-dom";
import "./SingleGig.scss";
import { Rating } from 'react-simple-star-rating'

const SingleGig = ({ item }) => {
  const to = "/gig/" + `${item.pID}`;
  return (
    <Link to={to} className='link'>
      <div className="singleGig">
        <img src={item.imageURL} alt="" />
        <div className="details">
          <div className="seller">
            <img src={item.avatarURL} alt="" />
            <span>{item.username}</span>
          </div>
          <h4>{item.title}</h4>
          <p>{item.shortDescription}</p>
          <div className="ranking">
              <Rating readonly initialValue={parseInt(item.averageRanking._hex, 16)} size="15"/>
              <span>{parseInt(item.averageRanking._hex, 16)} ({item.reviews.length})</span>
          </div>
        </div>
        <hr />
        <div className="product">
          <p>Delivered In {parseInt(item.deliveryTimeInDays._hex, 16)} Days</p>
          <div className="pricing">
            <span>PRICE</span>
            <div>
              <h2>
                {item.price}
              </h2>
              <img src="/img/klay.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleGig;
