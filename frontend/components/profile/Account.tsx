
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import ImageIcon from '@mui/icons-material/Image';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { useQueryClient } from "@tanstack/react-query";


export const AccountDropdown = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const { setToken, setUser, user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = () => {
    setToken("");
    setUser(null);
    router.replace("/signin");
    queryClient.resetQueries(); 
    queryClient.clear();
  };

  return (
    <div>
      <Button
        onClick={handleOpenNavMenu}
        onMouseOver={handleOpenNavMenu}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <AccountCircleIcon className="text-secondary" />
      </Button>
      <IconButton
        onClick={handleOpenNavMenu}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <PersonIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          minWidth: 300,

          marginX: 2,
        }}
        MenuListProps={{
          onMouseLeave: handleCloseNavMenu,
          style: { width: "auto", paddingRight: 10 },
        }}
      >
        <div className="flex-direction: column justify-start  text-secondary">
          <MenuItem>
            <Link href="/account" prefetch={true}>
              <div className="flex items-center gap-x-1 justify-between  text-secondary">
                <PersonIcon className="text-secordary w-4 " />

                <Typography textAlign="center">
                  My profile
                </Typography>
              </div>
            </Link>
          </MenuItem>
          {
            user?.role === "resowner" && <>
              <div className="flex-direction: column justify-start  text-secondary">
                <MenuItem>
                  <Link href="/uploadcsv" prefetch={true}>
                    <div className="flex items-center gap-x-1 justify-between  text-secondary">
                      <FileUploadIcon className="justify-start text-secordary w-5 " />

                      <Typography textAlign="center">
                        Upload CSV
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
                {/* <MenuItem>
                  <Link href="/restaurantaccount" prefetch={true}>
                    <div className="flex items-center gap-x-1 justify-between  text-secondary">
                      <ImageIcon className="text-secordary w-4 " />

                      <Typography textAlign="center">
                        Upload Image
                      </Typography>
                    </div>
                  </Link>
                </MenuItem> */}


                <MenuItem>
                  <Link href="/restaurantaccount" prefetch={true}>
                    <div className="flex items-center gap-x-1 justify-between  text-secondary">
                      <RestaurantMenuIcon className="justify-start text-secordary w-4 " />

                      <Typography textAlign="center">
                        My Restaurant
                      </Typography>
                    </div>
                  </Link>
                </MenuItem>
              </div>
            </>
          }

          <MenuItem onClick={handleLogout}>
            <div className="flex items-center gap-x-1 justify-between text-secondary">
              <LogoutIcon className="text-secordary w-4 " />

              <Typography textAlign="center">
                Log out
              </Typography>
            </div>
          </MenuItem>
        </div>
      </Menu>
    </div>

  );
};
