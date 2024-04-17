import { InputField } from "@/components/Input";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../AuthContext";
import Alert from "@mui/material/Alert";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function Forgetpassword() {
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const sendOtp = async (email: string) => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/users/resetPassword", {
      email: email,
    });
    return response.data;
  };
  const resetPassword = async ({
    email,
    password,
    otp,
  }: {
    email: string;
    password: string;
    otp: string;
  }) => {
    const url = `${process.env.NEXT_PUBLIC_URL}`;
    axios.defaults.baseURL = url;
    const response = await axios.post("/api/users/resetPassword", {
      email: email,
      newPassword: password,
      otp: otp,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationKey: ["forgetpassword"],
    mutationFn: sendOtp,
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onSuccess: (data: any) => {
      setSucess(data.message);
      
    },
    onMutate: () => {
      setError("");
      setSucess("");
    },
  });
  const resetMutation = useMutation({
    mutationKey: ["resetpassword"],
    mutationFn: resetPassword,
    onError: (error: any) => {
      setError(error.response.data.message);
    },
    onSuccess: (data: any) => {
      setSucess(data.message);
    },
    onMutate: () => {
      setError("");
      setSucess("");
    },
  });
  const searchParams = useSearchParams();
  const otp = useMemo(() => searchParams.get("otp") ?? "", [searchParams]);
  useEffect(() => {
    if (otp) {
      setEmail(searchParams.get("email") ?? "");
    }
  }
, [otp, searchParams]);
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        ></Link>
        <div className="w-full bg-accent rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold items-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Forget password?
            </h1>
            <form className="space-y-4 md:space-y-6">
              {!otp ? (
                <>
                  <InputField
                    label="Email"
                    placeholder="Enter your email"
                    required={true}
                    type="email"
                    value={email}
                    OnChange={setEmail}
                  />

                  <button
                    type="button"
                    onClick={() => mutation.mutate(email)}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <InputField
                    label="New Password"
                    placeholder="Enter new password"
                    required={true}
                    type="password"
                    OnChange={setPassword}
                    value={password}
                  />
                  <InputField
                    label="Confirm Password"
                    placeholder="Confirm password"
                    required={true}
                    type="password"
                    OnChange={setConfirmPassword}
                    value={confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      resetMutation.mutate({ email, password, otp })
                    }
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                  >
                    Reset Password
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
