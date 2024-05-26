import React from 'react'
import KidPopUp from './KidPopUp'

const GroupChatOptionPopup = () => {
  return (
    <div className="card text-start" style={{ backgroundColor:"#f0f2f5", width:"200px"}}>
        <ul style={{listStyleType:"none", fontSize: "14px"}} className='px-3 py-2'>
            <li className=' d-flex align-items-center gap-3 my-2'><i className="fa fa-sign-out"/><span>Leave group</span></li>
            <li className=' d-flex align-items-center gap-3 '><i className="fa fa-sign-out" /><span>Remove parcipant</span></li>
        </ul>
    </div>
  )
}

export default GroupChatOptionPopup