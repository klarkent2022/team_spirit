import React, {useState, useEffect} from "react";
import "./GigDetails.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStateContext } from '../../context';
import { Rating } from 'react-simple-star-rating'
import Loader from '../../components/loader/Loader';



function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pID = parseInt(id, 10);
  const [isLoading, setIsLoading] = useState(false);
  const [gig, setGig] = useState({});
	const { address, contract, getGigs, submitReview, payInitialPrice} = useStateContext();

	const fetchGigs = async () => {
		setIsLoading(true);
		const data = await getGigs();
		setGig(data.find((gig) => (gig.pID === pID)));
		setIsLoading(false);
	}
	useEffect(() => {
		if (contract) fetchGigs();
	}, [address, contract])

  const imageUrls = [
    "https://img.freepik.com/free-photo/cartoon-character-with-hat-red-dress-with-word-little-it_1340-40299.jpg?w=826&t=st=1685169989~exp=1685170589~hmac=65b4aa065ca5aeafc8aea6f23b4c2a968a184ac1454e7b2b772325d72bb38c6e",
    "https://img.freepik.com/free-photo/man-with-mustache-is-laughing-has-yellow-hat-his-head_1340-41432.jpg?w=1380&t=st=1685170040~exp=1685170640~hmac=266a98993635666ce9f4beb8589c7c260b6bf6bc7756342c8ad92460b7ad5110",
    "https://img.freepik.com/free-photo/man-with-rainbow-haircut-rainbow-shirt_1340-42765.jpg?w=1380&t=st=1685170040~exp=1685170640~hmac=9ca53a351af107efaa5af882657a3894c0fafde1cdd80fd99e0841742758ad53",
    "https://img.freepik.com/free-photo/colorful-picture-bird-with-beak-that-says-word-it_1340-28800.jpg?t=st=1685170040~exp=1685170640~hmac=3527edc46533b152e0e07e0eb46042d6530f86f35270bfbcbfe216387d23a0c8",
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  const randomImageUrl = imageUrls[randomIndex];

///////////////////////////////Responsible for Review Part/////////////////////////////////////
  const [review, setReview] = useState({
    buyerID: address,
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    setReview({ ...review, buyerID: address});
  }, [address])

  //when comment is being entered
  const handleCommentFieldChange = (text) => {setReview({ ...review, comment: text})};

  //when the rating is chosen
  const handleRatingChange = (rate) => {setReview({ ...review, rating: rate});}
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)
  
  //when submitting the review
  const handleReviewSubmit = async () => {
    console.log(review);
    setIsLoading(true);
    await submitReview(review, pID);
    if (contract) fetchGigs()
    else navigate('/')
    setIsLoading(false);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  function showPurchaseButton(address, buyers, paidSecondHalf) {
    if (buyers != undefined && paidSecondHalf != undefined) {
      const lastIndex = gig.buyers.lastIndexOf(address);
      if (lastIndex !== -1) {
        return gig.paidSecondHalf[lastIndex] === true;
      }
    }
    return true; // If the buyer address is not found in the arrays
  }

  ////////////////////////////////////////Handle Purchase////////////////////////////////
  const handlePurchase = async () => {
    setIsLoading(true);
    await payInitialPrice(pID, (gig.price/2));
    if (contract) fetchGigs()
    else navigate('/')
    setIsLoading(false);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    (!isLoading ? <div className="gigDetails">
      <div className="container">
        <div className="leftSide">
          <h1>{gig.title}</h1>
          <div className="currentUser">
            <img className="mainImage" src={gig.imageURL} alt="" />
          </div>
          <h2>About the Gig: </h2>
          <p>
            {gig.description}
          </p>

          <div className="sellerInfo">
            <h2>About The Seller</h2>
            <div className="currentUser">
              <img
                className="avatar"
                src={gig.avatarURL}
                alt=""
              />
              <div className="rating">
                <h2>{gig.username}</h2>
                <div className="rankings">
                  <Rating readonly initialValue={parseInt(gig.averageRanking, 10)} size="20"/>
                </div>
              </div>
            </div>
            <div className="extraInfo">
              <div className="extraInfoWrapper">
                <div className="gell">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="gell">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="gell">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="gell">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="gell">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {gig.aboutSeller}
              </p>
            </div>
          
          </div>
          {address && (gig.seller != address) && <div className="leave_review">
            <h2>Leave a review</h2>
            <div className="x">
              <Rating
                    onClick={handleRatingChange}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
              />
              <textarea 
                  name="" 
                  id="" 
                  placeholder="Your experience about this seller & his services" 
                  cols="30" rows="10"
                  onChange={(e) => handleCommentFieldChange(e.target.value)}
                ></textarea>
              <button onClick={() => handleReviewSubmit()}>Submit</button>
            </div>
          </div>}
          <hr />



          <div className="reviews">
            <h1>Reviews</h1>
            {gig.reviews?.map((review, index) => (
              <div className="gell" key={index}>
              <div className="currentUser">
                <img
                  className="avatar"
                  src="https://s.abcnews.com/images/US/Gty_Hacker_Group_Anonymous_er_160318_16x9_1600.jpg"
                  alt=""
                />
                <div className="rating">
                  <span>Anonymous</span>
                  <div className="fromcountry">
                    <img
                      src="https://img.freepik.com/free-vector/planet-earth_1308-82523.jpg?w=1380&t=st=1685199981~exp=1685200581~hmac=4573a8c69b0971d866e5a87dad7f9e2c4d3ea735290ff07b7bfe8a150a98a650"
                      alt=""
                    />
                    <span>Planet Earth</span>
                  </div>
                </div>
              </div>
              <div className="rankings">
                <Rating readonly initialValue={parseInt(review.rating._hex, 16)} size="15"/>
                <span>{parseInt(review.rating._hex, 16)}</span>
              </div>
              <p>{review.comment}</p>
              <div className="washelpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
              <hr />
            </div>
            ))}
          </div>
        </div>





        <div className="rightSide">
          <div className="pricing">
            <h3>1 piece</h3>
            <div className="price_value">
              <h2>{gig.price}</h2>
              <img src="/img/klay.png" alt="" />
            </div>
          </div>
          <p>
            {gig.shortDescription}
          </p>
          <div className="details">
            <div className="gell">
              <img src="/img/clock.png" alt="" />
              <span>{parseInt(gig.deliveryTimeInDays)} Days Delivery</span>
            </div>
            <div className="gell">
              <img src="/img/recycle.png" alt="" />
              <span>{Math.floor(Math.random() * 5) + 1} Revisions</span>
            </div>
          </div>
          <div className="parameterss">
            <div className="hell">
              <img src="/img/greencheck.png" alt="" />
              <span>Customized prompts</span>
            </div>
            <div className="hell">
              <img src="/img/greencheck.png" alt="" />
              <span>Fast artwork delivery</span>
            </div>
            <div className="hell">
              <img src="/img/greencheck.png" alt="" />
              <span>High-quality image upscaling</span>
            </div>
            <div className="hell">
              <img src="/img/greencheck.png" alt="" />
              <span>Additional design options</span>
            </div>
          </div>
          {(address && (gig.seller!=address) && showPurchaseButton(address, gig.buyers, gig.paidSecondHalf)) && (<button onClick={()=> handlePurchase()}>Purchase</button>)}
        </div>
      </div>
    </div> : <Loader />)
  );
}

export default GigDetails;
