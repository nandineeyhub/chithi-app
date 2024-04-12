import React from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";

const ContentSidebar = () => {
  return (
    <div className="content-sidebar active">
      <div className="content-sidebar-title">Chats</div>
      <SearchBar />
      <div className="content-messages">
        <ul className="content-messages-list">
          <li className="content-message-title">
            {/* <span>Recently</span> */}
          </li>
          <UserCard />
        </ul>
      </div>
    </div>
  );
};

export default ContentSidebar;
