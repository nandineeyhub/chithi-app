import React from "react";

const ProfileDetails = () => {
  return (
    <div className="my-4">
      <div className="d-flex justify-content-center align-items-center gap-2 my-3">
        <input className="" placeholder="Name" />
        {/* <span><i className="fa fa-pencil"></i></span> */}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <input className="" placeholder="Email" disabled/>
        {/* <span><i className="fa fa-pencil"></i></span> */}
      </div>
    </div>
  );
};

export default ProfileDetails;
