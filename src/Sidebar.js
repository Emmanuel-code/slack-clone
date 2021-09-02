import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
// import { useCollection } from "react-firebase-hooks/firestore";
import { db,auth } from "./firebase";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
     const [channels, setChannels] = useState([]);
  // const [{ user }] = useStateValue();
  // const [user] = useSelector(selectUser);
  const [user] = useAuthState(auth);


  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

    return (
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__headerInfo">
            <h2>Bej HQ</h2>
            <h3>
              <FiberManualRecord />
              {user?.displayName}
            </h3>
          </div>
          <Create />
        </div>
        <SidebarOption Icon={InsertComment} title="Threads" />
        <SidebarOption Icon={Inbox} title="Mentions & Reactions" />
        <SidebarOption Icon={Drafts} title="Saved Item" />
        <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
        <SidebarOption Icon={PeopleAlt} title="People & user groups" />
        <SidebarOption Icon={Apps} title="Apps" />
        <SidebarOption Icon={FileCopy} title="File Browser" />
        <SidebarOption Icon={ExpandLess} title="Show less" />
        <hr />
        <SidebarOption Icon={ExpandMore} title="Channels" />
        <hr />
        <SidebarOption Icon={Add} title="Add Channel" addChannelOption />
        {/* Connect to db and list all the channels*/}
        {/* SidebarOptionn */}
        {channels.map((channel) => (
          <SidebarOption title={channel.name} id={channel.id} />
        ))}
      </div>
    );
}

export default Sidebar



