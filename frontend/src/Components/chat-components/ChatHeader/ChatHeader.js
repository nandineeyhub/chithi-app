import React from 'react'

const ChatHeader = () => {
  return (
    <div className="conversation-top">
    <button type="button" className="conversation-back active">
      <i className="ri-arrow-left-line" />
    </button>
    <div className="conversation-user">
      <img
        className="conversation-user-image"
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div>
        <div className="conversation-user-name">Someone</div>
        <div className="conversation-user-status online">online</div>
      </div>
    </div>
    <div className="conversation-buttons">
      <button type="button">
        <i className="fa fa-phone" />
      </button>
      <button type="button">
        <i className="fa fa-video-camera" />
      </button>
      <button type="button">
        <i className="fa fa-ellipsis-v" />
      </button>
    </div>
  </div>
  )
}

export default ChatHeader