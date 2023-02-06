import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1>.trace</h1>
      <div>
        <Link to="/signup">Get Started for Free</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </header>
  );
}
