import React from "react";

const MessageBox = ({content, selfStatus}) => {
  const friendStatus = selfStatus == "" ? "conversation-item-text" : "conversation-item-text-friend"
  return (
    <div className="conversation-item-wrapper">
      <div className="conversation-item-box">
        <div className={friendStatus}>
          <p>{content}</p>
          <div className="conversation-item-time">12:30</div>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
