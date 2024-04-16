
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';
import { useAuth } from '@/app/AuthContext';
import { Restaurant } from '@/app/dashboard/home';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';

export const HomeProduct = ({
    item
}: {
    item: Restaurant
}) => {
    const { user, setToken, setUser, token } = useAuth();
    const [image, setImage] = useState<string>('');
    const getRestaurantImage = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/restaurant", {
            params: {
                token: token,
                res_owner: item.owner_id
            },
            responseType: "blob",
        });
        return await response.data; 
    }
    const { data, isLoading, error } = useQuery({
        queryKey: [item.owner_id],
        queryFn: getRestaurantImage,
        select(data) {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = () => {
                setImage(reader.result as string);
            };
        }
    });



    return (

        <>

            <ImageListItem key={item._id} >
                <Link href={`/restaurant/${item._id}`}>
                <Image
                    src={image ? image : "https://placehold.co/600x400/png"}
                    alt={item.res_name}
                    loading="lazy"
                    className='rounded-lg h-80 w-80'
                    width={500}
                    height={500}
                />
                <ImageListItemBar
                    title={item.res_name}
                    className='text-secondary'
                    position='below'
                    subtitle={<span>Cuisine: {item.cuisine} <br />Rating: {item.weighted_rating}
                    </span>}

                />
                </Link>
            </ImageListItem>
        </>

    );
}