import { React , useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import signin from '../assets/illustrations/signin.svg'
import Input from '../components/Input';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { signUp, user } = useUserAuth();
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        let userDetails = await signUp(email, password);
        await setDoc(doc(db, "users", userDetails.user.uid), {
          name: firstName + " " + lastName,
        })
        await updateProfile(userDetails.user, {
          displayName: firstName + " " + lastName
        });
        await console.log(userDetails)
        await navigate("/home");
      } catch (err) {
        setError(err.message);
      }
  };
  return (
    <main className="flex justify-center items-center">
      <div className="hidden lg:block bg-cornflower basis-1/2 mb-8">
        <img src={signin} />
      </div>
      <div className="basis-1/2 h-full lg:mx-12  mt-16 lg:mt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p>{error}</p>}
          <Input
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g John"
          />
          <Input
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g Doe"
          />
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g johndoe@gmail.com"
          />
          <Input
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Input label="Reenter Password" />
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
