"use client";

import { RegisterData } from "@/types/types";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const registerData: RegisterData = {
      email,
      password,
      phoneNumber,
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
    } else {
      // Handle successful registration
      console.log("Token:", data.token);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleRegister}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Register
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
