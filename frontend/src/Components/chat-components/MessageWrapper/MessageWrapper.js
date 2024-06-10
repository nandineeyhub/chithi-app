import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import UserDpSm from "../UserDpSm/UserDpSm";
import WarningPopup from "../../Popups/WarningPopup";
import { usePopUp } from "../../../customHooks";
import moment from "moment";
import ChatDayStamp from "../ChatDayStamp/ChatDayStamp";

const MessageWrapper = ({ messages = [], chatDetails }) => {
  const [messageList, setMessageList] = useState([]);
  let messageListTemp = [];
  let subList = [];
  const chatEndRef = useRef(null);

  const serializeMessage = () => {
    if (messages.length == 0) {
      setMessageList([]);
    } else {
      for (let i = 0; i < messages.length; i++) {
        if (i == 0) {
          subList.push(messages[i]);
        } else {
          if (messages[i].sender._id == messages[i - 1].sender._id) {
            if (
              moment(messages[i].createdAt).format("YYYY/MM/DD") ==
              moment(messages[i - 1].createdAt).format("YYYY/MM/DD")
            )
              subList.push(messages[i]);
            else {
              messageListTemp.push(subList);
              setMessageList(messageListTemp);
              subList = [];
              subList.push(messages[i]);
            }
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

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    serializeMessage();
  }, [messages.length]);

  useEffect(()=>{
   scrollToBottom()
  },[messageList])

  return (
    <div>
      {messageList.map((item, i) => {
        const lastLabel = i != 0 ? messageList[i - 1][0]?.createdAt : "";
        return (
          <MessageContainer
            item={item}
            isGroupChat={chatDetails?.isGroupChat}
            lastLabel={lastLabel}
            i={i}
          />
        );
      })}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default MessageWrapper;

const MessageContainer = ({ item, isGroupChat, lastLabel, i }) => {
  const [deletePopup, setDeletePopup] = usePopUp();

  const selfStatus =
    item[0]?.sender?._id != JSON.parse(localStorage.getItem("user"))?._id
      ? "me"
      : "";

  const getLabel = () => {
    if (i == 0) return true;
    else if (
      moment(item[0]?.createdAt).format("YYYY/MM/DD") !=
      moment(lastLabel).format("YYYY/MM/DD")
    )
      return true;
    else return false;
  };

  return (
    <>
      {getLabel() && <ChatDayStamp dateString={item[0].createdAt} />}
      <li className={`conversation-item ${selfStatus}`}>
        <UserDpSm {...item[0]?.sender} />
        <div className="conversation-item-content">
          {item?.map((message, index) => {
            return (
              <MessageBox
                isGroupChat={isGroupChat}
                index={index}
                {...message}
                selfStatus={selfStatus}
                setDeletePopup={setDeletePopup}
              />
            );
          })}
        </div>
      </li>
      {deletePopup && (
        <WarningPopup action={"Delete"} cancelFn={setDeletePopup} />
      )}
    </>
  );
};
