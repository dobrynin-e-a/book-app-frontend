import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2-neutral";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire({
        position: "top-end",
        title: "Login successfull!",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "top-end",
        title: "Login successful with Google!",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        title: "Google sign in failed!",
        showConfirmButton: false,
        timer: 1500,
        icon: "error",
      });
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>
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
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven't an account? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-700 underline"
            to="/register"
          >
            Register
          </Link>
        </p>

        {/* google sign in */}
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-sm">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};
