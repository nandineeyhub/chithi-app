import React from "react";
import MessageTypeBar from "./MessageTypeBar/MessageTypeBar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatDayStamp from "./ChatDayStamp/ChatDayStamp";
import MessageWrapper from "./MessageWrapper/MessageWrapper";

const Messages = () => {
  return (
    <div className="conversation active">
      <ChatHeader />
      <div className="conversation-main">
        <div className="conversation-wrapper">
          <ChatDayStamp />
           <MessageWrapper/>
        </div>
      </div>
      <MessageTypeBar />
    </div>
  );
};

export default Messages;
