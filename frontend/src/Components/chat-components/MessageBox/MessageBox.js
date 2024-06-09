import moment from "moment";
import React from "react";

const MessageBox = ({ content = "", createdAt = "", selfStatus, setDeletePopup }) => {
  const friendStatus =
    selfStatus == ""
      ? "conversation-item-text"
      : "conversation-item-text-friend";
  return (
    <div className="conversation-item-wrapper d-flex justify-content-center align-items-center gap-2">
      {selfStatus == "" && <TrashOptions setDeletePopup={setDeletePopup}/>}
      <div className="conversation-item-box">
        <div className={friendStatus}>
          <p>{content}</p>
          <div className="conversation-item-time">
            {moment(createdAt).format("DD:MM")}
          </div>
        </div>
      </div>
      {selfStatus != "" && <TrashOptions setDeletePopup={setDeletePopup}/>}
    </div>
  );
};

export default MessageBox;

const TrashOptions = ({setDeletePopup}) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-1 trash">
      <i className="fa fa-trash" onClick={setDeletePopup}></i>
      <i className="fa fa-share"></i>
    </div>
  );
};
