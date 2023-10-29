import React from 'react'
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <p style={{
        fontSize:"12px",
        marginRight: "auto"
      }}>{own ? "Me" : "User"}</p>

      <span>{message?.text}</span>
      <p style={{
        fontSize:"12px",
        marginLeft:"auto"
      }}>{format(message?.createdAt)}</p>
    </div>
  )
}

export default Message