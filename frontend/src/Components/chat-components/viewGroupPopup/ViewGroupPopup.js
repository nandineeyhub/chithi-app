import React from "react";
import CrossIcon from "../../CrossIcon/CrossIcon";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import { imgUrl, noImg } from "../../../apiConfig";

const ViewGroupPopup = ({ fn, Users = [], chatName = "" }) => {
  const ListAllUsers = () => {
    return Users?.map((item) => {
      const { name = "", email = "" } = item;
      const imgUrlString = imgUrl + item?.profilePicture;
      return (
        <div className="d-flex justify-content-start align-items-center p-2 gap-2">
          <img
            className="content-message-image"
            src={item?.profilePicture == "" ? noImg : imgUrlString}
            alt="user"
          />
          <div>
            <div>{name}</div>
            <div>{email}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <PopupWrapper>
      <div className="d-flex justify-content-between align-items-center">
        <h6>{chatName}</h6>
        <CrossIcon fn={fn} />
      </div>

      <div
        style={{ maxWidth: "300px", fontSize: "13px" }}
        className="my-2 w-100"
      >
        <ListAllUsers />
      </div>
    </PopupWrapper>
  );
};

export default ViewGroupPopup;
