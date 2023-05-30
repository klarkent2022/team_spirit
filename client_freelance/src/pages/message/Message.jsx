import React, { useState, useEffect }  from "react";
import {useParams } from "react-router-dom";
import "./Message.scss";
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useStateContext } from "../../context";


const Message = () => {
  const { address } = useStateContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const {chatId}  = useParams();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("chatId", "==", chatId),
      orderBy("createdAt")
    );
    const unsubcribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsubcribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      chatId: chatId,
      text: newMessage,
      createdAt: serverTimestamp(),
      senderId: address
    });

    setNewMessage("");
  };


  return (
    <div className="singlemessage">
      <div className="container">
        <div className="chat">
          {messages.map((message) => (
          <div className={(message.senderId===address) ? "mess author" : "mess"}>
            <img
              src={(message.senderId===address) ? "https://www.pandasecurity.com/en/mediacenter/src/uploads/2019/07/pandasecurity-How-do-hackers-pick-their-targets.jpg" : "https://www.tsume-art.com/web/image/product.template/2694/image_1024?unique=d8734eb"}
              alt=""
            />
            <p>{message.text}</p>
          </div>
          ))}
        </div>
        <hr />
        <form onSubmit={handleSubmit} className="sendmessage">
          <textarea type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type your message here..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
