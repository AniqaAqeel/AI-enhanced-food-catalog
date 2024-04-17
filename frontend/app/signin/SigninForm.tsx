import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validate";
import { useMutation } from "@tanstack/react-query";

export function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success,setSucess] = useState("");
  const { setToken ,setUser} = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    mutation.mutate();
    
		}
	
  const login = async () => {
    const url = process.env.NEXT_PUBLIC_URL;
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/users/auth", {
      email: email,
      password: password,
    });
    return await response.data;
  }
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error: any) => {
      setError(error.response.data.message?? "An error occured");
    },
    onSuccess: (data: any) => {
      console.log(data);
      setToken(data.data.token);
      setUser({
        email: data.data.user.email,
        name: data.data.user.name,
        role: data.data.user.role,
      });
      router.push("/dashboard");
    },
    onMutate: () => {
      setError("");
      setSucess("");
    }
  });
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
                validate={validateEmail}
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
                  href="/forgetpassword"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                onClick={handleSubmit}
                disabled={mutation.isPending }
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
