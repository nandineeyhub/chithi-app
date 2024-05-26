import React from "react";
import ChatSideBar from "../ChatSideBar/ChatSideBar";
import ContentSidebar from "../ContentSidebar";
import DefaultChatWindow from "../DefaultChatWindow";
import Messages from "../Messages";

const ChatWindow = () => {
  return (
    <>
      <section className="chat-section">
        <div className="chat-container">
          <ChatSideBar />

          <div className="chat-content">
            <ContentSidebar />

            <Messages />
          </div>
        </div>
      </section>
    </>
  );
};

export default ChatWindow;
