import React, { useRef } from "react";
import { MidProfilePic } from "./ProfilePics";
import { usePopUp } from "../../customHooks";
import Sidebarpopup from "../Popups/sidebarpopup";
import { useSelector } from "react-redux";
import Index from "../ProfileUpload.js/Index";


const ChatSideBar = () => {
  const [open, setOpen] = usePopUp();
  const profileOpen = useSelector(store => store.profile.profileOpen)
  const profileDetails = useSelector(store=>store.profile.profileDetails)

  const clickref = useRef();

  return (
    <aside className="chat-sidebar">
     
      <ul className="chat-sidebar-menu">
        <li>
          <i className="fa fa-comment my-2 text-success"></i>
        </li>
        <li>
          <i className="fa fa-phone my-2 text-secondary"></i>
        </li>
        <li>
          <i className="fa fa-star my-2 text-secondary"></i>
        </li>
  
        <li className="chat-sidebar-profile">
          <MidProfilePic clickFn={setOpen} clickref={clickref} img={profileDetails?.profilePicture}/>
          {open && <Sidebarpopup open={open} clickFn={setOpen} clickref={clickref} />}
        </li>
      </ul>
      { profileOpen && <Index {...profileDetails}/>}
    </aside>
  );
};

export default ChatSideBar;
