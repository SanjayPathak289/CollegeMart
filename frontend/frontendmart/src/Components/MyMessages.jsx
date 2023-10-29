import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
const MyMessages = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    // const scrollRef = useRef();
    useEffect(() => {
        const getConversation = async () => {
            try {

                const res = await axios.get("http://localhost:3000/allconversation/" + user._id)
                console.log(res.data);
                setConversations(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversation();
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                console.log(currentChat._id);
                const res = await axios.get("http://localhost:3000/messages/", {
                    params: {
                        cid: currentChat?._id
                    }
                });

                console.log(res.data);
                setMessages(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMessages();
    }, [currentChat]);






    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const message = {
            conversationId: currentChat?._id,
            sender: user._id,
            text: newMessage,
        };
        try {
            const res = await axios.post("http://localhost:3000/messages", message);
            console.log(res.data);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    // }, [messages])

    return (
        <>
            <div className='messengerDiv'>


                <div className="allConversations">
                    {conversations.length > 0 ? (
                        conversations.map((conv) => (
                            <div onClick={() => setCurrentChat(conv)}>
                                <Conversation conversation={conv} currentUser={user} />
                            </div>
                        ))
                    ) : (
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginLeft:"2rem"}}>
                            First Start a converstion with any product owner
                        </div>
                    )}
                </div>


                <div className="allMessages">
                    {currentChat._id ?
                        <>
                            <div className='showM'>

                                {messages.map(m => {
                                    return (<Message message={m} own={m.sender === user._id} />)
                                })}
                            </div>


                            <div className='inputM'>
                                <textarea name="messageInputBox" cols="30" rows="4" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                <button onClick={handleMessageSubmit}><ThickArrowRightIcon /></button>

                            </div>
                        </>
                        :
                        <div>
                            Open A Chat
                        </div>}
                </div>




            </div>
        </>
    )
}

export default MyMessages