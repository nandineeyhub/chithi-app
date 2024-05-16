import React from "react";
import { imgUrl, noImg } from "../../../apiConfig";

const ChatHeader = ({ name="User", profilePicture="", isGroupChat=false, Users=[] }) => {
  
  const userDetails = JSON.parse(localStorage.getItem("user"))
  const profilePicUrl = profilePicture == "" ? noImg : isGroupChat ? profilePicture : imgUrl+profilePicture
  const conversationSubtitle =  isGroupChat ? <> You, {Users?.map((user, i)=>{
    if(user._id != userDetails._id){ 
      const member = i+1 != (Users.length) ? " "+ user.name + "," : " "+ user.name + "."
      return member
    }
  })}</>  : "online"

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
          <div className="conversation-user-status online">{conversationSubtitle}</div>
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
