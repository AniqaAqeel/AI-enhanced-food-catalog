"use client";
import React, { useState } from "react";

export function RoleSelection({
  setRole,
  setStage,
}: {
  setRole: (role: string) => void;
  setStage: (stage: string) => void;
}) {
  return (
    <div className="bg-primary h-screen">
      <h1 className="text-3xl font-bold ">
        Choose your role
      </h1>
      <div className="flex flex-col justify-around items-center h-96">
        <button
          onClick={() => {
            setRole("student");
            //setStage("signup");
          }}
          className="bg-black p-4 w-full"
        >
          I m a student
        </button>
        <button
          onClick={() => {
            setRole("teacher");
            //setStage("signup");
          }}
          className=" bg-black p-4 w-full"
        >
          I m a teacher
        </button>
        
      </div>
    </div>
  );
}
