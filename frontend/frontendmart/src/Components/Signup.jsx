import React, { useEffect, useState } from 'react'
import { Button, Callout, TextField } from "@radix-ui/themes";
import { Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [signupData, setSignUpData] = useState({
        fname: "",
        lname: "",
        email: "",
        pass: "",
        spass: "",
    })
    const [passSame, setpassSame] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const navigate = useNavigate();
    const inputEvent = (event) => {
        const { name, value } = event.target;
        setSignUpData({
            ...signupData,
            [name]: value
        })
    }
    useEffect(() => {
        if (signupData.pass === signupData.spass && signupData.pass !== "") {
            setpassSame(true);
        }
        else {
            setpassSame(false);
        }
    }, [signupData.pass, signupData.spass])
    const submitSignUp = async (event) => {
        event.preventDefault();
        if (signupData.spass === signupData.pass) {
            const sendSignUpData = JSON.stringify(signupData);
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: sendSignUpData
            };
            console.log(signupData);
            const response = await fetch('http://localhost:3000/signup', fetchOptions);
            if (response.ok) {
                const data = await response.json();
                setSignUpData({
                    fname: "",
                    lname: "",
                    email: "",
                    pass: "",
                    spass: ""
                })
                navigate("/signin");
            }
            else {
                setSuccess(true);
                navigate("/signin");
                // isSuccess = true;
            }
        }


    }
    return (
        <>
            {
                isSuccess ?
                    <Callout.Root style={{ position: "absolute" }}>
                        <Callout.Icon>
                            <Cross1Icon />
                        </Callout.Icon>
                        <Callout.Text>Error Occurred</Callout.Text>
                    </Callout.Root> : null

            }



            <div className='signForm'>
                <div className="signIn signUp">
                    <div className="leftSign">
                        Sign Up
                    </div>

                    <form className='signInForm' onSubmit={submitSignUp} style={{ position: "relative" }}>
                        <div className='tempFormDiv'>


                            <div className='nameSignBox'>
                                <TextField.Root>
                                    <TextField.Input size={"3"} placeholder='First Name' required name='fname' onChange={inputEvent} type='text' />
                                </TextField.Root>
                                <TextField.Root >
                                    <TextField.Input size={"3"} placeholder='Last Name' required name='lname' onChange={inputEvent} type='text' />
                                </TextField.Root>
                            </div>
                            <TextField.Root style={{ width: "100%" }}>
                                <TextField.Input size={"3"} placeholder='Email' type='email' required name='email' onChange={inputEvent} />
                            </TextField.Root>
                            <div className='passwordBox'>
                                <TextField.Root>
                                    <TextField.Input size={"3"} placeholder='Password' required name='pass' onChange={inputEvent} type='password' />
                                </TextField.Root>
                                <TextField.Root mt={"4"}  >
                                    <TextField.Input style={signupData.spass ? (passSame ? { border: "2px solid green" } : { border: "2px solid red" }) : null} size={"3"} placeholder='Confirm Password' required name='spass' onChange={inputEvent} type='password' />
                                </TextField.Root>
                            </div>

                            <Button size={"3"} variant='outline' style={{
                                width: "100%",
                                cursor: "pointer"
                            }} type='submit'>Sign Up</Button>
                        </div>
                    </form>
                </div>

            </div>

        </>
    )
}

export default Signup