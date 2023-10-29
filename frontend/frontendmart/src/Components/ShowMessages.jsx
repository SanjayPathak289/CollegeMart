import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import { ThickArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
const ShowMessages = (props) => {
    // const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    // let currentChat = {};
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    // const [canMessage, setCanMessage] = useState()
    // useEffect(() => {


    // }, [props.sender._id, messages])
    useEffect(() => {
        const convFunc = async () => {
            const sendReceiveId = {
                members: {
                    senderId: props.sender._id,
                    receiverId: props.rId,
                }
            }
            const conv = await axios.post("http://localhost:3000/conversation/", sendReceiveId);
            setCurrentChat(conv.data);
        }
        convFunc();
    }, [])







    useEffect(() => {
        const getMessages = async () => {
            const res = await axios.get("http://localhost:3000/messages", {
                params: {
                    cid: currentChat._id,
                }
            });
            console.log(res.data);
            setMessages(res.data);

        }
        getMessages();
    }
        , [currentChat]);


    const handleMessageSubmit = async (e) => {
        // e.preventDefault();
        // console.log(props.sender._id);
        // console.log(props.rId);
        // console.log("HII");
        console.log("jnfjdn");
        console.log(currentChat);
        // if (!currentChat) {

        //     // try {
        //     // console.log("i am here");
        //     const sendReceiveId = {
        //         members: {
        //             senderId: props.sender._id,
        //             receiverId: props.rId,
        //         }
        //     }


        //     // const convId = await axios.post("http://localhost:3000/conversation", sendReceiveId);
        //     // console.log(convId.data._id);
        //     // setCurrentChat(convId.data);
        //     // currentChat = convId.data;
        //     setCurrentChat(convId.data);
        //     // } catch (error) {
        //     //     console.log(error);
        //     // }
        // }
        // const getMessages = async () => {
        //     try {
        //         console.log(currentChat);
        //         const res = await axios.get("http://localhost:3000/messages/", {
        //             params: {
        //                 cid: currentChat._id,
        //             }
        //         });
        //         console.log(res.data);
        //         setMessages(res.data);

        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // getMessages();

        const message = {
            conversationId: currentChat._id,
            sender: props.sender._id,
            text: newMessage,
        };
        try {
            console.log("mes");
            console.log(currentChat);
            const res = await axios.post("http://localhost:3000/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="allMessages">
            <div className='messageShowingDiv'>
                {/* {messages.map(m => { return (<Message message={m} own={m.sender === props.sender._id} />) }
                )}

                {props.sender._id === props.rId ? "You Cant Message Yourself" : null} */}
                {props.sender._id !== props.rId ? (
                    messages.map((m) => (
                        <Message message={m} own={m.sender === props.sender._id} />
                    ))
                ) : 
                    <div style={{color :"black"}}>You Can't Message Yourself</div>
                    

                }

            </div>



            {props.sender._id !== props.rId ?
                <div style={{ position: "relative", width: "100%" }}>
                    <textarea name="messageInputBox" cols="3" rows="3" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='chatTextArea'></textarea>
                    <Button onClick={handleMessageSubmit} style={{
                        position: "absolute",
                        right: "10%",
                        top: "10%",
                        cursor: "pointer"
                    }} ><ThickArrowRightIcon /></Button>

                </div> : null
            }
        </div>
    )
}

export default ShowMessages