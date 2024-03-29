import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";

export function Home() {
  const { user, setToken, setUser } = useAuth();
  const logout = () => {
    setUser(null);
    setToken("");
  };
  return (
    <div className="bg-gray-50 h-screen flex items-center justify-center text-black">
      <div className="flex flex-col items-center">
        <h1 className="text-black">Welcome {user?.name}</h1>
        <button
          onClick={logout}
          className="bg-primary text-white p-2 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
