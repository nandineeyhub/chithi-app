import React from "react";
import { useSelector } from "react-redux";
import { imgUrl, noImg } from "../../../apiConfig";

const ChatHeader = ({ name="User", profilePicture="" }) => {
  
  const profilePicUrl = profilePicture == "" ? noImg : imgUrl+profilePicture

  return (
    <div className="conversation-top">
      <button type="button" className="conversation-back active">
        <i className="fa fa-arrow-left" />
      </button>
      <div className="conversation-user">
        <img
          className="conversation-user-image"
          src={profilePicUrl}
          alt="user"
        />
        <div>
          <div className="conversation-user-name">{name}</div>
          <div className="conversation-user-status online">online</div>
        </div>
      </div>
      <div className="conversation-buttons">
        <button type="button">
          <i className="fa fa-phone" />
        </button>
        <button type="button">
          <i className="fa fa-video-camera" />
        </button>
        <button type="button">
          <i className="fa fa-ellipsis-v" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
