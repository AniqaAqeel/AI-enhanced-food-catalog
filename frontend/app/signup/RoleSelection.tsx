"use client";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export function RoleSelection({
  setRole,
  setStage,
}: {
  setRole: (role: string) => void;
  setStage: (stage: string) => void;
}) {
  return (
    <div className="items-center justify-center flex h-screen bg-gray-50 ">
    <div className="  md:max-w-full w-full md:w-1/2 lg:w-1/3 rounded-xl md:min-h-96 bg-white lg:min-h-96 md:border-gray-100 md:border-2 md:shadow-inner lg:max-w-full">
      <div className="flex flex-col justify-around items-center h-96 mb-10">
        <h1 className="text-4xl text-primary font-extrabold m-8">Who are you?</h1>
        <button
          onClick={() => {
            setRole("customer");
              setStage("signup");
          }}
          className="text-xl p-3 bg-transparent border-2 opacity-80 border-primary  hover:bg-primary rounded-xl  w-3/4 text-primary hover:text-slate-50"
        >
            <div className="flex justify-around  items-center font-semibold ">
          Customer

          <PersonIcon />
          </div>
        </button>
        <button
          onClick={() => {
            setRole("restaurant");
            setStage("signup");
          }}
          className="text-xl p-3 bg-transparent border-2 opacity-80 border-primary  hover:bg-primary rounded-xl  w-3/4 text-primary hover:text-slate-50"
        >
          <div className="flex justify-around items-center   font-semibold ">
          Restaurant
          <RestaurantIcon  />
          </div>
        </button>
        
      </div>
    </div>
    </div>
  );
}
