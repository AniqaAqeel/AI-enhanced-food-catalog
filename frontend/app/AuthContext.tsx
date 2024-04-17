"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect } from "react";
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
const unprotected_routes = ["/signin", "/signup", "/", "/forget-password"];
const unaccessible_routes_during_login = ["/signin", "/signup"];
export const useAuth = () => useContext<TAuthContext>(AuthContext);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<AuthUser | null>("user", null);
    const [token, setToken] = useLocalStorage<string | null>("token", null);
    const [cart,setCart] = useLocalStorage<Cart>("cart",{});
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            if (!unprotected_routes.includes(pathname)) {
                router.replace("/signin");
            }
        }
        else if (token) {
            if (unaccessible_routes_during_login.includes(pathname)) {
                router.replace("/dashboard");
            }
        }
    }, [user, token, pathname]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken,cart,setCart }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthContext.Provider>
    )
};
