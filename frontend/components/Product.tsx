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

const foodItems = [
    {
        image: "https://via.placeholder.com/300",
        name: "Food Item 1",
        description: "Description of Food Item 1: This is a description of the food item. It is very delicious and tasty. It is made Ok There is a special discount on this item. IT is a tyuj tyu frtgyhuj  tyu i dflasjfsd kjfasdkl fsdlkfjsdkl fsdkl fjksdl fhjldksfklasd  fjlafasdjkl   ",
        price: "$9.99",
    },
    {
        image: "https://via.placeholder.com/300",
        name: "Food Item 2",
        description: "Description of Food Item 2 This is a description of the food item. It is very delicious and tasty.",
        price: "$12.99",
    },
    {
        image: "https://via.placeholder.com/300",
        name: "Food Item 3",
        description: "Description of Food Item 3 This is a description of the food item. It is very delicious and tasty.",
        price: "$14.99",
    },
    {
        image: "https://via.placeholder.com/300",
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
type ProductProps = {
    name: string;
    description: string;
    price: string;
    image?: string;
};
export function Product(item: ProductProps) {
    return (

        <div className="flex flex-row items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:w-10/12 hover:bg-gray-100">
            <Image className="object-cover w-full rounded-lg h-80 md:h-40 md:w-40 md:rounded-none md:rounded-s-lg " src={item.image || image} alt="" width={300} height={500} />
            <div className="flex flex-col flex-wrap  justify-between px-4 leading-normal">
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-primary">{item.name}</h5>
                <p className="mb-3 font-normal text-secondary text-wrap">{item.description}</p>
                <p className="mb-2 font-medium text-secondary">{item.price}</p>
            </div>
        </div>

    );
}