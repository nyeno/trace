import { React , useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import signin from '../assets/illustrations/signin.svg'
import Input from '../components/Input';
import { getAuthErrorMessage } from '../firebase/errorCodes';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password2, setPassword2] = useState("")
    const { signUp } = useUserAuth();
  
    let navigate = useNavigate();
  
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
    <main className="lg:flex justify-center items-center h-full">
      <div className="hidden lg:block bg-cornflower basis-1/2 self-stretch">
        <img src={signin} />
      </div>
      <div className="basis-1/2 lg:mx-12 px-8 lg:px-0  mt-16 lg:mt-0">
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
         
          <Input
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g John"
            type="text"
            required
          />
          <Input
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g Doe"
            type="text"
          />
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g johndoe@gmail.com"
            type="email"
          />
          <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Input
            label="Reenter Password"
            type="password"
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
