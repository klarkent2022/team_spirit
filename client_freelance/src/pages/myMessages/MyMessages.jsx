import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyMessages.scss";
import { useStateContext } from "../../context";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const MyMessages = () => {
  const { address } = useStateContext();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatsCollectionRef = collection(db, "chats");
      const sellerIdQuery = query(chatsCollectionRef, where("sellerId", "==", address));
      const buyerIdQuery = query(chatsCollectionRef, where("buyerId", "==", address));
  
      try {
        const [sellerIdSnapshot, buyerIdSnapshot] = await Promise.all([
          getDocs(sellerIdQuery),
          getDocs(buyerIdQuery)
        ]);
  
        const sellerIdChats = sellerIdSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const buyerIdChats = buyerIdSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        const mergedChats = [...sellerIdChats, ...buyerIdChats];
        setChats(mergedChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
  
    fetchChats();
  }, [address]);

  console.log(chats);


  const lastmessage = "Difficult to see; always in motion is the future"
  const strings = [
    "https://www.pandasecurity.com/en/mediacenter/src/uploads/2019/07/pandasecurity-How-do-hackers-pick-their-targets.jpg",
    "https://www.tsume-art.com/web/image/product.template/2694/image_1024?unique=d8734eb",
    "https://flxt.tmsimg.com/assets/154972_v9_bb.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQcD3-pANfYEMOBoClEm9bDgFGEqGPbkmDLqhfsLYR7t83uaZ5k",
  ]

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Address</th>
              <th>Last Message</th>
              <th>Status</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {chats.map((chat) => (
              <tr key={chat.id}>
                <td>
                <img
                  src={strings[Math.floor(Math.random() * strings.length)]}
                  alt=""
                />
                </td>
                <td>
                  <Link to={`/message/${chat.id}`} className="link">
                    {chat.buyerId}
                  </Link>
                </td>
                <td>
                  <Link to={`/message/${chat.id}`} className="link">
                    {lastmessage.substring(0, 100)}...
                  </Link>
                </td>
                <td><p>In Process</p></td>
                <td><p>USA</p></td>
                <td>{chat.projectStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyMessages;
