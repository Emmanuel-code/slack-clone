import React, { useState } from 'react';
// import { useStateValue } from '../StateProvider';
import './ChatInput.css'
import firebase from 'firebase'
import {db,auth} from './firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({channelName, channelId, chatRef}) {
  const [input, setInput] = useState('')
 
  const [user] = useAuthState(auth);

  const sendMessage = e => {
    e.preventDefault()
    if (channelId){ 
      db.collection('rooms').doc(channelId).collection('messages').add({
        message : input, 
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        user:user?.displayName,
        userImage : user?.photoURL

      })
    }
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    }); 
    setInput('')
  }
  return (
    <div className='chatInput'>
      <form>
        <input 
          value ={input}
          placeholder = {`Message #${channelName}`}
          onChange = {e=> setInput(e.target.value)}
          />
        <button type='submit' onClick={sendMessage} >
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
