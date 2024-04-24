import React, { useEffect, useState } from "react";
import UserCard from "./userCard/userCard";
import SearchBar from "./SearchBar/SearchBar";
import callAPI from "../../apiUtils/apiCall";
import { apiUrls, headers } from "../../apiConfig";
import { setActiveChat } from "../../Redux/MessageSlice";
import {useDispatch} from "react-redux"

const ContentSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friendSuggestions, setFriendSuggestions] = useState([]);
  const [chats, setChats] = useState([])

  const dispatch = useDispatch()



  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
  }


  const fetchChats = async () => {
    try{
     const response = await callAPI(apiUrls.fetchChats, {}, 'get', null, headers)
     if(response.status){
      setChats(response.data)
     }
    } catch(error){

    }
  }



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
    localStorage.setItem("activeChat", JSON.stringify(item))
  }

  const ListAllUsers = () => {
    return (
      friendSuggestions?.map((item) => {
        return <UserCard {...item} clickFn={()=>{openChat(item)}}/>
      })
    )
  }

  useEffect(() => {
    if (searchQuery === "") {
      setFriendSuggestions([]);
    } else {
       const timer = setTimeout(() => {
        searchfriends(searchQuery);
      }, 1000);
  
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchQuery]);

  useEffect(()=>{
    fetchChats()
  },[])

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
