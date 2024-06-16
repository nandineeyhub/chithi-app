import { groupImg, imgUrl } from "../../apiConfig";
import CrossIcon from "../CrossIcon/CrossIcon";
import ActionButtons from "../chat-components/ActionButtons/ActionButtons";
import PopupWrapper from "../chat-components/PopupWrapper/PopupWrapper";

const ForwardPopup = ({submitfn, chats}) => {
    const ListAllUsers = () => {
        return chats?.length > 0 ? (
          chats?.map((item) => {
            const { Users = [], chatName = "group", isGroupChat = "false" } = item;
            const user = Users.filter((item) => {
              return item?._id != JSON.parse(localStorage.getItem("user"))?._id;
            });
            return (
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start align-items-center p-2">
                  <img
                    className="content-message-image"
                    src={ isGroupChat == true ? groupImg : imgUrl + user[0]?.profilePicture}
                    alt="user"
                  />
                  <div>
                    <div>{isGroupChat == true ? chatName : user[0]?.name}</div>
                  </div>
                </div>
                <div></div>
                <input
                  type="checkbox"
                  style={{ height: "15px", width: "15px" }}
                  onChange={() => {
                   
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            No chat found
          </div>
        );
      };
  return (
    <PopupWrapper>
      <div className="d-flex justify-content-between align-items-center">
        <h6>Forward Message</h6>
        <CrossIcon
          fn={() => {
           
          }}
        />
      </div>
      <div
        style={{ maxWidth: "300px", fontSize: "13px" }}
        className="my-2 w-100"
      >
        <ListAllUsers />
      </div>
     
      {chats?.length > 0 &&  <ActionButtons
          submitFn={submitfn}
          cancelFn={() => {
            
          }}
        />}
    
    </PopupWrapper>
  );
};

export default ForwardPopup;
