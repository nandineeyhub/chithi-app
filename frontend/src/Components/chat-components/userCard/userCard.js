import React from "react";

const UserCard = () => {
  return (
    <li>
      <a>
        <img
          className="content-message-image"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <span className="content-message-info">
          <span className="content-message-name">Someone</span>
          <span className="content-message-text">
            Lorem ipsum dolor sit amet consectetur.
          </span>
        </span>
        <span className="content-message-more">
          {/* <span className="content-message-unread">5</span> */}
          <span className="content-message-time">12:30</span>
        </span>
      </a>
    </li>
  );
};

export default UserCard;
