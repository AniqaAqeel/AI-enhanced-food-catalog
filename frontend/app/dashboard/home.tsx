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

export function Home() {
  const { user, setToken, setUser } = useAuth();
  const logout = () => {
    setUser(null);
    setToken("");
  };
  const itemData = [
    
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
   
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
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
        className=" bg-cover bg-no-repeat h-[75vh] object-cover max-w-full "
        
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
      <TitlebarImageList itemData={itemData} />
      </div>
    </div>
  )
  
}
