import React from "react";

const ProfileDetails = () => {
  return (
    <div className="d-flex justify-content-center align-items-center gap-4 my-4">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <input className="" placeholder="Name" />
        {/* <span><i className="fa fa-pencil"></i></span> */}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <input className="" placeholder="Email" />
        {/* <span><i className="fa fa-pencil"></i></span> */}
      </div>
    </div>
  );
};

export default ProfileDetails;
