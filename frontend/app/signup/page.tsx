"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InputField } from "@/components/Input";
import { RoleSelection } from "./RoleSelection";
import Link from "next/link";
import { CustomerForm } from "./CustomerForm";
import { RestaurantForm } from "./RestaurantForm";
export default function SignInPage() {
  const [role, setRole] = useState("customer");
  const [stage, setStage] = useState("role-selection");
  if (stage === "role-selection") {
    return <RoleSelection setRole={setRole} setStage={setStage} />;
  }
  if (role == "customer") {
    return <CustomerForm />;
  }
  return <RestaurantForm />
}
