import React, { useEffect, useState } from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";
import { setActiveChat } from "../../Redux/MessageSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateGroupPopup from "./CreateGroupPopup/CreateGroupPopup";
import useHandlePopup from "../../helpers/useHandlePopup";

const ContentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [chats, setChats] = useState([]);
  const [groupOpen, setGroupOpen] = useHandlePopup();
  const [groupData, setGroupData] = useState({ name: "", users: [] });

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const headerstemp = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // example header
  };
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value != "") setLoader(true);
    else setLoader(false);
  };

  const createGroupChat = async () => {
    try {
      const response = await callAPI(
        apiUrls.createGroupChat,
        {},
        "post",
        groupData,
        headerstemp
      );
      if (response.status) {
        setGroupOpen();
        setGroupData({ name: "", users: [] });
      }
    } catch (error) {}
  };

  const fetchChats = async () => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.fetchChats,
        {},
        "get",
        null,
        headerstemp
      );
      if (response.status) {
        setChats(response.data);
        setFriendSuggestions(response.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const searchfriends = async (searchQuery) => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.searchFriends,
        { search: searchQuery },
        "GET",
        [],
        headers
      );
      if (response?.status) {
        setFriendSuggestions(response?.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const openChat = (item) => {
    dispatch(setActiveChat(item));
    localStorage.setItem("activeChat", JSON.stringify(item));
  };

  const cancelFn = () => {
    setGroupOpen()
  }

  const ListAllUsers = () => {
    return (
      loader == false &&
      friendSuggestions?.map((item) => {
        const { Users = [], chatName= "group", isGroupChat="false" } = item;
        const user = Users.filter((item) => {
          return item?._id != JSON.parse(localStorage.getItem("user"))?._id;
        });
        return searchQuery.length == 0 ? (
          <UserCard
            name={isGroupChat==true ? chatName : user[0]?.name}
            profilePicture={user[0]?.profilePicture}
            latestMessage={item?.latestMessage?.content}
            clickFn={() => {
              user.length > 0 && openChat(user[0]);
            }}
          />
        ) : (
          <UserCard
            {...item}
            latestMessage={"Tap to send a message."}
            clickFn={() => {
              openChat(item);
            }}
          />
        );
      })
    );
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFriendSuggestions(chats);
    } else {
      const timer = setTimeout(() => {
        searchfriends(searchQuery);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="content-sidebar active">
      <div className="d-flex justify-content-between align-items-center">
        <div className="content-sidebar-title">Chats</div>
        <i
          className="fa fa-plus content-sidebar-title group-add"
          onClick={setGroupOpen}></i>
      </div>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <div className="content-messages">
        <ul className="content-messages-list">
          <li className="content-message-title">
            {/* <span>Recently</span> */}
          </li>
          <ListAllUsers />
        </ul>
      </div>
      {groupOpen && (
        <CreateGroupPopup
          fn={setGroupOpen}
          users={chats}
          setGroupData={setGroupData}
          groupData={groupData}
          submitFn={createGroupChat}
          cancelFn={cancelFn}
        />
      )}
    </div>
  );
};

export default ContentSidebar;
