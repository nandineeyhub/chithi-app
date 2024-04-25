import React, { useEffect, useState } from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";
import { setActiveChat } from "../../Redux/MessageSlice";
import { useDispatch } from "react-redux";

const ContentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [chats, setChats] = useState([]);

  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value != "") setLoader(true);
    else setLoader(false);
  };

  const fetchChats = async () => {
    setLoader(true);
    try {
      const response = await callAPI(
        apiUrls.fetchChats,
        {},
        "get",
        null,
        headers
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

  const ListAllUsers = () => {
    return (
      loader == false &&
      friendSuggestions?.map((item) => {
        const { Users = [] } = item;
        return searchQuery.length == 0 ? (
          <UserCard
            name={Users[1]?.name}
            profilePicture={Users[1]?.profilePicture}
            latestMessage={item?.latestMessage?.content}
            clickFn={() => {
              openChat(item?.Users[1]);
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
      <div className="content-sidebar-title">Chats</div>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <div className="content-messages">
        <ul className="content-messages-list">
          <li className="content-message-title">
            {/* <span>Recently</span> */}
          </li>
          <ListAllUsers />
        </ul>
      </div>
    </div>
  );
};

export default ContentSidebar;
