import React, { useState } from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";
import { setActiveChat } from "../../Redux/MessageSlice";
import {useDispatch} from "react-redux"

const ContentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendSuggestions, setFriendSuggestions] = useState([]);

  const dispatch = useDispatch()

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value == "") {
      setFriendSuggestions([]);
    } else {
      const timer = setTimeout(() => {
        if(e.target.value != "") searchfriends(e.target.value);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  const searchfriends = async (searchQuery) => {
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
      }
    } catch (error) {}
  };

  const openChat = (item) => {
    dispatch(setActiveChat(item))
  }

  const ListAllUsers = () => {
    return (
      friendSuggestions?.map((item) => {
        return <UserCard {...item} clickFn={()=>{openChat(item)}}/>
        
      })
    )
  }

  return (
    <div className="content-sidebar active">
      <div className="content-sidebar-title">Chats</div>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <div className="content-messages">
        <ul className="content-messages-list">
          <li className="content-message-title">
            {/* <span>Recently</span> */}
          </li>
            <ListAllUsers/>
        </ul>
      </div>
    </div>
  );
};

export default ContentSidebar;
