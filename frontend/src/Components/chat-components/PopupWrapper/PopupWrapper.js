import React from "react";

const PopupWrapper = ({ children }) => {
  return (
    <div className="profile active">
      <div className="spinner_overlay"></div>
      <div className="spinner-box w-25">{children}</div>
    </div>
  );
};

export default PopupWrapper;
