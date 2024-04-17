"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import { InputField } from "@/components/Input";
import Link from "next/link";

import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation"; // Changed to useRouter
import Alert from "@mui/material/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";

import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image"; // Corrected import path
import { RestaurantOrder } from "./RestaurantOrder";

type FoodItem = {
  _id: string;
  itemName: string;
};

export type Order = {
  food_items: FoodItem[];
  order_id: string;
  order_status: string;
  res_id: string;
  res_name: string;
};

export function Myorders() {
  const { token } = useAuth();
  const checkMyOrders = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;
    axios.defaults.baseURL = url;
    const response = await axios.get("/api/users/checkMyOrdersUser", {
      params: {
        token: token,
      },
    });
    
    return response.data.orders;
  };
  const { data, isLoading } = useQuery<Order[]>({
    queryKey: ["checkMyOrders"],
    queryFn: checkMyOrders,
  });

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-accent w-full border-b border-ui-border-base relative">
        <div className="flex flex-col text-left justify-center py-4 px-20">
          <div className="text-2xl font-bold text-primary py-2">My Orders</div>
          <div className="flex flex-col gap-y-4">
             { data?.map((order, index) => {
              return <RestaurantOrder order={order} key={index} />;
            })}
            </div>
        </div>
      </div>
    </div>
  );
}
