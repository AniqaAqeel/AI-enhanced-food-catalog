"use client";
import NavBar from "@/components/NavBar";
import { InputField } from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/router"; // Changed to useRouter
import Alert from "@mui/material/Alert";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export function Restaurantaccount() {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            mutation.mutate(file);
        }
    };
    const { token } = useAuth();
    const uploadimage = async (file: File) => {
        if (!file) {
            console.log("No file selected");
            console.log(file);
            return;
        }
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        var formData = new FormData();
        formData.append("image", file);
        formData.append("token", token);
        const response = await axios.post("/api/resowners/imageRestaurant", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
    );

        return await response.data;
    }
    

    const mutation = useMutation({
        mutationFn: uploadimage,
        mutationKey: ["uploadimage"],
        

    });

    // Define an array of food items
    const foodItems = [
        {

            name: "Food Item 1",
            description: "Description of Food Item 1: This is a description of the food item. It is very delicious and tasty. It is made Ok There is a special discount on this item. IT is a tyuj tyu frtgyhuj  tyu i dflasjfsd kjfasdkl fsdlkfjsdkl fsdkl fjksdl fhjldksfklasd  fjlafasdjkl   ",
            price: "$9.99",
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

    return (
        <div>
            <NavBar />
            <div className="w-full min-h-[94vh] base relative bg-accent">

                <div className="flex flex-row    justify-start px-20 py-5 gap-32 h-auto">

                    <div className="flex flex-col min-w-48  justify-start py-5 gap-5 ">
                        {mutation.isError && (
                            <Alert severity="error">Error uploading image</Alert>
                        )}
                        {mutation.isSuccess && (
                            <Alert severity="success">Image uploaded successfully</Alert>
                        )}
                        {selectedImage && (
                            <div className="relative w-48 h-48">
                                <Image
                                    src={selectedImage.toString()} // Convert selectedImage to string
                                    alt="Uploaded Image"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        )}
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <Button
                                className="text-accent bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                component="span"
                                variant="contained"
                                startIcon={<ImageIcon />}
                            >
                                Upload Image
                            </Button>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}

                        />
                        <div >
                            <Button
                                className="text-accent bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                component="span"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                <Link href="/uploadcsv">
                                    Upload CSV
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col item-center py-5 gap-5">
                        <div className="text-secondary text-2xl font-semibold"
                        >My Restaurant</div>


                        <div className="flex flex-col item-center py-5 gap-5">
                            {/* Map over the foodItems array to render each food item */}
                            {foodItems.map((item, index) => (
                                <div key={index} className="flex flex-row items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:max-w hover:bg-gray-100">
                                    <Image className="object-cover w-full rounded-lg h-80 md:h-36 md:w-36 md:rounded-none md:rounded-s-lg " src={image} alt="" width={300} height={500} />
                                    <div className="flex flex-col flex-wrap  justify-between px-4 leading-normal">
                                        <h5 className="mb-2 text-1xl font-bold tracking-tight text-primary">{item.name}</h5>
                                        <p className="mb-3 font-normal text-secondary text-wrap">{item.description}</p>
                                        <p className="mb-2 font-medium text-secondary">{item.price}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
