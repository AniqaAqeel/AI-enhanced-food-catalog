"use client";
import { SearchBar } from "@/components/Input";
import NavBar from "@/components/NavBar";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { MenuItem } from "../restaurantaccount/Restaurantaccount";
import { Product } from "@/components/Product";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const [query, setQuery] = useState("");
    const fetchProduct = async () => {
        // /api/search
        const url = `${process.env.NEXT_PUBLIC_URL}`;
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/search", {
            params: {
                query: query,
            },
        });
        return await response.data;
    }
    
    const mutation = useMutation({
        mutationFn: fetchProduct,
        mutationKey: ["search"],
        onSuccess: (data) => {
            setData(data);
        },
    });
    const [data, setData] = useState<MenuItem[]>([]);
    const searchParams = useSearchParams();
    useEffect(() => {
        setQuery(searchParams.get("q") || "");
        mutation.mutate();
    }, [searchParams]);
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-accent">
      
      <div className="text-center text-lg font-semibold text-secondary pr-24 pt-10 ">What are you craving today? Type it here...</div>
        <div className="flex flex-row items-center justify-center py-4">
          <SearchBar value={query} onChange={(e)=>setQuery(e.currentTarget.value)} />
            <Button
                className="bg-primary text-accent hover:text-secondary h-11 p-2 rounded-lg ml-2"
                onClick={() => mutation.mutate()}
            >
                Search
                </Button>
          </div>
          
          <div className="text-center text-2xl font-bold text-primary py-2 ">
            {mutation.isPending && <CircularProgress />}    
            </div>
        <div className="flex flex-col text-secondary items-center py-5 gap-5">
            {data.map((item) => (
                <Product key={item._id} {...item} />
            ))}
        </div>

      </div>
    </>
  );
}
