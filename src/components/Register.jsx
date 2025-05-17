import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Swal from "sweetalert2-neutral";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
  const [message, setMessage] = useState("");
  const { registerUser } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await registerUser(data.email, data.password);
      Swal.fire({
        position: "top-end",
        title: "User registered successfully!",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
      });
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
              id="email"
              name="email"
              placeholder="Email Address"
              type="email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded focus:outline-none">
              Register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-700 underline"
            to="/login"
          >
            Login
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-500 text-sm">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};
