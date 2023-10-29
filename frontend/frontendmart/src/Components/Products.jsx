import React, { useEffect, useState } from 'react'
import axios, { all } from "axios";
import Singleproduct from './Singleproduct';
import { Button, TextField, Slider } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
const Products = () => {
    axios.defaults.withCredentials = true;
    const [allProducts, setAllProducts] = useState([]);
    const [categoryProduct, setCategoryProducts] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    useEffect(() => {
        const getP = () => {
            axios.get("http://localhost:3000/products").then((res) => {
                setAllProducts(res.data);
                setCategoryProducts(res.data);
                // console.log(res.data);
            }).catch(err => console.log(err));
        }
        getP();
    }, [])
    const filterItem = (itemCategory) => {
        if (itemCategory == "") {
            setCategoryProducts(allProducts);
        }
        else {

            const updatedItem = allProducts.map((user) => ({
                id: user._id,
                email: user.email,
                productinfo: user.productinfo.filter((product) => product.pcateg === itemCategory),
            })).filter((user) => user.productinfo.length > 0)
            setCategoryProducts(updatedItem);
        }

    }
    useEffect(() => {
        const searchedItem = allProducts.map((user) => ({
            id: user._id,
            email: user.email,
            productinfo: user.productinfo.filter((product) => product.pname.startsWith(searchItem)),
        })).filter((user) => user.productinfo.length > 0)
        setCategoryProducts(searchedItem);

    }, [searchItem])

    const inputEvent = (e) => {
        const data = e.target.value;
        setSearchItem(data);
    }
    return (
        <>
            <div className='allProducts'>



                <div className='productCategory'>
                    <div className='productSearch'>
                        <TextField.Root>
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Input placeholder="Search the product..." onChange={inputEvent} value={searchItem} size={"3"} />
                        </TextField.Root>
                    </div>
                    <div className='listCategory'>
                        <ul>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("")}>All</Button>
                            </li>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("academics")}>Academics</Button>
                            </li>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("electronics")}>Electronics</Button>
                            </li>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("sportsequipment")}>Sports Equipment</Button>
                            </li>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("book")}>Book</Button>
                            </li>
                            <li>
                                <Button size={"3"} onClick={() => filterItem("miscellaneous")}>Miscellaneous</Button>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="priceSlider">
                        <Slider defaultValue={[50]} />
                    </div> */}
                    {/* <button></button> */}
                </div>
                <div className='allProductsContainer'>

                    {/* categoryProduct.map((user) => (
                            user.productinfo.map((product) => (

                                <Singleproduct
                                    id={user._id}
                                    user={user.email}
                                    pcateg={product.pcateg}
                                    pname={product.pname}
                                    pdesc={product.pdesc}
                                    pprice={product.pprice}
                                    pimage={product.pimage}
                                />

                            ))
                        )) */}

                    {categoryProduct.length > 0 ? (
                        categoryProduct.map((user) => (
                            user.productinfo.map((product) => (
                                <Singleproduct
                                    key={product.productId} // Add a unique key for each product
                                    id={user._id}
                                    user={user.email}
                                    pcateg={product.pcateg}
                                    pname={product.pname}
                                    pdesc={product.pdesc}
                                    pprice={product.pprice}
                                    pimage={product.pimage}
                                />
                            ))
                        ))
                    ) : (
                        <p>No products</p>
                    )}

                </div>
            </div>
        </>
    )
}

export default Products;