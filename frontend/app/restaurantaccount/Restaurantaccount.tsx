"use client";
import NavBar from "@/components/NavBar";
import { InputField } from "@/components/Input";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
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
type MenuItem = {
  _id: string;
  itemDescription: string;
  itemName: string;
  itemPrice: number;
  itemTags: string;
  restaurantId: string;
};
export function Restaurantaccount() {
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const [error, setError] = useState("");

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
    const { user } = useAuth();   

    const showImage = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/resowners/showImageRestaurant",
            {
                params: {
                    token: token,

                },
                responseType: "blob",

            });
        return await response.data;
    };
    const getMenu = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/resowners/getMenu",
            {
                params: {
                    token: token,

                },
            });
        return await response.data;
    }
    const queryClient = useQueryClient()
    const { data, isLoading, error: DataError } = useQuery({
        queryKey: ["showImage"],
        queryFn: showImage,
        refetchOnWindowFocus: true,
        select(data) {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = () => {
                setSelectedImage(reader.result);
            };

        },


    });

    const {data: fooditem, isLoading: foodloading, error: fooderror} = useQuery<MenuItem[]>({
        queryKey: ["getMenu"],
        queryFn: getMenu,
        refetchOnWindowFocus: true
    });
    const mutation = useMutation({
        mutationFn: uploadimage,
        mutationKey: ["uploadimage"],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["showImage"],
            
            });
        },
        onError: (error: any) => {
            setError(error.response.data.message);
        },

    });

    // Define an array of food items
    
    return (
        <div>
            <NavBar />
            <div className="w-full min-h-[94vh] base relative bg-accent">

                <div className="flex flex-row    justify-start px-20 py-5 gap-32 h-auto">

                    <div className="flex flex-col min-w-48  justify-start py-5 gap-5 ">
                        {mutation.isError && (
                            <Alert severity="error">{error}</Alert>
                        )}
                        {mutation.isSuccess && (
                            <Alert severity="success">Image uploaded successfully</Alert>
                        )}
                        {
                            mutation.isPending && (
                                <Alert severity="info">Uploading image...</Alert>
                            )
                        }
                        {selectedImage && !isLoading && (
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
                        >
                            {user?.name}
                        </div>


                        <div className="flex flex-col item-center py-5 gap-5">
                            {/* Map over the foodItems array to render each food item */}
                            {fooditem && fooditem.map((item, index) => (
                                <div key={index} className="flex flex-row items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:max-w hover:bg-gray-100">
                                    <Image className="object-cover w-full rounded-lg h-80 md:h-36 md:w-36 md:rounded-none md:rounded-s-lg " src={image} alt="" width={300} height={500} />
                                    <div className="flex flex-col flex-wrap  justify-between px-4 leading-normal">
                                        <h5 className="mb-2 text-1xl font-bold tracking-tight text-primary">{item.itemName}</h5>
                                        <p className="mb-3 font-normal text-secondary text-wrap">{item.itemDescription}</p>
                                        <p className="mb-2 font-medium text-secondary">Rs {item.itemPrice}</p>
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
