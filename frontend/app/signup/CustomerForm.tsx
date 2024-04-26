"use client";
import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validate";
import { useMutation } from "@tanstack/react-query";

export  function CustomerForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success,setSucess] = useState("");
  const router = useRouter();
  const handleSubmit = async (e:any) => {
		e.preventDefault();
		// try {
		// 	console.log("ok")
		// 	const url = "http://localhost:8080/api/users";
		// 	const { data: res } = await axios.post(url, {
    //     name: name,
    //     email: email,
    //     password: password,
    //     desc: "customer"
    //   });
			
		// 	console.log(res.message);
    //   setSucess(res.message);
    //   setError("");
    //   setTimeout(() => {
    //     router.push("/signin");
    //   },500);
			
		// } catch (error:any) {
		// 	if (
		// 		error.response &&
		// 		error.response.status >= 400 &&
		// 		error.response.status <= 500
		// 	) {
		// 		setError(error.response.data.message);
		// 	}
    //   else{
    //     setError("An error occured, please try again later");
    //   }
		// }
    if (name === "" || email === "" || password === "") {
      setError("Please fill all fields");
      return;
    }
    mutation.mutate();
	};
  const register = async () => {
    const url = `${process.env.NEXT_PUBLIC_URL}`
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/users", {
      
      name: name,
      email: email,
      password: password,
      desc:"customer"
     
    });
    return await response.data;
  }
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onError: (error:any) => {
      setError(error.response.data.message??"An error occured, please try again later");
    },
    onSuccess: (data:any) => {
      setSucess(data.message);
      router.push("/signin");
    },
    onMutate: () => {
      setError("");
      setSucess("");
    }
  });

    return(
        <section className="bg-accent ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" prefetch={true} 

          className="flex items-center mb-6 text-2xl font-semibold text-secondary "
        >
          {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"> */}
          {/* <Image src="/flowbite.svg" alt="logo" width={32} height={32} className="w-8 h-8 mr-2" /> */}
          Welcome!


        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary md:text-2xl ">
            {error &&     <Alert severity="error">{error}</Alert>}
            {success &&     <Alert severity="success">{success}</Alert>}
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <InputField
                label="Username"
                placeholder="Enter your username"
                required={true}
                value={name}
                OnChange={setName}
              />
              
              <InputField
                label="Email"
                placeholder="Enter your email"
                required={true}
                type="email"
                OnChange={setEmail}
                value={email}
                validate={validateEmail}
              />
              <InputField
                label="Password"
                placeholder="••••••••"
                required={true}
                type="password"
                OnChange={setPassword}
                value={password}
                validate={validatePassword}
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
                    Remember me !
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
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    )
}