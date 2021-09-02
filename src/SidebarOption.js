import React from "react";
import "./SidebarOption.css";
import { useHistory } from "react-router-dom";
import {db} from "./firebase";

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
    } else {
      <div>
        <h1>select a room</h1>

      </div>
    }
  };
console.log(id)
  const addChannel = () => {
    const channelName = prompt("Enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  return (
    <div
      className="sidebarOption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon className="sidebarOption__icon" style={{padding:10}}/>}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <div className="sidebarOption__channel">
          <span className="sidebarOption-hash">#</span> {title}
        </div>
      )}
    </div>
  );
}

export default SidebarOption;