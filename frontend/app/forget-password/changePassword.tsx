import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import Alert from "@mui/material/Alert";

export function ChangePassword() {
 
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          {/* {error && <Alert severity="error">{error}</Alert>} */}

          Welcome!
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change your password
            </h1>
            <form className="space-y-4 md:space-y-6" >
              <InputField
                label="Enter e-mail address"
                placeholder="Enter email address"
                required={true}
                // type="password"
                // value={password}
              />
  
              


              <button
                type="submit"
                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                // onClick={handleSubmit}
              >
                Reset password
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                  prefetch={true}
                >
                  Sign up
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
