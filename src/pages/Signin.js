import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Input from "../components/Input";
import signin from '../assets/illustrations/signin.svg'
import { getAuthErrorMessage } from "../firebase/errorCodes";
import {GoogleButton} from 'react-google-button'


export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async (e) => {
      e.preventDefault()
      try {
        await googleSignIn()
        await navigate("/home");
      }
      catch (err) {
        console.log(err)
      }
  }
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
    <main className="lg:flex justify-center items-center h-screen">
      <div className="hidden lg:flex justify-center items-center bg-cornflower basis-1/2 h-screen ">
        <img
          src={signin}
          alt="sign up illustration "
          className="object-contain max-h-full "
        />
      </div>
      <div className="basis-1/2 lg:mx-12 px-8 lg:px-0 mt-32 lg:mt-0">
        <div className="flex items-center justify-center my-8">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
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
