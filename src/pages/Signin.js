import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Input from "../components/Input";
import signin from '../assets/illustrations/signin.svg'
import { getAuthErrorMessage } from "../firebase/errorCodes";

export default function Signin() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const { logIn } = useUserAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          await logIn(email, password);
          navigate("/home");
        } catch (err) {
          const errMessage = getAuthErrorMessage(err.code)
          setError(errMessage);
        }
      };

  return (
    <main className="flex justify-center items-center">
      <div className="hidden lg:block bg-cornflower basis-1/2 mb-8">
        <img src={signin} alt="Sign in illustration"/>
      </div>
      <div className="basis-1/2 h-full lg:mx-12 mt-16 lg:mt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {error && <p className="text-orangish">{error}</p>}
          <button
            type="submit"
            className="bg-cornflower text-white px-5 py-2 rounded"
          >
            Sign In
          </button>
        </form>
        <div className="p-4 box mt-3 text-center">
          No account yet?{" "}
          <Link to="/signup" className="text-cornflower underline">
            Create a new account
          </Link>
        </div>
      </div>
    </main>
  );
   
}
