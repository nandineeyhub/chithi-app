import React from 'react'

const ChatSideBar = () => {
  return (
    <aside className="chat-sidebar">
    <a href="#" className="chat-sidebar-logo">
      <i className="ri-chat-1-fill" />
    </a>
    <ul className="chat-sidebar-menu">
      <li className="active">
        <a href="#" data-title="Chats">
          <i className="ri-chat-3-line" />
        </a>
      </li>
      <li>
        <a href="#" data-title="Contacts">
          <i className="ri-contacts-line" />
        </a>
      </li>
      <li>
        <a href="#" data-title="Documents">
          <i className="ri-folder-line" />
        </a>
      </li>
      <li>
        <a href="#" data-title="Settings">
          <i className="ri-settings-line" />
        </a>
      </li>
      <li className="chat-sidebar-profile">
        <button type="button" className="chat-sidebar-profile-toggle">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </button>
        <ul className="chat-sidebar-profile-dropdown">
          <li>
            <a href="#">
              <i className="ri-user-line" /> Profile
            </a>
          </li>
          <li>
            <a href="#">
              <i className="ri-logout-box-line" /> Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
  )
}

export default ChatSideBar