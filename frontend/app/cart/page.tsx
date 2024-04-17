"use client";
import NavBar from "@/components/NavBar"
import { Cart, useAuth } from "../AuthContext"
import { useEffect, useMemo, useState } from "react";
import { Add, Clear, Delete, Remove } from "@mui/icons-material";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "@mui/material";
import { InputField } from "@/components/Input";



export default function Page() {

    const { cart, setCart } = useAuth();
    const [cartItems, setCartItems] = useState<Cart>({});
    const [success, setSuccess] = useState("");
    useEffect(() => {
        if (cart) {
            setCartItems(cart);
        }
    }, [cart]);
    const total = useMemo(() => {
        let total = 0;
        Object.keys(cartItems).map((key, index) => {
            total += cartItems[key].itemPrice * cartItems[key].quantity;
        });
        return total.toFixed(2);
    }, [cartItems]);
    const removeItem = (key: string) => {
        let newCart = { ...cartItems };
        delete newCart[key];
        setCart(newCart);
    }
    const increaseQuantity = (key: string) => {
        let newCart = { ...cartItems };
        newCart[key].quantity += 1;
        setCart(newCart);
    }
    const decreaseQuantity = (key: string) => {
        let newCart = { ...cartItems };
        newCart[key].quantity -= 1;
        if (newCart[key].quantity === 0) {
            delete newCart[key];
        }
        setCart(newCart);
    }
    const placeOrder = async () => {
        const url = `${process.env.NEXT_PUBLIC_URL}`
        axios.defaults.baseURL = url;
        let order: { food_item_id: string, quantity: number }[] = [];
        Object.keys(cartItems).map((key, index) => {
            order.push({
                food_item_id: cartItems[key]._id,
                quantity: cartItems[key].quantity
            });
        });
        const response = await axios.post("/api/users/orderPlacement", {

            order: order,
            token: token
        }
        );
        return await response.data;
    }
    const { token } = useAuth();
    const mutation = useMutation({
        mutationKey: ["placeOrder"],
        mutationFn: placeOrder,
        onSuccess: (data: any) => {
            setCart({});
            setSuccess("Order placed successfully");
        }
    })

    return (
        <div className="bg-white">
            <NavBar />
            <div className="min-h-screen bg-accent">
                <div className="container mx-auto px-20">
                    {
                        success &&
                        <Alert severity="success">{success}</Alert>
                    }
                    <h1 className="text-2xl text-left text-primary font-bold pt-10 pl-32">Shopping Cart</h1>
                    <div className="mt-4 items-center px-32">
                        <div className="flex flex-col justify-between text-secondary  bg-accent border border-gray-100 rounded-lg shadow px-5 ">
                            <div className="flex flex-row border-b border-gray-300 py-2">
                                <div className="w-1/2 font-semibold text-secondary text-lg">Product</div>
                                <div className="w-1/4 font-semibold text-secondary text-lg">Price</div>
                                <div className="w-1/4 font-semibold text-secondary text-lg">Quantity</div>
                                <div className="w-10"></div>
                            </div>
                            {
                                Object.keys(cartItems).map((key, index) => {
                                    return (
                                        <div className="flex flex-row border-b border-gray-300 py-2 text-base" key={index}>
                                            <div className="w-1/2">{cartItems[key].itemName}</div>
                                            <div className="w-1/4">Rs {cartItems[key].itemPrice} </div>
                                            <div className="w-1/4"><span className="cursor-pointer" onClick={() => decreaseQuantity(key)}>< Remove className="w-5 text-primary" /></span>
                                                {cartItems[key].quantity}
                                                <span className="cursor-pointer" onClick={() => increaseQuantity(key)}><Add className="w-5 text-primary" /></span>
                                            </div>

                                            <div className="w-10 cursor-pointer" onClick={() => removeItem(key)}><Clear className=" text-primary" />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="pt-5">
                        <InputField
                                    
                                    label="Address"
                                    placeholder="Add address..."
                                    required={true}
                                    
                                    
                                />

                        </div>

                        
                        <div className="flex flex-row justify-end mt-4 ">
                            <div className="w-96">

                                <div className="flex flex-row justify-between ">
                                    <div className="text-secondary text-base font-medium">Total: </div>
                                    <div className="text-secondary ">Rs {total}</div>
                                </div>
                                

                            </div>
                        </div>
                        <div onClick={() => mutation.mutate()} className="flex flex-row justify-end mt-4">
                            <button className="bg-primary text-accent px-4 py-2 rounded-lg shadow-sm">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}