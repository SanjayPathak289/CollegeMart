import React, { useEffect, useState } from 'react'
import axios from "axios";
const Conversation = ({ conversation, currentUser }) => {
  const [user1, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getbyid", {
          params: {
            user: friendId
          }
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }

    }
    getUser();
  }, [conversation, currentUser])

  return (
    <div>
      {user1 !== null && (
        <div className='singleConv'>{user1.fname}</div>
      )}
      {/* Other components and content */}
    </div>
  );

}

export default Conversation