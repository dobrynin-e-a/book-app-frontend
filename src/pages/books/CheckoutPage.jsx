import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2-neutral";
import { useAuth } from "../../context/AuthContext";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

export const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const [isChecked, setIsChecked] = useState(false);
  const onSubmit = async (data) => {
    try {
      const newOrder = {
        name: data.name,
        email: currentUser.email,
        address: {
          city: data.city,
          country: data.country,
          state: data.state,
          zipcode: data.zipcode,
        },
        phone: data.phone,
        productsIds: cartItems.map((item) => item._id),
        totalPrice,
      };

      await createOrder(newOrder).unwrap();

      Swal.fire({
        title: "Confirmed Order",
        text: "Your order placed successfully!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error place an order", error);
      alert("Failed to place an order");
    }
  };

  if (isLoading) {
    return <div>Loading .....</div>;
  }

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                Cash On Delevary
              </h2>
              <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
              <p className="text-gray-500 mb-6">
                Items: {cartItems.length > 0 ? cartItems.length : 0}
              </p>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="name"
                        name="name"
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label html="email">Email Address</label>
                      <input
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={currentUser?.email}
                        id="email"
                        name="email"
                        placeholder="email@domain.com"
                        type="text"
                        disabled
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label html="phone">Phone Number</label>
                      <input
                        {...register("phone", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="phone"
                        name="phone"
                        placeholder="+123 456 7890"
                        type="number"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        {...register("address", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="address"
                        name="address"
                        placeholder=""
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        {...register("city", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="city"
                        name="city"
                        placeholder=""
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("country", { required: true })}
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          id="country"
                          name="country"
                          placeholder="Country"
                        />
                        <button
                          className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
                          tabIndex="-1"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line x1="18" x2="6" y1="6" y2="18"></line>
                            <line x1="6" x2="18" y1="6" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          tabIndex="-1"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          {...register("state", { required: true })}
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          id="state"
                          name="state"
                          placeholder="State"
                        />
                        <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line x1="18" x2="6" y1="6" y2="18"></line>
                            <line x1="6" x2="18" y1="6" y2="18"></line>
                          </svg>
                        </button>
                        <button
                          className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
                          tabIndex="-1"
                        >
                          <svg
                            className="w-4 h-4 mx-2 fill-current"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="18 15 12 9 6 15"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        {...register("zipcode", { required: true })}
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        id="zipcode"
                        name="zipcode"
                        placeholder=""
                        type="text"
                      />
                    </div>

                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          className="form-checkbox"
                          id="billing_same"
                          name="billing_same"
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                        />
                        <label className="ml-2 " htmlFor="billing_same">
                          I am aggree to the{" "}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link className="underline underline-offset-2 text-blue-600">
                            Shoping Policy.
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          disabled={!isChecked}
                        >
                          Place an Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
