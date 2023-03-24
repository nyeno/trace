import React from 'react'
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";


export default function Header() {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      await navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="flex justify-between py-3 shadow px-4 items-center sticky w-screen top-0 bg-white h-16 z-50">
      <h1 className="text-3xl font-bold tracking-wide">.trace</h1>
      {user && (
        <>
          <div className="flex space-x-4 items-center">
            <p className="hidden md:block">
              Welcome, {user && user.displayName}{" "}
            </p>
            <button
              variant="primary"
              onClick={handleLogout}
              className="bg-cornflower text-white px-5 py-2 rounded"
            >
              Log out
            </button>
          </div>
        </>
      )}
      {!user && (
        <div className="space-x-8 mx-6 font-medium text-md">
          <Link to="/signup" className="hidden lg:block">
            Get Started for Free
          </Link>
          <Link
            to="/signin"
            className="bg-cornflower text-white px-5 py-2 rounded"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
