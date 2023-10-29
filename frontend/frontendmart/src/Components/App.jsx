import React, { useState, useEffect } from 'react'
import SignIn from './SignIn'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import { Theme } from '@radix-ui/themes'
import Signup from './Signup'
import Home from "./Home";
import Profile from './Profile'
import Additem from './Additem'
import Myproducts from './Myproducts'
import Products from "./Products"
import ProductInfo from './ProductInfo'
import Messenger from './Messenger'
import axios from 'axios'
import Footer from './Footer'
import MyMessages from './MyMessages'
import ErrorPage from './ErrorPage'

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    // const [user, setUser] = useState({});
    return (
        <>
            <Theme>
                {/* <Navbar isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser} /> */}
                <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />

                <Routes>
                    <Route path='/' Component={Home} />
                    {/* <Route path='/signin' Component={SignIn} /> */}
                    <Route path='/signup' Component={Signup} />
                    <Route path='/signin' Component={() => <SignIn setIsAuth={setIsAuth} />} />
                    {/* <Route path='/signup' Component={() => <Signup isAuth={isAuth} setIsAuth={setIsAuth} />} /> */}
                    <Route path='/profile' Component={Profile} />
                    <Route path='/additem' Component={Additem} />
                    <Route path='/myproducts' Component={Myproducts} />
                    <Route path='/products' Component={Products} />
                    <Route path='/productinfo' Component={ProductInfo} />
                    <Route path='/messenger' element={isAuth ? <Messenger /> : <SignIn />} />
                    <Route path='/mymessages' element={isAuth ? <MyMessages /> : <SignIn />} />
                    <Route path='*' Component={ErrorPage} />
                </Routes>
                <Footer/>
            </Theme>
        </>
    )
}

export default App
