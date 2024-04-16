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
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image"; // Corrected import path
import image from "@/src/img/homeImage.jpg";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { userAgent } from "next/server";
import { Product } from "@/components/Product";
import { useParams, useSearchParams } from "next/navigation";
import { MenuItem } from "@/app/restaurantaccount/Restaurantaccount";
type Restaurant = {
    restaurant: {
      _id: string;
      owner_id: string;
      res_name: string;
      cuisine: string;
      image: string;
    };
    food_items: MenuItem[];
  };
export function Foodcatalog() {
  const viewrestaurant = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;
    axios.defaults.baseURL = url;
    const response = await axios.get("/api/users/viewRestaurant", {
      params: {
        token: token,
        res_id: id,
      },
    });
    console.log(response.data);
    return await response.data;
  };
  const { id } = useParams();
  const { token } = useAuth();
  const {
    data: foodItems,
    isLoading,
    error: DataError,
  } = useQuery<Restaurant>({
    queryKey: [id],
    queryFn: viewrestaurant,
    enabled: id !== undefined,
  });

  return (
    <div>
      <NavBar />
      <div className="w-full min-h-[94vh] base relative bg-accent px-20 py-5">
        <div className="flex flex-col justify-start items-center py-5 gap-5">
          <div className="text-secondary text-2xl font-semibold">
            
            Food Items by {foodItems?.restaurant?.res_name}
          </div>

          <div className="flex flex-col items-center py-5 gap-5">
            {/* Map over the foodItems array to render each food item */}
            {foodItems?.food_items &&
              foodItems.food_items.map((item, index) => <Product key={index} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
