import React, { useEffect, useRef, useState } from "react";
import { apiUrls, imgUrl, noImg } from "../../../apiConfig";
import GroupChatOptionPopup from "../PopupWrapper/GroupChatOptionPopup";
import { usePopUp } from "../../../customHooks";
import Index from "../../ProfileUpload.js/Index";
import { useSelector } from "react-redux";
import ViewGroupPopup from "../viewGroupPopup/ViewGroupPopup";
import AddToGroup from "../AddToGroup/AddToGroup";
import callAPI from "../../../apiUtils/apiCall";

const ChatHeader = ({
  name = "User",
  profilePicture = "",
  isGroupChat = false,
  groupAdmin,
  Users = [],
}) => {
  const activeChatDetails = useSelector((store) => store.messages.activeChat);
  const [open, setOpen] = usePopUp();
  const [profileOpen, setProfileOpen] = usePopUp();
  const [addOpen, setAddOpen] = usePopUp();
  const [removeOpen, setRemoveOpen] = usePopUp();
  const [addValue, setAddValue] = useState({
    userId: activeChatDetails?._id,
    chatId: "",
  });
  const [group, setGroup] = useState();
  const clickref = useRef();

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const profilePicUrl =
    profilePicture == ""
      ? noImg
      : isGroupChat
      ? profilePicture
      : imgUrl + profilePicture;
  const conversationSubtitle = isGroupChat ? (
    <>
      You,{" "}
      {Users?.map((user, i) => {
        if (user._id != userDetails._id) {
          const member =
            i + 1 != Users.length
              ? " " + user.name + ","
              : " " + user.name + ".";
          return member;
        }
      })}
    </>
  ) : (
    "online"
  );

  const fetchChats = async () => {
    try {
      const response = await callAPI(apiUrls.fetchChats, {}, "get", null);
      if (response.status) {
        const data = response.data?.filter((value) => {
          return value?.isGroupChat == true;
        });

        const groups = data.filter((group) => {
          console.log(group?.Users)
          return group?.Users?.includes(activeChatDetails?._id) == false;
        });

        setGroup(groups);
      }
    } catch (error) {}
  };

  const addToGroup = async () => {
    try {
      const response = await callAPI(apiUrls.addToGroup, {}, "post", addValue);
      if (response.status) {
        setAddOpen();
        setAddValue({ ...addValue, chatId: "" });
      }
    } catch (error) {}
  };

  const removeFromGroup = async (chatId, userId) => {
    try {
      const response = await callAPI(apiUrls.removeFromGroup, {}, "post", {
        chatId: chatId,
        userId: userId,
      });
      if (response.status) {
        setRemoveOpen();
      }
    } catch (error) {}
  };

  const chatOptionsText = () => {
    if (isGroupChat) {
      if (groupAdmin?._id == userDetails._id) {
        return "Remove friend";
      } else return "Leave Group";
    } else return "Add to Group";
  };

  const fn = () => {
    if (isGroupChat) {
      if (groupAdmin?._id == userDetails._id) return setRemoveOpen;
    } else {
      return setAddOpen;
    }
  };

  useEffect(() => {
    if (addOpen) {
      fetchChats();
    }
  }, [addOpen]);

  useEffect(()=>{
   setAddValue({userId:activeChatDetails?._id})
  },[activeChatDetails?._id])

  return (
    <div className="conversation-top">
      <button type="button" className="conversation-back active">
        <i className="fa fa-arrow-left" />
      </button>
      <div className="conversation-user">
        <img
          className="conversation-user-image"
          src={profilePicUrl}
          alt="user"
        />
        <div>
          <div className="conversation-user-name">{name}</div>
          <div className="conversation-user-status online">
            {conversationSubtitle}
          </div>
        </div>
      </div>
      <div className="conversation-buttons">
        {/* <button type="button">
          <i className="fa fa-phone" />
        </button>
        <button type="button">
          <i className="fa fa-video-camera" />
        </button> */}
        <div type="button" style={{ marginTop: "auto", position: "relative" }}>
          <i className="fa fa-ellipsis-v" onClick={setOpen} />
          <div className="group-add-popup">
            {open && (
              <GroupChatOptionPopup
                text={chatOptionsText()}
                clickFn={setOpen}
                clickref={clickref}
                fn={fn()}
                fnView={setProfileOpen}
              />
            )}
          </div>
        </div>
      </div>
      {profileOpen &&
        (isGroupChat ? (
          <ViewGroupPopup {...activeChatDetails} fn={setProfileOpen} />
        ) : (
          <Index profileDetails={activeChatDetails} fn={setProfileOpen} />
        ))}
      {addOpen && (
        <AddToGroup
          group={group}
          fn={setAddOpen}
          setGroupfn={setAddValue}
          addValue={addValue}
          submitfn={addToGroup}
        />
      )}
      {removeOpen && (
        <ViewGroupPopup
          {...activeChatDetails}
          fn={setRemoveOpen}
          submitfn={removeFromGroup}
          action={true}
        />
      )}
    </div>
  );
};

export default ChatHeader;
