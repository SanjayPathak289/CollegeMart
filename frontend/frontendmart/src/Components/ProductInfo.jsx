import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@radix-ui/themes';
import { BookmarkIcon, HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import ShowMessages from "./ShowMessages"
const ProductInfo = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [isWishList, setWishList] = useState(false);
    const location = useLocation();
    const [isChatOpen, setChatOpen] = useState(false);
    const [firstImgSrc, setFirstImgSrc] = useState(0);
    const {owner,  userId, product } = location.state;
    // let userId, product;
    // useEffect(() => {
    //     if (location.state) {
    // console.log(location.state);
    // userId = location.state.userId,
    // product = location.state.product
    //     }
    //     else {
    //         navigate("/");
    //     }
    // }, [])
    useEffect(() => {
        setChatOpen(isChatOpen);
    }, [setChatOpen])
    useEffect(() => {
        const p = () => {


            axios.get("http://localhost:3000/addwishlist", {
                params: {
                    param1: userId,
                    param2: product
                }
            }).then((res) => {
                if (res.data.inwishList) {
                    setWishList(true);
                }
                else {
                    setWishList(false);
                }
            })
        }
        p();
    }, [])


    // console.log(props.info);
    // useEffect(() => {

    //     const getConversation = async () => {
    //         try {
    //             // console.log(props.sender._id);
    //             const res = await axios.get("http://localhost:3000/conversation/" + JSON.parse(localStorage.getItem("user")) + "/" + userId)

    //             console.log(res);
    //             setCurrentChat(res.data[0]);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getConversation();
    // }, [JSON.parse(localStorage.getItem("user"))])
    axios.defaults.withCredentials = true;
    const addWhishlist = () => {
        console.log(location.state);
        if (localStorage.getItem("user")) {
            if (!isWishList) {
                axios.post("http://localhost:3000/addwishlist", { userId, product })
                    .then((res) => {
                        if (res.data.added) {
                            setWishList(true);
                        }
                    })
            }
            else {
                // const sendingData = { userId: userId, product: product };
                axios.delete("http://localhost:3000/addwishlist", {
                    data: {
                        userId: userId,
                        product: product
                    }

                }).then((res) => {
                    if (res.data.deleted) {
                        setWishList(false);
                    }
                })
            }
        }
        else {
            alert("Login First");
        }

    }

    console.log(isChatOpen)
    return (
        <div className='productTab'>

            <div className="imageTab">
                <div className='firstImageTab'>
                    {
                        product && product.pimage && product.pimage.length ? <img style={{ borderRadius: "20px" }} src={"http://localhost:3000/uploads/" + product.pimage[firstImgSrc]} alt="" /> : null
                    }
                </div>
                <div className='remainingImageTab'>
                    {
                        product && product.pimage && product.pimage.length > 1 ? product.pimage.map((val, index) => {
                            return (
                                <img style={{ borderRadius: "10px", cursor: "pointer", border: index === firstImgSrc ? "2px solid black" : null }} src={"http://localhost:3000/uploads/" + val} alt="Photo" onClick={() => setFirstImgSrc(index)} />
                            )
                        }) : null
                    }
                </div>

            </div>

            <div className='infoTab'>
                    
                {owner ? <p style={{ fontSize: "2rem", fontWeight: "bolder" }}>Owner : {owner}</p> : null}
                <p style={{ fontSize: "2rem", fontWeight: "bolder" }}>Product Name : {product && product.pname}</p>



                <p>Desc : {product && product.pdesc}</p>
                <p>Category : {product && product.pcateg}</p>
                <p>Price : {product && product.pprice}</p>
                <Button onClick={addWhishlist} style={{ cursor: "pointer" }} size={"3"}>
                    {isWishList ? <HeartFilledIcon /> : <HeartIcon />} WishList
                </Button>

                {
                    <Button onClick={() => setChatOpen(!isChatOpen)} size={"3"} style={{ cursor: "pointer" }}>Open Chat</Button>
                }
                {isChatOpen ? (localStorage.getItem("user") ?


                    <div className='chatBox'>
                        <button onClick={() => setChatOpen(!isChatOpen)}>X</button>
                        <ShowMessages info={product} rId={userId} sender={JSON.parse(localStorage.getItem("user"))} />

                    </div> : <div>Login First</div> )


                    : null
                }

            </div>






        </div>
    )
}

export default ProductInfo