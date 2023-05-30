import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Purchases.scss";

import Loader from '../../components/loader/Loader';
import { useStateContext } from '../../context/index'
import { db } from '../../firebase-config'
import { collection, query, where, limit, getDocs, addDoc } from "firebase/firestore";


const Purchases = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [myPurchases, setMyPurchases] = useState([]);
	const {address, contract, getMyPurchases, paySecondHalf} = useStateContext();

  function jobFinished(address, buyers, paidSecondHalf) {return (paidSecondHalf[buyers.lastIndexOf(address)])}

	const fetchMyPurchases = async () => {
		setIsLoading(true);
		const data = await getMyPurchases();
		setMyPurchases(data);
		setIsLoading(false);
	}
	useEffect(() => {
		if (contract) fetchMyPurchases();
	}, [address, contract])

  const handlePayment = async (pID, price) => {
    setIsLoading(true);
    await paySecondHalf(pID, (price/2));
    if (contract) fetchMyPurchases()
    else navigate('/')
    setIsLoading(false);
  }

  const findExistingRoom = async (buyer, seller) => {
    try {
      const q = query(
        collection(db, "chats"),
        where("buyerId", "==", buyer),
        where("sellerId", "==", seller),
        limit(1)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const room = querySnapshot.docs[0].data();
        return {
          roomId: querySnapshot.docs[0].id,
          ...room
        };
      }
    } catch (error) {
      console.error("Error finding existing chat room:", error);
    }
  
    return null;
  };
  
  const createNewRoom = async (buyer, seller) => {
    try {
      const newRoom = {
        buyerId: buyer,
        sellerId: seller
      };
  
      const docRef = await addDoc(collection(db, "chats"), newRoom);
      const roomId = docRef.id;
  
      return roomId;
    } catch (error) {
      console.error("Error creating new chat room:", error);
      return null;
    }
  };
  
  const handleChatLink = async (buyer, seller) => {
    const existingRoom = await findExistingRoom(buyer, seller);
  
    if (existingRoom) {
      navigate(`/message/${existingRoom.roomId}`);
    } else {
      const newRoomId = await createNewRoom(buyer, seller);
      navigate(`/message/${newRoomId}`);
    }
  };





  return (
    <div className="mypurchases">
      <div className="container">
        <div className="title">
          <h1>My Purchases</h1>
        </div>
        {!isLoading ? <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
          {myPurchases.map((gig) =>(
            <tr>
              <td>
              <Link to={"/gig/" + `${gig.pID}`} style={{textDecoration: 'none', color: 'black'}}>
                <img
                  className="imageD"
                  src={gig.imageURL}
                  alt=""
                />
                </Link>
              </td>
              <td><Link to={"/gig/" + `${gig.pID}`} style={{textDecoration: 'none', color: 'black'}}>{gig.title}</Link></td>
              <td>{gig.price} KLAY</td>
              <td>{gig.seller}</td>
              <td>
                <div className="formessageIcon">
                <Link to="#" onClick={() => handleChatLink(address, gig.seller)}>
                  <img className="messageIcon" src="./img/chat.png" alt="" />
                </Link>
                </div>
              </td>
              <td>{jobFinished(address, gig.buyers, gig.paidSecondHalf) ? "Completed" : <button onClick = {() => handlePayment(gig.pID, gig.price)}>Approve & Pay</button>}</td>
            </tr>
          ))}
        </table> :  (<div className="loader-container">
          <Loader />
        </div>)
        }
      </div>
    </div>
  );
};

export default Purchases;
