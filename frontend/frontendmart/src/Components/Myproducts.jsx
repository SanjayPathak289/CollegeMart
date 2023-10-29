import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Myproduct from "./Myproduct"
import { useNavigate } from 'react-router-dom';
const Myproducts = () => {
    axios.defaults.withCredentials = true;
    const [myProducts, setMyProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3000/myproducts").then((res) => {
            console.log(res.data);
            if (res.data.message === "Error") {
                navigate("/signin");
            }
            setMyProducts(res.data);
        }).catch(err => console.log(err));
    }, [])
    return (
        <>
            <div className='myProductsContainer'>

               

                {myProducts && myProducts.productinfo && myProducts.productinfo.length > 0 ? (
                    myProducts.productinfo.map((val) => (
                        (
                            <Myproduct
                                userId={myProducts._id}
                                product={val}
                            // key={val._id}
                            // pcateg={val.pacteg}
                            // pname={val.pname}
                            // pdesc={val.pdesc}
                            // pimage={val.pimage}
                            // pprice={val.pprice}
                            />
                        )
                    ))
                ) : (
                    <p>No products</p>
                )}
            </div>
        </>
    )
}

export default Myproducts