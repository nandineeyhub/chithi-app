import React from "react";
import PopupWrapper from "../PopupWrapper/PopupWrapper";
import CrossIcon from "../../CrossIcon/CrossIcon";
import UserCard from "../userCard/userCard";
import { imgUrl, noImg } from "../../../apiConfig";
import ActionButtons from "../ActionButtons/ActionButtons";

const CreateGroupPopup = ({ fn, users = [], setGroupData, groupData }) => {
  
  const ListAllUsers = () => {
    return users?.map((item) => {
      const { Users = [], isGroupChat=false} = item;
      const imgUrlString = imgUrl+Users[1]?.profilePicture
      return isGroupChat==false && (
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center p-2">
            <img className="content-message-image" src={Users[1]?.profilePicture == "" ? noImg : imgUrlString} alt="user" />
           <div>
           <div>{Users[1]?.name}</div>
            <div>{Users[1]?.email}</div>
           </div>
          </div>
          <div></div>
          <input type="checkbox" style={{ height: "15px", width: "15px" }} 
           checked={groupData?.users?.includes(Users[1]?._id)}
           onChange={()=>{handleGroupMembers(Users[1]?._id)}}/>
        </div>
      );
    });
  };

  const handleName = (e) => {
    setGroupData((value) => {return {...value, name: e.target.value}})
  }

  const handleGroupMembers = (userid) => {
      if(groupData?.users?.includes(userid)){
        setGroupData((item) => {return {...item, users: groupData?.users?.filter((item) => item != userid)}})
      }
      else {
        let newData = groupData?.users
        newData.push(userid)
        setGroupData((item) => {return {...item, users:newData}})
      }
  }

  return (
    <PopupWrapper>
      <CrossIcon fn={fn} />
      <h5>Create Group</h5>
      <input placeholder="Group Name" className="my-2" onChange={handleName} />
      <div style={{ height: "300px" }} className="my-2  w-100">
        <ListAllUsers/>
      </div>
      <ActionButtons submitText="Create"/>
    </PopupWrapper>
  );
};

export default CreateGroupPopup;
