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
      <div className=" pl-20 text-left items-start absolute inset-0 z-10 flex flex-col w-full justify-center small:p-32  ">

        <div className="text-left text-5xl font-semibold text-secondary pb-2 pl-2">What do you want to eat 
        <br />
        today?</div>
        <div className="text-left text-base font-medium text-secondary pb-3 pl-2">Explore dishes and cuisines with AI assistance...</div>
        <div className="flex flex-row items-center justify-start">
        <SearchBar onChange={(e)=>setQuery(e.currentTarget.value)} value={query} />
        <div className="bg-primary text-accent hover:text-secondary rounded-lg hover:bg-transparent">
        <Button className=" h-10" onClick={()=>router.push(`/aisearch?q=${query}`)} > 
        <div className="text-accent hover:text-secondary">
        Search
        </div></Button> 
        </div>
        </div>
      
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
