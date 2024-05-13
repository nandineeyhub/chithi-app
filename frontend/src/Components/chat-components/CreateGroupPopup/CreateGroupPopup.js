import React from "react";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import CrossIcon from "../../CrossIcon/CrossIcon";
import { imgUrl, noImg } from "../../../apiConfig";
import ActionButtons from "../ActionButtons/ActionButtons";

const CreateGroupPopup = ({ fn, users = [], setGroupData, groupData, submitFn }) => {

  const ListAllUsers = () => {

    return users?.map((item) => {
      const { Users = [], isGroupChat = false } = item;

      const user = Users.filter((item) => {
        return item?._id != JSON.parse(localStorage.getItem("user"))?._id;
      });

      const imgUrlString = imgUrl + user[0]?.profilePicture;

      return (
        isGroupChat == false && (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center p-2">
              <img
                className="content-message-image"
                src={user[1]?.profilePicture == "" ? noImg : imgUrlString}
                alt="user"
              />
              <div>
                <div>{user[0]?.name}</div>
                <div>{user[0]?.email}</div>
              </div>
            </div>
            <div></div>
            <input
              type="checkbox"
              style={{ height: "15px", width: "15px" }}
              checked={groupData?.users?.includes(Users[1]?._id)}
              onChange={() => {
                handleGroupMembers(Users[1]?._id);
              }}
            />
          </div>
        )
      );
    });
  };

  const handleName = (e) => {
    setGroupData((value) => {
      return { ...value, name: e.target.value };
    });
  };

  const handleGroupMembers = (userid) => {
    if (groupData?.users?.includes(userid)) {
      setGroupData((item) => {
        return {
          ...item,
          users: groupData?.users?.filter((item) => item != userid),
        };
      });
    } else {
      let newData = groupData?.users;
      newData.push(userid);
      setGroupData((item) => {
        return { ...item, users: newData };
      });
    }
  };

  return (
    <PopupWrapper>
      <CrossIcon fn={fn} />
      <h5>Create Group</h5>
      <input placeholder="Group Name" className="my-2" onChange={handleName} />
      <div style={{ height: "300px" }} className="my-2  w-100">
        <ListAllUsers />
      </div>
      <ActionButtons submitText="Create" submitFn={submitFn}/>
    </PopupWrapper>
  );
};

export default CreateGroupPopup;
