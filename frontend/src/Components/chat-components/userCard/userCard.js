import React from "react";
import { imgUrl, noImg } from "../../../apiConfig";

const UserCard = ({name = "--", profilePicture=""}) => {
  return (
    <li>
      <a>
        <img
          className="content-message-image"
          src={profilePicture =="" ? noImg : imgUrl+profilePicture}
          alt=""
        />
        <span className="content-message-info">
          <span className="content-message-name">{name}</span>
          {/* <span className="content-message-text">
            Lorem ipsum dolor sit amet consectetur.
          </span> */}
        </span>
        <span className="content-message-more">
          {/* <span className="content-message-unread">5</span> */}
          {/* <span className="content-message-time">12:30</span> */}
        </span>
      </a>
    </li>
  );
};

export default UserCard;
