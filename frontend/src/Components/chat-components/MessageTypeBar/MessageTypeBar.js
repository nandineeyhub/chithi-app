import React from "react";

const MessageTypeBar = ({ handleMessage, sendMessage, content="" }) => {
  return (
    <div className="conversation-form">
      <div className="d-flex justify-content-center align-items-center gap-2">
      <button type="button" className="conversation-form-button">
        <i className="fa fa-smile-o" />
      </button>
      <button type="button" className="conversation-form-record">
        <i className="fa fa-microphone" />
      </button>
      </div>
      <div className="conversation-form-group">
        <textarea
          className="conversation-form-input"
          rows={1}
          placeholder="Type here..."
          value={content}
          onChange={handleMessage}
        />
      </div>
      <button
        type="button"
        onClick={sendMessage}
        className="conversation-form-button conversation-form-submit">
        <i className="fa fa-send-o" />
      </button>
    </div>
  );
};

export default MessageTypeBar;
