"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, memo, ReactNode, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { MenuItem } from "./restaurantaccount/Restaurantaccount";
const queryClient = new QueryClient();
interface AuthUser {
    name: string;
    email: string;
    role: string;
}

interface TAuthContext {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    token: string;
    setToken: (token: string) => void;
    cart: Cart;
    setCart: (cart: Cart) => void;
}
interface CartItem extends MenuItem   {
    quantity: number;
}

export interface Cart {
    [food_item_id:string]: CartItem;
}

export const AuthContext = createContext<any>({});
const unprotected_routes = ["/signin", "/signup", "/", "/forget-password","/forgetpassword"];
const unaccessible_routes_during_login = ["/signin", "/signup","/forgetpassword"];
export const useAuth = () => useContext<TAuthContext>(AuthContext);


export const AuthProvider = memo(({ children }: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<AuthUser | null>("user", null);
    const [token, setToken] = useLocalStorage<string | null>("token", null);
    const [loading, setLoading] = useState(true);
    const [cart,setCart] = useLocalStorage<Cart>("cart",{});
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        setLoading(true)
        if (!token) {
            if (!unprotected_routes.includes(pathname)) {
                router.replace("/signin");
            }
            else
                setLoading(false);
        }
        else if (token) {
            if (unaccessible_routes_during_login.includes(pathname)) {
                router.replace("/dashboard");
            }
            else
                setLoading(false);
        }
    }, [user, token, pathname]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken,cart,setCart }}>
            <QueryClientProvider client={queryClient}>
                {!loading && children}
            </QueryClientProvider>
        </AuthContext.Provider>
    )
});
