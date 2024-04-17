"use client";
import React, { useState } from "react";
import Image from 'next/image'; // Corrected import path
import image from "@/src/img/homeImage.jpg";

import { MenuItem } from "@/app/restaurantaccount/Restaurantaccount";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export function Product(item: MenuItem) {
    const fetchProductImage = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/resowner/getProductImage", {
            params: {
                token: token,
                product_id: item._id,
            },
            responseType: "blob",
        });
        const blob = await response.data;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise<string>((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
        });
    }
    const addProductToCart = async () => {
        if (cart[item._id] === undefined) {
            setCart({ ...cart, [item._id]: {
                quantity: 1,
                ...item                
            } });
        } else {
            setCart({ ...cart, [item._id]: {
                quantity: cart[item._id].quantity + 1,
                ...item
            } });
        }

    }

    const { data, isLoading, error: DataError } = useQuery({
        queryKey: [item._id],
        queryFn: fetchProductImage,
        enabled: item.imageLink !== undefined,
    });
    const {token,cart,setCart} = useAuth();
    return (

        <div className="flex flex-row items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:w-10/12 hover:bg-gray-100">
            <Image className="object-cover w-full rounded-lg h-80 md:h-40 md:w-40 md:rounded-none md:rounded-s-lg " src={data || image} alt="" width={300} height={500} />
            <div className="flex flex-col flex-wrap  justify-between px-4 leading-normal w-9/12">
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-primary">{item.itemName}</h5>
                <p className="mb-3 font-normal text-secondary text-wrap">{item.itemDescription}</p>
                <div className="flex flex-row flex-1 justify-between">
                <p className="mb-2 font-medium text-secondary">Rs {item.itemPrice}</p>
                <Button onClick={addProductToCart} 
                size = "small"
                className="items-center text-center  text-accent bg-primary hover:bg-grey-50 hover:text-primary" startIcon={<AddShoppingCartIcon />}></Button>
                </div>
            </div>
        </div>

    );
}