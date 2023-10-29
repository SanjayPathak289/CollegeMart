import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Button } from '@radix-ui/themes';
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    // const [name, setName] = useState("");
    // axios.defaults.withCredentials = true;
    // useEffect(() => {
    //     const h = () => {
    //         axios.get("http://localhost:3000")
    //             .then(res => {
    //                 if (res.data.valid) {

    //                     // setName(res.data.email)
    //                 }
    //                 else {
    //                     // setName("Error");
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }
    //     h();
    // }, []);
    return (
        <>
            <div className='homeContainer'>
                <div className='leftHome'>
                    <p style={{ color: "#3772ff" }}>Sell Your Products</p>
                    <p>Earn Money</p>
                    <Button size={"4"} style={{
                        marginTop: "1rem",
                        cursor: "pointer",
                        backgroundColor: "#3772ff"
                    }} className='getStarted'

                    onClick={() => { JSON.parse(localStorage.getItem("user")) ? navigate("/additem") : navigate("/signin") }}
                    >
                    Get Started


                    </Button>
                </div>
                <div className='rightHome'>
                    <img style={{maxWidth:"109%"}} src="/images/mainbg.png" alt="" />
                </div>
            </div>
        </>
    )
}
export default Home;