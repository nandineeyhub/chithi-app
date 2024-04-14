import React, { useState } from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";

const ContentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendSuggestions, setFriendSuggestions] = useState([]);

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

  console.log(friendSuggestions);

  return (
    <div className="content-sidebar active">
      <div className="content-sidebar-title">Chats</div>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <div className="content-messages">
        <ul className="content-messages-list">
          <li className="content-message-title">
            {/* <span>Recently</span> */}
          </li>
          {friendSuggestions?.map((item) => {
            return <UserCard {...item} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ContentSidebar;
