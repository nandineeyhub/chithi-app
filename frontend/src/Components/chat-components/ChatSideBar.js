import React, { useRef } from "react";
import { MidProfilePic } from "./ProfilePics";
import { usePopUp } from "../../customHooks";
import Sidebarpopup from "../Popups/sidebarpopup";
import { useSelector } from "react-redux";


const ChatSideBar = () => {
  const [open, setOpen] = usePopUp();
  const profileOpen = useSelector(store => store.profile.profileOpen)
  console.log(profileOpen)
  const clickref = useRef();
  return (
    <aside className="chat-sidebar">
      <a href="#" className="chat-sidebar-logo">
        <i className="ri-chat-1-fill" />
      </a>
      <ul className="chat-sidebar-menu">
        <li className="active">
          <a data-title="Chats">
            <i className="ri-chat-3-line" />
          </a>
        </li>
        <li>
          <a data-title="Contacts">
            <i className="ri-contacts-line" />
          </a>
        </li>
        <li>
          <a data-title="Documents">
            <i className="ri-folder-line" />
          </a>
        </li>
        <li>
          <a data-title="Settings">
            <i className="ri-settings-line" />
          </a>
        </li>
        <li className="chat-sidebar-profile">
          <MidProfilePic clickFn={setOpen} clickref={clickref}/>
          {open && <Sidebarpopup open={open}  clickFn={setOpen} clickref={clickref}/>}
        </li>
      </ul>
      {/* { profileOpen && <Index/>} */}
    </aside>
  );
};

export default ChatSideBar;
