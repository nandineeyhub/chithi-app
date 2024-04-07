import React, { useState } from "react";
import ProfileDp from "./ProfileDp";
import ProfileDetails from "./ProfileDetails";
import ProfileUpdateSubmit from "./ProfileUpdateSubmit";
import { useDispatch } from "react-redux";
import { handleProfileOpen } from "../../Redux/ProfileSlice";


const Index = () => {
  const [dp, setDp] = useState("");
  const dispatch = useDispatch()
  
  const uploadDp = (e) => {
    setDp(e.target.files[0]);
  };

  return (
    <div className="profile active">
      <div className="spinner_overlay"></div>

      <div className="spinner-box w-25">
        <div className="d-flex justify-content-end align-items-center mb-4">
          <i className="fa fa-close" style={{cursor:"pointer"}} onClick={()=>{
            dispatch(handleProfileOpen())
          }}></i>
        </div>
        <div className="d-flex justify-content-center align-items-center h-50">
          <ProfileDp dp={dp} uploadDp={uploadDp} />
        </div>
        <ProfileDetails />
        <ProfileUpdateSubmit />
      </div>
    </div>
  );
};

export default Index;
