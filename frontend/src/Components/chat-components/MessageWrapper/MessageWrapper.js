import React, { useEffect, useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import UserDpSm from "../UserDpSm/UserDpSm";
import WarningPopup from "../../Popups/WarningPopup";
import { usePopUp } from "../../../customHooks";

const MessageWrapper = ({ messages = [] }) => {
  const [messageList, setMessageList] = useState([]);
  let messageListTemp = [];
  let subList = [];

  const serializeMessage = () => {
    if (messages.length == 0) {
      setMessageList([]);
    } else {
      for (let i = 0; i < messages.length; i++) {
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
          }
        }

        if (i == messages.length - 1) {
          messageListTemp.push(subList);
          setMessageList(messageListTemp);
        }
      }
    }
  };

  useEffect(() => {
    serializeMessage();
  }, [messages.length]);

  return messageList.map((item) => {
    return <MessageContainer item={item} />;
  });
};

export default MessageWrapper;

const MessageContainer = ({ item }) => {
  const [deletePopup, setDeletePopup] = usePopUp();

  const selfStatus =
    item[0]?.sender?._id != JSON.parse(localStorage.getItem("user"))?._id
      ? "me"
      : "";
  return (
    <>
      <li className={`conversation-item ${selfStatus}`}>
        <UserDpSm {...item[0]?.sender} />
        <div className="conversation-item-content">
          {item?.map((message) => {
            return <MessageBox {...message} selfStatus={selfStatus} setDeletePopup={setDeletePopup}/>;
          })}
        </div>
      </li>
      {deletePopup && <WarningPopup action={"Delete"} cancelFn={setDeletePopup}/>}
    </>
  );
};
