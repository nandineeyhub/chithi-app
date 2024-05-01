import React, { useEffect, useState } from "react";
import MessageTypeBar from "./MessageTypeBar/MessageTypeBar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatDayStamp from "./ChatDayStamp/ChatDayStamp";
import MessageWrapper from "./MessageWrapper/MessageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../Redux/MessageSlice";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";
import DefaultChatWindow from "./DefaultChatWindow";

const Messages = () => {
  const [chatDetails, setChatDetails] = useState({ });
  const [messageBody, setMessageBody] = useState({ chatId: "", content: "" });
  const activeChatDetails = useSelector((store) => store.messages.activeChat);
  const dispatch = useDispatch();

  const handleMessage = (e) => {
    setMessageBody((value) => {
      return { ...value, content: e.target.value };
    });
  };

  const appendNewMessage = (message) => {
    let newMessageList = chatDetails?.messages;
    newMessageList.push(message);
    setChatDetails((value) => {
      return { ...value, messages: newMessageList };
    });
  };

  const accessChat = async (id) => {
    try {
      const response = await callAPI(
        apiUrls.accessChat,
        {},
        "post",
        { userId: id },
        headers
      );
      if (response.status) {
        setChatDetails(response.data);
        setMessageBody((value) => {
          return { ...value, chatId: response.data.chatDetails?._id };
        });
      }
    } catch (error) {}
  };

  const sendMessage = async () => {
    try {
      const response = await callAPI(
        apiUrls.sendMessage,
        {},
        "POST",
        messageBody,
        headers
      );
      if (response.status) {
        setMessageBody((value) => {
          return { ...value, content: "" };
        });
        appendNewMessage(response?.data?.message);
      }
      console.log(response.status);
    } catch (error) {}
  };

  useEffect(() => {
    if (activeChatDetails && Object.keys(activeChatDetails)?.length == 0) {
      dispatch(setActiveChat(JSON.parse(localStorage.getItem("activeChat"))));
    }
  }, []);

  useEffect(() => {
    if (activeChatDetails && Object.keys(activeChatDetails)?.length > 0) {
      accessChat(activeChatDetails?._id);
    }
  }, [activeChatDetails, activeChatDetails?._id]);
  


  return activeChatDetails ? (
    <div className="conversation active">
      <ChatHeader {...activeChatDetails} />
      <div className="conversation-main">
        <div className="conversation-wrapper">
          <ChatDayStamp />
          <MessageWrapper {...chatDetails} />
        </div>
      </div>
      <MessageTypeBar
        handleMessage={handleMessage}
        sendMessage={sendMessage}
        content={messageBody.content}
      />
    </div>
  ) : <DefaultChatWindow/>
};

export default Messages;
