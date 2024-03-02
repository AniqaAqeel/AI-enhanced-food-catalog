"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InputField } from "@/components/Input";
import { RoleSelection } from "./RoleSelection";
export default function SignInPage() {
  const [role, setRole] = useState("student");
  const [stage, setStage] = useState("role-selection");
  if (stage === "role-selection") {
    return <RoleSelection setRole={setRole} setStage={setStage} />;
  }
  return (
        <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
              <Image src="/flowbite.svg" alt="logo" width={32} height={32} className="w-8 h-8 mr-2" />
              Flowbite
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create and account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">

                      <InputField label="Your email" placeholder="Enter your email" required={true} type="email" className="bg-" />
                        <InputField label="Password" placeholder="••••••••" required={true} type="password" />
                        <InputField label="Confirm Password" placeholder="••••••••" required={true} type="password" />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-primary-600 focus:ring-primary-600 text-primary-600" />
                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">Remember me</label>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot your password?</a>
                        </div>

                      <button type="submit" className="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
    
  );
}
