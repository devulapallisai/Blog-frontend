import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b-4 border-green-700 text-center bg-green-600 font-bold text-lg text-white">
      <ul>
        <li className="inline-block py-4">
          <Link to="/" className="px-6 font-heading">
            Home
          </Link>
        </li>
        <li className="inline-block py-4">
          <Link to="/about" className="px-6 font-heading">
            About
          </Link>
        </li>
        <li className="inline-block py-4">
          <Link to="/article-list" className="px-6 font-heading">
            Articles
          </Link>
        </li>
        <li className="inline-block py-4">
          <Link to="/login" className="px-6 font-heading">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
