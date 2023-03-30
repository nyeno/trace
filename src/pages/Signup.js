import { React , useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import signin from '../assets/illustrations/signin.svg'
import Input from '../components/Input';
import { getAuthErrorMessage } from '../firebase/errorCodes';
import {GoogleButton} from 'react-google-button'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password2, setPassword2] = useState("")
    const { signUp, googleSignIn } = useUserAuth();
  
    let navigate = useNavigate();
    const handleGoogleSignIn = async (e) => {
      e.preventDefault();
      try {
        await googleSignIn();
        await navigate("/home");
      } catch (err) {
        console.log(err);
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      if (password !== password2) {
        setError("Passwords do not match.");
        return;
      }
      try {
        let userDetails = await signUp(email, password);
        await setDoc(doc(db, "users", userDetails.user.uid), {
          name: firstName + " " + lastName,
        })
        await updateProfile(userDetails.user, {
          displayName: firstName + " " + lastName
        });
        //await console.log(userDetails)
        await navigate("/home");
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
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <Input
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g John"
            type="text"
            pattern="[A-Za-z]+"
            required
          />
          <Input
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g Doe"
            type="text"
            pattern="[A-Za-z]+"
            required
          />
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g johndoe@gmail.com"
            type="email"
            required
          />
          <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <Input
            label="Reenter Password"
            type="password"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
          {error && <p className="text-orangish">{error}</p>}
          <button
            type="submit"
            className="bg-cornflower text-white px-5 py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <div className="p-4 box mt-3 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-cornflower underline">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
