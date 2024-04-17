"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Order } from "./Myorders";
import { Button, ListItem, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../AuthContext";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export const RestaurantOrder = ({ order }: { order: Order }) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [open, setOpen] = React.useState(false);
  const rateOrder = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/users/rateOrder",{
      order_id: order.order_id,
      rating: value,
      token: token
    });
    console.log(response.data);
    return response.data;
  }

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: rateOrder,
    mutationKey:["rateOrder",order.order_id],
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["checkMyOrders"],
      });
    }
  })
  const {token} = useAuth();
  return (
    <div className="flex flex-col justify-between text-secondary bg-accent border border-gray-100 rounded-lg shadow px-5 w-7/12">
      <div className="flex flex-col text-medium">
      <List 
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Order # {order.order_id}
          </ListSubheader>
        }
      >
        
        <ListItem className="text-secondary text-base">
            <ListItemText primary= {"Restaurant:" +order.res_name} />
        </ListItem>
        <ListItemButton onClick={()=>setOpen(!open)} className="flex justify-start text-sm font-normal py-2">
          <ListItemText primary={"Items:"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {order.food_items.map((food, index) => (
                <ListItem key={index}>
                    <ListItemText primary={food.itemName} />
                </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      </div>
      <div className="pl-4" >
      {order.order_status === "open" && 
      <div className="flex flex-row pr-10">
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
            direction:"row",
            justifyContent:"space-between"
          }}
        >
            <Typography>
                Rating:
            </Typography>
          <Rating
            name="hover-feedback "
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
          
          <Button onClick={()=>mutation.mutate()} className="bg-primary text-accent hover:bg-grey-50 hover:text-primary">
            Submit
          </Button>
        </Box>
        
      </div>}
      </div>
    </div>
    
  );
};
