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
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header>
      <h1>.trace</h1>
      {!user && (
        <div>
          <Link to="/signup">Get Started for Free</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )}
      {user && (
        <>
          <div className="p-4 box mt-3 text-center">
            Hello Welcome <br />
            {user && user.displayName}
          </div>
          <div className="d-grid gap-2">
            <button variant="primary" onClick={handleLogout}>
              Log out
            </button>
            <Link to="/postJob">Post Job</Link>
            <Link to="/myJobs">My Jobs</Link>
          </div>
        </>
      )}
    </header>
  );
}
