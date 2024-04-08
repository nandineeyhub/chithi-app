export const MidProfilePic = ({ clickref, clickFn}) => {
  return (
    <button ref={clickref}  type="button" onClick={clickFn} className="chat-sidebar-profile-toggle">
      <img
        src="https://www.svgrepo.com/show/527946/user-circle.svg"
        alt=""
      />
    </button>
  );
};
