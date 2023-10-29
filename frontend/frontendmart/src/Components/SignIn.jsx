import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField, Badge } from "@radix-ui/themes";
import { Navigate, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignIn = ({ setIsAuth }) => {
    const [noUser, setNoUser] = useState(null);
    const [signinData, setSignInData] = useState({
        email: "",
        pass: "",
    })
    // const [isSuccess, setSuccess] = useState(false);
    // const [user, setUser] = useState({});
    useEffect(() => {
        const timeId = setTimeout(() => {
            setNoUser(null);
        }, 2000)
        return () => {
            clearTimeout(timeId);
        }
    }, [noUser])

    const navigate = useNavigate();
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setSignInData({
            ...signinData,
            [name]: value
        })
    }
    axios.defaults.withCredentials = true;
    const siginFormSubmit = async (event) => {
        event.preventDefault();
        const sendSignInData = JSON.stringify(signinData);
        // const fetchOptions = {
        //     method : 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     body : sendSignInData
        // };
        // const response = await fetch('http://localhost:3000/signin', fetchOptions);
        try {
            const res = await axios.post("http://localhost:3000/signin", {
                email: signinData.email,
                pass: signinData.pass
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                }
            })

            if (res.data) {
                const storeData = JSON.stringify(res.data);
                localStorage.setItem("user", storeData);

                setIsAuth(true);
                // props.setUser(res.data);
                navigate("/");
            }
        } catch (error) {
            setNoUser(true);
        }

        // }).then(res => {
        //     if (res.data) {
        //         const storeData = JSON.stringify(res.data);
        //         localStorage.setItem("user", storeData);

        //         setIsAuth(true);
        //         // props.setUser(res.data);
        //         navigate("/");
        //     }
        // }).catch(err => console.log(err));
        // if(response.ok){
        //     setSuccess(true);
        //     navigate("/",{state : {id : signinData.email}});
        // }

    }

    return (
        <>
            <div className="signForm">
                <div className='signIn'>
                    <div className="leftSign">
                        Sign In
                    </div>
                    <form className='signInForm' onSubmit={siginFormSubmit} style={{ position: "relative" }}>
                        {noUser ? <Badge color="red" style={{ position: "absolute", top: "1rem", }} >Invalid Email/Password</Badge> : null}
                        <TextField.Root style={{ width: "70%" }} >
                            <TextField.Input size={"3"} placeholder='Email' onChange={inputEvent} name='email' type='email' value={signinData.email} />
                        </TextField.Root>
                        <TextField.Root style={{ width: "70%" }}>
                            <TextField.Input size={"3"} placeholder='Password' onChange={inputEvent} name='pass' type='password' value={signinData.pass} />
                        </TextField.Root>
                        <Button type='submit' size={"3"} variant='outline' style={{
                            width: "70%",
                            cursor: "pointer"
                        }} >Sign In </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn