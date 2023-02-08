import { React , useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
//import Header from '../components/Header'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        navigate("/");
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
          <input />
        </div>
        <div>
          <p>Last Name</p>
          <input />
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
