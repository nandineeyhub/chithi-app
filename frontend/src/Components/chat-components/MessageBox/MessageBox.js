import moment from "moment";
import React from "react";

const MessageBox = ({
  _id = "",
  content = "",
  createdAt = "",
  selfStatus,
  sender,
  setDeletePopup,
  index,
  isGroupChat,
  setId,
  fetchChats,
  forwardPopUpAction,
}) => {
  const friendStatus =
    selfStatus == ""
      ? "conversation-item-text"
      : "conversation-item-text-friend";
  const color = selfStatus == "" ? "blue" : "pink";

  return (
    <div className="conversation-item-wrapper d-flex justify-content-center align-items-center gap-2">
      {selfStatus == "" && (
        <TrashOptions
          setDeletePopup={setDeletePopup}
          clickFn={setId}
          id={_id}
          forwardPopUpAction={forwardPopUpAction}
        />
      )}
      <div className="conversation-item-box">
        <div className={friendStatus}>
          {isGroupChat && index == 0 && (
            <span
              className="fw-bold"
              style={{ fontSize: "12px", color: color }}
            >
              {sender?.name}
            </span>
          )}
          <div>{content}</div>
          <div className="conversation-item-time">
            {moment(createdAt).format("HH:mm")}
          </div>
        </div>
      </div>
      {selfStatus != "" && (
        <TrashOptions
          setDeletePopup={setDeletePopup}
          clickFn={setId}
          fetchChats={fetchChats}
          forwardPopUpAction={forwardPopUpAction}
          id={_id}
        />
      )}
    </div>
  );
};

export default MessageBox;

const TrashOptions = ({
  setDeletePopup,
  clickFn,
  id = "",
  forwardPopUpAction
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-1 trash">
      <i
        className="fa fa-trash"
        onClick={() => {
          setDeletePopup();
          clickFn(id);
        }}
      ></i>
      <i
        className="fa fa-share"
        onClick={() => {
          if(forwardPopUpAction) forwardPopUpAction(id)
        }}
      ></i>
    </div>
  );
};
