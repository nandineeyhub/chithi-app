import React from "react";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import CrossIcon from "../../CrossIcon/CrossIcon";
import { groupImg } from "../../../apiConfig";

const AddToGroup = ({ group = [], fn, setGroupfn, addValue }) => {
  const ListAllUsers = () => {
    return group?.map((item) => {
      return (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center p-2">
            <img className="content-message-image" src={groupImg} alt="user" />
            <div>
              <div>{item?.chatName}</div>
            </div>
          </div>
          <div></div>
          <input
            type="checkbox"
            style={{ height: "15px", width: "15px" }}
            checked={addValue?.chatId == item?._id}
            onChange={() => {
              setGroupfn({ ...addValue, chatId: item?._id });
            }}
          />
        </div>
      );
    });
  };

  return (
    <PopupWrapper>
      <div className="d-flex justify-content-between align-items-center">
        <h6>Add to Group</h6>
        <CrossIcon
          fn={() => {
            fn();
            setGroupfn({ ...addValue, chatId: "" })
          }}
        />
      </div>
      <div
        style={{ maxWidth: "300px", fontSize: "13px" }}
        className="my-2 w-100">
        <ListAllUsers />
      </div>
    </PopupWrapper>
  );
};

export default AddToGroup;
