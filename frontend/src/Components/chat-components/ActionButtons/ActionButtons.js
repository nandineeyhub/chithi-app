import React from "react";

const ActionButtons = ({ submitText = "Submit", submitFn, cancelFn }) => {
  return (
    <div className="d-flex justify-content-end align-items start gap-2 mt-5">
      <button
        className="btn btn-secondary"
        onClick={() => {
          if (cancelFn) cancelFn();
        }}
      >
        Cancel
      </button>
      <button
        className="btn btn-success"
        onClick={() => {
          if (submitFn) submitFn();
        }}
      >
        {submitText}
      </button>
    </div>
  );
};

export default ActionButtons;
