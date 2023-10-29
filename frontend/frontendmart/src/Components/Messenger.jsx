import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Conversation from './Conversation';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const getConversation = async () => {
            try {

                const res = await axios.get("http://localhost:3000/allconversation/" + user._id)
                // console.log(res.data);
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
                const res = await axios.get("http://localhost:3000/messages/" + currentChat?._id);

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
                    {/* {conversations.map(conv => {

                        return (<div onClick={() => setCurrentChat(conv)}>
                            <Conversation conversation={conv} currentUser={user} />
                        </div>)

                    })
                    } */}
                    {/* {conversations.length == 0 ? : null} */}
                    {conversations.length > 0 ? (
                        conversations.map((conv) => (
                            <div onClick={() => setCurrentChat(conv)}>
                                <Conversation conversation={conv} currentUser={user} />
                            </div>
                        ))
                    ) : (
                        <div>
                            First Start a converstion with any product owner
                        </div>
                    )}



                </div>

                <div className="allMessages">
                    {/* <div ref={scrollRef}> */}
                    {messages.map(m => {
                        return (<Message message={m} own={m.senderId === user._id} />)
                    })}

                    {/* </div> */}

                    <div>
                        <textarea name="messageInputBox" cols="30" rows="10" onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                        <button onClick={handleMessageSubmit}>Send</button>

                    </div>
                </div>

                {/* {currentChat ? <div>
                <Message />
            </div> : <span>Open A chat</span>} */}
            </div>
        </>
    )
}

export default Messenger