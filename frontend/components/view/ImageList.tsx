import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import { Stack } from '@mui/material';
import { Restaurant } from '@/app/dashboard/home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@/app/AuthContext';
import { HomeProduct } from './ProductComponent';

export function TitlebarImageList() {
  const viewmainpage = async () => {

    const url = `${process.env.NEXT_PUBLIC_URL}`
    axios.defaults.baseURL = url;
    const response = await axios.get("/api/users/viewMainPage", {
      params: {
        token: token
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.data.restaurants;
  }
  const {token }= useAuth();

  const { data, isLoading, error } = useQuery<Restaurant[]>({
    queryKey: ["mainpage"],
    queryFn: viewmainpage,
  

  });
  if (isLoading) return <div>Loading...</div>;  
  if (!data) return <div>No data</div>;
  return (
    

    <ImageList sx={{ width: "auto", height: "auto" , paddingX: "20"}} cols={5} gap={18} >
      {data.map((item) => (
        <HomeProduct item={item} key={item._id} />
      ))}
    </ImageList>
  
  );
}

