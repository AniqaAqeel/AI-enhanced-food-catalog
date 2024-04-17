import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import Alert from "@mui/material/Alert";

export function Forgetpassword() {

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    href="/"
                    prefetch={true}
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
                >
                </Link>
                <div className="w-full bg-accent rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold items-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Forget password?
                        </h1>
                        <form className="space-y-4 md:space-y-6" >

                            <InputField
                                label="Email"
                                placeholder="Enter your email"
                                required={true}
                            // type="password"
                            // value={password}
                            />

                            <InputField
                                label="OTP"
                                placeholder="Enter  OTP"
                                required={true}
                            // type="password"
                            // value={password}
                            />


                            <Link
                                href="/changepassword"
                                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Reset password
                            </Link>


                            

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
