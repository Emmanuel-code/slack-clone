import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {db} from "./firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useRef } from "react";
import {useCollection} from 'react-firebase-hooks/firestore'

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const chatRef = useRef(null)
  const [loading]=useCollection()
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setRoomMessages(snapshot.docs.map((doc) => doc.data()))
    );
  chatRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });  

  }, [loading,roomId ]);

  
 

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLift">
          <h4 className="chat-channelName">
            <strong>
              #{roomDetails ? roomDetails?.name : "loading......"}
            </strong>
            <StarBorderOutlineIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      <div className="chat__messages">
        {roomMessages?.map(({ message, timestamp, user, userImage }) => (
          <Message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage}
            key={timestamp}
          />
        ))}
        <div ref={chatRef} className="chatBottom" />
      </div>

      <ChatInput
        chatRef={chatRef}
        channelName={roomDetails?.name}
        channelId={roomId}
      />
    </div>
  );
}

export default Chat;