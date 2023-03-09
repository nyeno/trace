import { React , useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import {  updateProfile } from "firebase/auth";
//import Header from '../components/Header'

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
    <>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
          <p>First Name</p>
          <input onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <p>Last Name</p>
          <input onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <p>Reenter Password</p>
          <input />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
}
