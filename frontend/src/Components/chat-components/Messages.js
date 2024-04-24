import React, { useEffect, useState } from "react";
import MessageTypeBar from "./MessageTypeBar/MessageTypeBar";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatDayStamp from "./ChatDayStamp/ChatDayStamp";
import MessageWrapper from "./MessageWrapper/MessageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../Redux/MessageSlice";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";

const Messages = () => {
  const [chatDetails, setChatDetails] = useState({})
  const [messageBody, setMessageBody] = useState({chatId:"", content:""})
  const activeChatDetails = useSelector((store) => store.messages.activeChat);
  const dispatch = useDispatch();

  const handleMessage = (e) => {
    setMessageBody((value)=>{ return {...value, content:e.target.value}})
  }
 
  const accessChat = async (id) => {
    try {
      const response = await callAPI(
        apiUrls.accessChat,
        {},
        "post",
        { userId: id },
        headers
      );
      if(response.status){
        setChatDetails(response.data)
        setMessageBody((value) => {return {...value, chatId:response.data.chatDetails?._id}})
      }
    } catch (error) {}
  };

  const sendMessage = async () => {
    try {
      const response = await callAPI(apiUrls.sendMessage, {}, 'POST', messageBody, headers)
      
    } catch(error){

    }
  }

  useEffect(() => {
    if (Object.keys(activeChatDetails)?.length == 0) {
      dispatch(setActiveChat(JSON.parse(localStorage.getItem("activeChat"))));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(activeChatDetails)?.length > 0) {
     accessChat(activeChatDetails?._id)
    }
  }, [activeChatDetails, activeChatDetails?._id]);

  return (
    <div className="conversation active">
      <ChatHeader {...activeChatDetails} />
      <div className="conversation-main">
        <div className="conversation-wrapper">
          <ChatDayStamp />
          <MessageWrapper {...chatDetails}/>
        </div>
      </div>
      <MessageTypeBar handleMessage={handleMessage} sendMessage={sendMessage}/>
    </div>
  );
};

export default Messages;
