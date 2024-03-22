import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <form className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="border border-gray-300 px-3 py-2 rounded-md"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
