"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        localStorage.setItem("jwt", data.jwt);
        router.push("/");
      } else {
        setError(data.message[0]?.messages[0]?.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gradient-to-r from-green-800 to-blue-600 rounded-xl shadow-2xl p-8 space-y-8">
        <h2 className="text-center text-4xl font-extrabold text-white">Sign Up</h2>
        {success && <p className="text-green-500 text-sm">Registration successful! Redirecting...</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              placeholder="Username"
              className="peer h-10 w-full border-b-2 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
              required
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
            />
            <label htmlFor="username" className="absolute left-0 -top-3.5 text-sm">
              Username
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Email address"
              className="peer h-10 w-full border-b-2 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
              required
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm">
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-10 w-full border-b-2 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-500"
              required
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="password" className="absolute left-0 -top-3.5 text-sm">
              Password
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
