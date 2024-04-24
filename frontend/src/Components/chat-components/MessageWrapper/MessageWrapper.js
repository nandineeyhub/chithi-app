import React, { useEffect, useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import UserDpSm from "../UserDpSm/UserDpSm";

const MessageWrapper = ({ messages = [] }) => {
  const [messageList, setMessageList] = useState([]);
  let messageListTemp = [];
  let subList = [];

  const serializeMessage = () => {
    for (let i = 0; i < messages.length; i++) {
      console.log(messages[i].content, subList);
      if (i == 0) {
        subList.push(messages[i]);
      } else {
        if (messages[i].sender._id == messages[i - 1].sender._id) {
          subList.push(messages[i]);
        } else {
          messageListTemp.push(subList);
          setMessageList(messageListTemp);
          subList = [];
          subList.push(messages[i]);
          console.log(messages[i].content);
        }
      }

      if(i == messages.length - 1){
        messageListTemp.push(subList);
        setMessageList(messageListTemp);
      }
    }
  };

  console.log(messageList);

  useEffect(() => {
    serializeMessage();
  }, [messages]);

  return messageList.map((item) => {
    console.log("run");
    return <MessageContainer item={item} />;
  });
};

export default MessageWrapper;

const MessageContainer = ({ item }) => {
  console.log(item[0]?.sender?._id == JSON.parse(localStorage.getItem("user"))?._id)
  const selfStatus =
    item[0]?.sender?._id != JSON.parse(localStorage.getItem("user"))?._id
      ? "me"
      : "";
  return (
    <li className={`conversation-item ${selfStatus}`}>
      <UserDpSm {...item[0]?.sender} />
      <div className="conversation-item-content">
        {item?.map((message) => {
          return <MessageBox {...message} selfStatus={selfStatus} />;
        })}
      </div>
    </li>
  );
};
