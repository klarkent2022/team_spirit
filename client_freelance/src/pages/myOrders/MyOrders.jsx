import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyOrders.scss";

import Loader from '../../components/loader/Loader';
import { useStateContext } from '../../context/index'
import { db } from '../../firebase-config'
import { collection, query, where, limit, getDocs, addDoc } from "firebase/firestore";



const MyOrders = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
	const {address, contract, getMyOrders} = useStateContext();

  function jobFinished(address, buyers, paidSecondHalf) {return (paidSecondHalf[buyers.lastIndexOf(address)])}

	const fetchMyOrders = async () => {
		setIsLoading(true);
		const data = await getMyOrders();
		setMyOrders(data);
		setIsLoading(false);
	}
	useEffect(() => {
		if (contract) fetchMyOrders();
	}, [address, contract])

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
        // If a chat room is found, return the room details
        const room = querySnapshot.docs[0].data();
        return {
          roomId: querySnapshot.docs[0].id,
          ...room
        };
      }
    } catch (error) {
      console.error("Error finding existing chat room:", error);
    }
  
    return null; // Return null if no chat room is found
  };
  
  const createNewRoom = async (buyer, seller) => {
    try {
      const newRoom = {
        buyerId: buyer,
        sellerId: seller
      };
  
      const docRef = await addDoc(collection(db, "chats"), newRoom);
      const roomId = docRef.id;
  
      return roomId; // Return the newly created room ID
    } catch (error) {
      console.error("Error creating new chat room:", error);
      return null; // Return null if an error occurs
    }
  };
  


  const handleChatLink = async (buyer, seller) => {
    // Check if the chat room already exists for the buyer and seller
    const existingRoom = await findExistingRoom(buyer, seller);
  
    if (existingRoom) {
      // If the room exists, navigate to the chat room using the room ID
      navigate(`/message/${existingRoom.roomId}`);
    } else {
      // If the room doesn't exist, create a new room and navigate to it
      const newRoomId = await createNewRoom(buyer, seller);
      navigate(`/message/${newRoomId}`);
    }
  };

  


  return (
    <div className="myorders">
      <div className="container">
        <div className="header">
          <h1>My Orders</h1>
        </div>
        {!isLoading ? <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Buyer</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
          {myOrders.flatMap((gig) => {
          // Create a map to keep track of the last instance of each buyer
          const lastBuyerInstances = new Map();

          // Iterate over the buyers array in reverse order
          const reversedBuyers = gig.buyers.slice().reverse();

          return reversedBuyers.map((buyer, index) => {
            // Check if the buyer is the last instance in the reversed array
            const isLastInstance = !lastBuyerInstances.has(buyer);

            // Store the last instance of each buyer in the map
            if (isLastInstance) {
              lastBuyerInstances.set(buyer, true);
            }

            // Render a table row for the last instance of each buyer
            if (isLastInstance) {
              return (
                <tr key={index}>
                  <td>
                    <Link to={"/gig/" + `${gig.pID}`} style={{textDecoration: 'none', color: 'black'}}>
                      <img
                        className="imageD"
                        src={gig.imageURL}
                        alt=""
                      />
                    </Link>
                  </td>
                  <td>
                    <Link to={"/gig/" + `${gig.pID}`} style={{textDecoration: 'none', color: 'black'}}>
                      {gig.title}
                    </Link>
                  </td>
                  <td>{gig.price} KLAY</td>
                  <td>{buyer}</td>
                  <td>
                    <Link to="#" onClick={() => handleChatLink(buyer, gig.seller)}>
                      <img className="message" src="./img/chat.png" alt="" />
                    </Link>
                  </td>
                  <td>{jobFinished(buyer, gig.buyers, gig.paidSecondHalf) ? "Completed" : "In Process"}</td>
                </tr>
              );
            }

            return null;
            });
            })}


        </table> :  (<div className="loader-container">
          <Loader />
        </div>)
        }
      </div>
    </div>
  );
};

export default MyOrders;
