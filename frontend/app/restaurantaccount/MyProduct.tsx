import { MenuItem } from "./Restaurantaccount"

import image from "@/src/img/homeImage.jpg";
import Tooltip from '@mui/material/Tooltip';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function MyProduct({
    item
}: {
    item: MenuItem
}) {
    const handleImageUpload = async (file: File) => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        var formData = new FormData();
        formData.append("image", file);
        formData.append("token", token);
        formData.append("product_id", item._id);
        const response = await axios.post("/api/resowner/saveProductImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.data;
    };
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: handleImageUpload,
        mutationKey: [item._id],
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [item._id],
            });

        },
    });
    const fetchProductImage = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        const response = await axios.get("/api/resowner/getProductImage", {
            params: {
                token: token,
                product_id: item._id,
            },
            responseType: "blob",
        });
        const blob = await response.data;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise<string>((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
        });
    }

    const { data, isLoading, error: DataError } = useQuery({
        queryKey: [item._id],
        queryFn: fetchProductImage,
        //enabled: item.imageLink !== undefined,
        retry: 1,
    });


    const { token } = useAuth();
    return (
        <div className="flex flex-row items-center bg-accent border border-gray-100 rounded-lg shadow md:flex-row md:max-w hover:bg-gray-100">
            <Tooltip title="Upload image" placement="top">
                <label>
                    <input type="file" disabled={mutation.isPending} accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            mutation.mutate(file);
                        }

                    }} />
                    {mutation.isPending && <p>Uploading...</p>}
                    <Image className="object-cover w-full rounded-lg h-80 md:h-36 md:w-36 md:rounded-none md:rounded-s-lg cursor-pointer" src={data || image} alt="" width={300} height={500} />
                </label>
            </Tooltip>
            <div className="flex flex-col flex-wrap justify-items-start px-4 leading-normal w-10/12">
                <h5 className="mb-2 text-1xl font-bold tracking-tight text-primary">{item.itemName}</h5>
                <p className="mb-3 font-normal text-secondary text-wrap">{item.itemDescription}</p>
                <div className="flex flex-row items-center justify-between max-w">


                    <p className="mb-2 font-medium text-sm text-secondary">Rs {item.itemPrice}</p>
                    
                    <Button className="text-primary font-semibold hover:text-primary hover:bg-grey-50 ">
                        <DeleteIcon />
                    </Button> 
                    
                    
                </div>
            </div>
        </div>
    )
}