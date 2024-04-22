import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import UserDpSm from "../UserDpSm/UserDpSm";

const MessageWrapper = () => {
  return (
    <li className="conversation-item me">
      <UserDpSm/>
      <div className="conversation-item-content">
        <MessageBox/>
      </div>
    </li>
  );
};

export default MessageWrapper;
