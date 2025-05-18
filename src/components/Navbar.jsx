import { useState } from "react";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import avatarImg from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashboard 2", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>

          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-2 inset-y-2" />
            <input
              className="bg-[#EAEAEA] w-full py-1 px-8 rounded-md focus:outline-none"
              placeholder="Search here"
              type="text"
            />
          </div>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                    src={avatarImg}
                  />
                </button>

                {/* show dropdowns */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                            to={item.href}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li onClick={() => setIsDropdownOpen(false)}>
                        <button
                          className="block w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link
            className="bg-primary p-1 sm:px-6 py-2 flex items-center rounded-sm"
            to="/cart"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              ""
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};
