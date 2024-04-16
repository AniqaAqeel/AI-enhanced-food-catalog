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
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
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
  const router = useRouter();
  
  
    

  const [query, setQuery] = useState("");
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
        <SearchBar onChange={(e)=>setQuery(e.currentTarget.value)} value={query} />
        <Button onClick={()=>router.push(`/aisearch?q=${query}`)} className="bg-primary text-secondary">Search</Button> 
      
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
