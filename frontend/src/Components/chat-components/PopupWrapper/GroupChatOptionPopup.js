import React from "react";

const GroupChatOptionPopup = ({text = "", fn, fnView}) => {
  return (
    <div
      className=" text-start"
      style={{ backgroundColor: "#f0f2f5", width: "200px" }}>
  
        <div className="d-flex align-items-center gap-3 p-3" onClick={()=>{
          if(fn) fn()
        }}>
          <i className="fa fa-sign-out" />
          <span>{text}</span>
        </div>
        <div className=" d-flex align-items-center gap-3 p-3" onClick={()=>{
          if(fnView) fnView()
        }}>
          <i className="fa fa-eye" />
          <span>View Details</span>
        </div>

    </div>
  );
};

export default GroupChatOptionPopup;
