"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import NavBar from "@/components/NavBar";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


import { InputField } from "@/components/Input";
import Link from "next/link";

import { useAuth } from "../AuthContext";
import { useRouter } from "next/router"; // Changed to useRouter
import Alert from "@mui/material/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from '@mui/material/TextField';

import ImageIcon from '@mui/icons-material/Image';
import Image from 'next/image'; // Corrected import path



const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export function Myorders() {
    const [orders, setOrders] = useState([]);
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    useEffect(() => {
        // Replace with your actual API endpoint
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <div>
            <NavBar />
            <div className="min-h-screen bg-accent w-full border-b border-ui-border-base relative">
                <div className="flex flex-col text-left justify-center py-4 px-20">

                
                <div className="text-2xl font-bold text-primary py-2">
                    My Orders
                </div>
                <div className="flex flex-col items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:max-w hover:bg-gray-100">
                <div className="flex text-secondary text-base font-medium py-2">
                    RestaurantName
                </div>
                
                



                <div>
                    
                    


                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </div>


            </div>
            </div>
            </div>
        </div>
    );
}