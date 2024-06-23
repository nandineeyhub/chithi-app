import React from "react";
import ContentSidebar from "../ContentSidebar";

import Messages from "../Messages";
import { usePopUp } from "../../../customHooks";

const ChatWindow = () => {
  const [showChat, setShowChat] = usePopUp()

  return (
    <>
      <section className="chat-section">
        <div className="chat-container">
          {/* <ChatSideBar /> */}
        </div>
        <div className="chat-content">
          <ContentSidebar showChat={showChat} setShowChat={setShowChat}/>
          <Messages showChat={showChat} setShowChat={setShowChat}/>
        </div>
      </section>
    </>
  );
};

export default ChatWindow;
