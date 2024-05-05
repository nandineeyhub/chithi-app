import React, { useRef } from "react";
import { imgUrl } from "../../apiConfig";
import { useDispatch, useSelector } from "react-redux";
const ProfileDp = ({  uploadDp }) => {
  const dp = useSelector(store => store.profile.profileDetails.profilePicture)
  const openFileref = useRef();
  
  const clickFileInput = () => {
    openFileref.current.click();
  };

  return (
    <div className="choose-dp-logo">
      <div className="user_img">
      <img
        className=""
        src={dp == "" ? "/Images/upload-icon.png" : imgUrl+dp}
      />
      </div>
      <div className="edit-dp d-flex justify-content-center align-items-center">
        <i className="fa fa-pencil pencil-size" onClick={clickFileInput}></i>
      </div>
      <input
        className="choose-dp"
        type="file"
        accept="image/*"
        onChange={(e)=>{uploadDp(e)}}
        ref={openFileref}
      />
    </div>
  );
};

export default ProfileDp;
