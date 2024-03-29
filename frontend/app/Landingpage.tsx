import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import home from "@/src/img/bg_home.png";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { ClassNames } from "@emotion/react";
import { SecurityUpdate } from "@mui/icons-material";
export function LandingPage() {
  return (
    <section className=" bg-cover bg-no-repeat h-screen ">
    <Image
        src={home}
        alt="logo"
        style={{ marginTop: "0px" }}
        className=" bg-cover bg-no-repeat h-screen object-cover max-w-full "
        fill
    />
        <div className="flex justify-below items-center text-left  absolute top-0 left-20 right-0 bottom-0 pt-20">
        <div className=" justify-around  text-left ">
          <h1 className="text-6xl font-bold text-primary mb-5">Experience</h1>
          <h2 className="text-5xl font-semibold text-secondary mb-3">
            the Menu Evolution
          </h2>
          <h3 className="text-m font-medium text-secondary mb-6">
            AI-Powered Menus, Instant Ordering, Ultimate
            <br />
            Convenience!
          </h3>
          <div className="text-center">
            <Link
              href="/signup"
              className=" items-center inline-block px-4 py-2.5 bg-primary hover:bg-transparent hover:border-primary hover:text-primary focus:ring-2 focus:ring-primary font-semibold rounded-3xl text-xl border-2 border-transparent transition duration-300"
            >
              Get Started!
            </Link>
            <span className="mx-4"></span>
          </div>
        </div>
      </div>

      <header className="absolute top-0 left-0 right-0 bg-home mt-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/LandingPage" className="flex items-center">
            <span className="flex flex-wrap justify-between items-center self-center text-secondary text-3xl font-bold whitespace-nowrap">
              <h1 className="text-primary ml-[-40px] me-4">
                <RestaurantIcon />
              </h1>
              DishCraft
            </span>
          </Link>
          <div className="flex items-center ml-[-100px] ">
            <Link
              href="/signin"
              className="text-accent bg-transparent border-2 opacity-80 border-accent  hover:bg-accent hover:text-primary focus:ring-1 focus:ring-accent font-semibold rounded-xl text-l px-4 lg:px-4 py-2 lg:py-2 mr-2"
            >
              Log in
            </Link>
            <span className="mx-4"></span>
            <Link
              href="/signup"
              className="text-accent bg-transparent border-2 opacity-80 border-accent  hover:bg-accent hover:text-primary focus:ring-1 focus:ring-accent font-semibold rounded-xl text-l px-4 lg:px-4 py-2 lg:py-2 mr-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
    </section>
  );
}
