"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { Cart, useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { AccountDropdown } from "./profile/Account";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function NavBar() {
  const { cart: LocalCart, setCart, user: userData } = useAuth();
  const [cart, setClientCart] = useState<Cart>({});
  const [user, setUser] = useState(userData);
  const length = useMemo(() => Object.keys(cart).length ?? 0, [cart]);
  const total = useMemo(() => {
    let total = 0;
    for (const key in cart) {
      total += cart[key].itemPrice * cart[key].quantity;
    }
    return total;
  }, [cart]);

  useEffect(() => {
    setClientCart(LocalCart);
  }, [LocalCart]);

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-12 mx-auto border-b duration-200 bg-accent border-ui-border-base">
        <nav className="md:mx-auto md:px-20 flex justify-between w-full h-full text-small-regular">
          <div className="flex-1 justify-between items-center self-center basis-0 text-secondary ">
            <Link
              href="/dashboard"
              className="flex items-center h-full w-20 gap-x-1  hover:text-primary whitespace-nowrap hover:text-ui-fg-base"
            >
              <HomeIcon className="text-secordary w-5" />
              Home
            </Link>
          </div>

          <div className="flex items-center h-full">
            <Link
              href="/dashboard"
              className="txt-compact-xlarge-plusflex flex-wrap justify-between items-center self-center text-secondary text-2xl font-bold whitespace-nowrap hover:text-ui-fg-base "
            >
              <RestaurantIcon className="text-primary " />
              DishCraft
            </Link>
          </div>

          <div className="flex items-center gap-x-8 h-full flex-1 text-secondary basis-0 justify-end">
            {user?.role === "user" && (
              <>
                {length > 0 && (
                  
                    <div
                      onClick={() => setCart({})}
                      className="flex items-center h-full cursor-pointer gap-x-1"
                    >
                      <ClearIcon className="text-secordary w-4" />
                      <>Clear Cart</>
                    </div>
                  
                )}

                
                  <Link
                    href="/cart"
                    className="hover:text-ui-fg-base flex gap-2 text-secondary  hover:text-primary"
                  >
                    <div className="flex items-center h-full gap-x-1">
                      <LocalMallIcon className="text-secordary w-4" />
                      <>Cart ({length})</>
                    </div>
                  </Link>
                
              </>
            )}
            {user?.role === "resowner" && (<>
              <Link
              href="/uploadcsv"
              className="flex items-center h-full gap-x-1  hover:text-primary whitespace-nowrap hover:text-ui-fg-base"
            >
              <MenuBookIcon className="text-secordary w-1" />
              Add menu
            </Link>
            </>
            
            )}
            

            <div className="flex items-center h-full gap-x-1 hover:text-primary">
              <AccountDropdown />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
