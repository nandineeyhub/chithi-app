import React from 'react'
import PopupWrapper from '../chat-components/PopupWrapper/PopupWrapper'
import CrossIcon from '../CrossIcon/CrossIcon'
import ActionButtons from '../chat-components/ActionButtons/ActionButtons'

const WarningPopup = ({action="", submitFn, cancelFn}) => {
  return (
   <PopupWrapper>
   
      <h6>{`Do you really want to ${action}?`}</h6>
      <div className='d-flex justify-content-end align-items-center'>
        <ActionButtons submitText={action} submitFn={submitFn} cancelFn={cancelFn}/>
      </div>
   </PopupWrapper>
  )
}

export default WarningPopup