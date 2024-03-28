export const MidProfilePic = ({ clickref, clickFn}) => {
  return (
    <button ref={clickref}  type="button" onClick={clickFn} className="chat-sidebar-profile-toggle">
      <img
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
    </button>
  );
};
