import React from 'react'

const Messages = () => {
  return (
    <div className="conversation active" >
    <div className="conversation-top">
      <button type="button" className="conversation-back active">
        <i className="ri-arrow-left-line" />
      </button>
      <div className="conversation-user">
        <img
          className="conversation-user-image"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <div>
          <div className="conversation-user-name">Someone</div>
          <div className="conversation-user-status online">
            online
          </div>
        </div>
      </div>
      <div className="conversation-buttons">
        <button type="button">
          <i className="fa fa-phone" />
        </button>
        <button type="button">
          <i className="fa fa-video-camera" />
        </button>
        <button type="button">
          <i className="fa fa-ellipsis-v" />
        </button>
      </div>
    </div>
    <div className="conversation-main">
      <ul className="conversation-wrapper">
        <div className="coversation-divider">
          <span>Today</span>
        </div>
        <li className="conversation-item me">
          <div className="conversation-item-side">
            <img
              className="conversation-item-image"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="conversation-item-content">
            <div className="conversation-item-wrapper">
              <div className="conversation-item-box">
                <div className="conversation-item-text-friend">
                  <p>
                    Hi
                  </p>
                  <div className="conversation-item-time">12:30</div>
                </div>
                <div className="conversation-item-dropdown">
                  <button
                    type="button"
                    className="conversation-item-dropdown-toggle"
                  >
                    <i className="ri-more-2-line" />
                  </button>
                  <ul className="conversation-item-dropdown-list">
                    <li>
                      <a href="#">
                        <i className="ri-share-forward-line" />{" "}
                        Forward
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ri-delete-bin-line" /> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="conversation-item-wrapper">
              <div className="conversation-item-box">
                <div className="conversation-item-text-friend">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Eaque, tenetur!
                  </p>
                  <div className="conversation-item-time">12:30</div>
                </div>
                <div className="conversation-item-dropdown">
                  <button
                    type="button"
                    className="conversation-item-dropdown-toggle"
                  >
                    <i className="ri-more-2-line" />
                  </button>
                  <ul className="conversation-item-dropdown-list">
                    <li>
                      <a href="#">
                        <i className="ri-share-forward-line" />{" "}
                        Forward
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ri-delete-bin-line" /> Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      
      </ul>
    
    </div>
    <div className="conversation-form">
      <button type="button" className="conversation-form-button">
        <i className="fa fa-smile-o" />
      </button>
      <div className="conversation-form-group">
        <textarea
          className="conversation-form-input"
          rows={1}
          placeholder="Type here..."
          defaultValue={""}
        />
        <button type="button" className="conversation-form-record">
          <i className="fa fa-microphone" />
        </button>
      </div>
      <button
        type="button"
        className="conversation-form-button conversation-form-submit"
      >
        <i className="fa fa-send-o" />
      </button>
    </div>
  </div>
  )
}

export default Messages