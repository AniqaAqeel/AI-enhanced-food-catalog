import { Suspense } from "react";
import Link from "next/link";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { AccountDropdown } from "./profile/Account";

export default function NavBar() {
  
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

          
          <div className="flex items-center gap-x-8 h-full flex-1 text-black basis-0 justify-end">

          <Link
              href="/cart"
              className="hover:text-ui-fg-base flex gap-2 text-secondary  hover:text-primary"
            >
              <div className="flex items-center h-full gap-x-1">
                <LocalMallIcon className="text-secordary w-4" />
                Cart (0)
              </div>
            </Link>
          <div className="flex items-center h-full gap-x-1 hover:text-primary">
              <AccountDropdown />
            </div>
          

            

            
            
          </div>
        </nav>
      </header>
    </div>
  );
}
