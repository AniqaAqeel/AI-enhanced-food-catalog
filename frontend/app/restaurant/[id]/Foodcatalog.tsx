"use client";
import NavBar from "@/components/NavBar";
import { InputField } from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/router"; // Changed to useRouter
import Alert from "@mui/material/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import Image from 'next/image'; // Corrected import path
import image from "@/src/img/homeImage.jpg";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { userAgent } from "next/server";
import { Product } from "@/components/Product";




const foodItems = [
    {

        name: "Food Item 1",
        description: "Description of Food Item 1: This is a description of the food item. It is very delicious and tasty. It is made Ok There is a special discount on this item. IT is a tyuj tyu frtgyhuj  tyu i dflasjfsd kjfasdkl fsdlkfjsdkl fsdkl fjksdl fhjldksfklasd  fjlafasdjkl   ",
        price: "$9.99",
        image: "https://via.placeholder.com/300",
    },
    {

        name: "Food Item 2",
        description: "Description of Food Item 2 This is a description of the food item. It is very delicious and tasty.",
        price: "$12.99",
    },
    {

        name: "Food Item 3",
        description: "Description of Food Item 3 This is a description of the food item. It is very delicious and tasty.",
        price: "$14.99",
    },
    {

        name: "Food Item 4",
        description: "Description of Food Item 4 This is a description of the food item. It is very delicious and tasty.",
        price: "$19.99",
    },
    {

        name: "Food Item 5",
        description: "Description of Food Item 5 This is a description of the food item. It is very delicious and tasty.",
        price: "$24.99",
    },
];

export function Foodcatalog()
{
    const viewrestaurant = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/restaurants");
        return await response.data;
    }
    
    return(
            <div>
                <NavBar />
                <div className="w-full min-h-[94vh] base relative bg-accent px-20 py-5">
                
                <div className="flex flex-col justify-start items-center py-5 gap-5">
                        <div className="text-secondary text-2xl font-semibold"
                        >
                            Food Items
                        </div>


                        <div className="flex flex-col items-center py-5 gap-5">
                            {/* Map over the foodItems array to render each food item */}
                            {foodItems.map((item, index) => (
                                <Product key={index} {...item} />
                            ))}

                        </div>
                    </div>
                    </div>
                    </div>
           
    );
}