import { Button } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductInfo from './ProductInfo'
import { Tooltip } from '@radix-ui/themes'
import axios from 'axios'
const Singleproduct = (props) => {
    const [id, setId] = useState("");
    const [owner, setOwner] = useState("");



    useEffect(() => {
        setId(props.id);
    }, [])

    useState(() => {
        console.log(props);
        const fetchUser = async () => {
            const res = await axios.get("http://localhost:3000/getuser", {
                params: {
                    user: props.user
                }
            });
            if (res.data.message !== "Error") {
                setOwner(res.data.fname + " " + res.data.lname);
            }

        }
        fetchUser();
    })
    return (
        <>
            {/* <div className='singleProduct'>
                <p style={{fontWeight:"bolder"}}>Name : {props.pname}</p>
                <p>Category : {props.pcateg}</p>
                <p>Description : {props.pdesc}</p>
                <p>Price : {props.pprice}</p>
                <p>{props.pimage}</p>
                <Link to={"/productinfo"} state={{ userId: id, product: props }} >Know More</Link>
               
            </div> */}
            <div className='myProductInfo'>
                <div className='myImageProduct'>
                    {props.pimage ? <img src={"http://localhost:3000/uploads/" + props.pimage[0]} alt="" />
                        : null}
                </div>
                <div className='myInfoProduct'>
                    <p>Owner : {owner}</p>
                    <Tooltip content="Product Name">
                        <p>Name : {props.pname}</p>
                    </Tooltip>
                    <Tooltip content="Product Description">
                        <p>Desc : {props.pdesc}</p>
                    </Tooltip>
                    <Tooltip content="Product Category">
                        <p>Category : {props.pcateg}</p>
                    </Tooltip>
                    <Tooltip content="Product Price">
                        <p>Price : {props.pprice}</p>
                    </Tooltip>


                    <Link to={"/productinfo"} state={{owner : owner,  userId: id, product: props }} ><Button style={{ cursor: "pointer" }} >Know More</Button></Link>

                </div>
            </div>

        </>
    )
}

export default Singleproduct