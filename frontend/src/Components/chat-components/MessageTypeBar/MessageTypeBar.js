import React from "react";

const MessageTypeBar = () => {
  return (
    <div className="conversation-form">
      <button type="button" className="conversation-form-button">
        <i className="fa fa-smile-o" />
      </button>
      <div className="conversation-form-group">
        <textarea
          className="conversation-form-input"
          rows={1}
          placeholder="Type here..."
          defaultValue={""}
        />
        <button type="button" className="conversation-form-record">
          <i className="fa fa-microphone" />
        </button>
      </div>
      <button
        type="button"
        className="conversation-form-button conversation-form-submit">
        <i className="fa fa-send-o" />
      </button>
    </div>
  );
};

export default MessageTypeBar;
