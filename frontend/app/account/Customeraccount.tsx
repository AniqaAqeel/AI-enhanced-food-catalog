"use client";
import NavBar from "@/components/NavBar";
import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { useQuery } from "@tanstack/react-query";
export function Customeraccount() {
  const fetchProfile = async () => {
      const url = `${process.env.NEXT_PUBLIC_URL}`
      axios.defaults.baseURL = url;
      const response = await axios.get("/api/showProfile", {
        params: {
          token: token,
          role: user?.role,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.data;
  }


  const { setToken, setUser, user,token } = useAuth();
  const {data,isLoading,error} = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
});

  return (
    <div>
      <NavBar />
      <div className="w-full base relative bg-accent ">
        <div className="flex flex-col justify-start h-full px-96 pt-14">
          <div className="text-primary text-3xl font-semibold text-left ">
            My Profile
          </div>
          {error && (
            <Alert severity="error">
              {error.message}
            </Alert>
          )}
          <div className="flex flex-col justify-items-start pt-8 pr-72">
            <div className="text-secondary  font-semibold text-lg pb-3">
              Name:
            </div>
            <div className="bg-gray-50 border border-gray-300 text-secondary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
              <span>{  data?.name}</span>
            </div>
          </div>

          <div className="flex flex-col justify-items-start pt-8 pr-72">
            <div className="text-secondary  font-semibold text-lg pb-3">
              Email:
            </div>
            <div className="bg-gray-50 border border-gray-300 text-secondary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
              <span>{data?.email}</span>
            </div>
          </div>
          {
            user?.role=== "resowner" && <>
            <div className="flex flex-col justify-items-start pt-8 pr-72">
            <div className="text-secondary  font-semibold text-lg pb-3">
              Phone Number:
            </div>
            <div className="bg-gray-50 border border-gray-300 text-secondary sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ">
              <span>{data?.phone_no}</span>
            </div>
          </div>

          <div className="flex flex-col justify-items-start pt-8 pr-72">
            <div className="text-secondary  font-semibold text-lg ">
              
              Desciption:
            </div>
            <InputField
            
                label="" 
                placeholder="Enter Desciption"
                className="mb-3"
                required={true}
                // type="password"
                // value={password}
              />
            </div>
            
              </>
          }
          

          <div className="flex flex-col justify-items-start pt-8 pr-72">
            <div className="text-secondary  font-semibold text-lg ">
              {" "}
              Password:
            </div>
            <div className="flex flex-col justify-items-start py-3">
              <InputField
                label="Current password"
                placeholder="Enter current password"
                className="mb-3"
                required={true}
                // type="password"
                // value={password}
              />
              <InputField
                label="New password"
                placeholder="Enter new password"
                className="mb-3"
                required={true}
                // type="password"
                // value={password}
              />

              <InputField
                label="Confirm password"
                placeholder="Confirm new password"
                className="mb-6"
                required={true}
                // type="password"
                // value={password}
              />
            </div>

            <button
              type="submit"
              className="mb-10 w-1/3 text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              // onClick={handleSubmit}
            >
              Reset password
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
