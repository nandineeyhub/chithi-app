import React, { useEffect } from "react";
import MessageTypeBar from "./MessageTypeBar/MessageTypeBar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatDayStamp from "./ChatDayStamp/ChatDayStamp";
import MessageWrapper from "./MessageWrapper/MessageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../Redux/MessageSlice";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";

const Messages = () => {

  const activeChatDetails = useSelector((store) => store.messages.activeChat);
  const dispatch = useDispatch();

  const accessChat = async (id) => {
    try {
      const response = await callAPI(
        apiUrls.accessChat,
        {},
        "post",
        { userId: id },
        headers
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(activeChatDetails)?.length == 0) {
      dispatch(setActiveChat(JSON.parse(localStorage.getItem("activeChat"))));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(activeChatDetails)?.length > 0) {
     accessChat(activeChatDetails?._id)
    }
  }, [activeChatDetails?._id]);

  return (
    <div className="conversation active">
      <ChatHeader {...activeChatDetails} />
      <div className="conversation-main">
        <div className="conversation-wrapper">
          <ChatDayStamp />
          <MessageWrapper />
        </div>
      </div>
      <MessageTypeBar />
    </div>
  );
};

export default Messages;
