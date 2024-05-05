import React from 'react'

const CrossIcon = ({fn}) => {
  return (
    <div className="d-flex justify-content-end align-items-center">
        <i className="fa fa-close"  style={{ cursor: "pointer" }} onClick={()=>{
            if(fn) fn()
        }}></i>
    </div>
  )
}

export default CrossIcon