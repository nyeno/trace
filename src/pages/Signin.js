import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

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
          setError(err.message);
        }
      };

    return (
      <>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <div>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className="p-4 box mt-3 text-center">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </>
    );
}
