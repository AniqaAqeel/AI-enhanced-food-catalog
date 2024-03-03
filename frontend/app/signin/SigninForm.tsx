import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import Alert from '@mui/material/Alert';

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setToken} = useAuth();
  const handleSubmit = async (e:any) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users/auth";
			const { data: res } = await axios.post(url, {
        email:email,
        password:password
      });
      setToken(res.data);
      console.log(res.data);
			
		} catch (error:any) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          
          Welcome!
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            {error &&     <Alert severity="error">{error}</Alert>}
            <form className="space-y-4 md:space-y-6" action="#">
              <InputField
                label="Email address"
                placeholder="Enter your email"
                required={true}
                type="email"
                value={email}
                OnChange={setEmail}
              />
              <InputField
                label="Password"
                placeholder="••••••••"
                required={true}
                type="password"
                value={password}
                OnChange={setPassword}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-primary-600 focus:ring-primary-600 text-primary-600"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forget-password"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do not have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                  prefetch={true}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
