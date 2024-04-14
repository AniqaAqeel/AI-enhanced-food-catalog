"use client";
import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import NavBar from "@/components/NavBar";
import {SearchBar} from "@/components/Input";
import { TitlebarImageList } from "@/components/view/ImageList";
import Image from "next/image";
import image from "@/src/img/homeImage.jpg";
import { Query, useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
export type Restaurant = {
  _id: string;
  cuisine: string;
  owner_id: string;
  res_name: string;
  warning_msg: string;
  weighted_rating: number;
};

export function Home() {
  const { user, setToken, setUser ,token} = useAuth();
  
  
    

  const itemData = [
    
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      cols: 2,
    },
   
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      
    },
    
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      
      cols: 2,
    },
  ];
  return (
    <div>
      <NavBar />
      
      <div className="h-[75vh] w-full border-b border-ui-border-base relative ">
      <Image
        src={image}
        alt="logo"
        style={{ marginTop: "0px" }}
        className=" bg-cover bg-no-repeat h-[75vh] object-cover max-w-full"
        width={1920}
        height={1080}
        
    />
      <div className=" pl-20 items-start absolute inset-0 z-10 flex flex-col w-full justify-center text-center small:p-32 gap-6 ">

        <div className="text-left text-5xl font-semibold text-secondary">What do you want to eat 
        <br />
        today?</div>
        <SearchBar  />   
      
    </div>
    </div>
    <div className="pt-12 h-[17vh] w-full base relative bg-accent">
      <div className=" pl-20 text-left text-3xl font-semibold text-secondary">Browse Food Catalogs</div>
      </div>
    <div className="px-20 bg-accent">

      <TitlebarImageList  />
      </div>
    </div>
  )
  
}
