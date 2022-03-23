import React, { useContext, useEffect } from "react";
import { userContext } from "../App";
import Admin from "../images/Admin.svg";
function Login() {
  const { user, handlelogin, logout } = useContext(userContext);
  useEffect(() => {
    if (user) {
      window.location.href = "/admin";
    }
  });
  return (
    <div>
      <div className="text-center mt-[10vh] md:mt-0 md:text-4xl text-2xl text-orange-400 font-heading">
        Are You Admin?
      </div>
      <div className="text-right text-xl md:text-2xl text-blue-400 font-heading">
        Try logging in...
      </div>
      <img src={Admin} alt="Im" style={{ margin: "auto", height: "50vh" }} />
      <br />
      <div className="flex justify-center">
        <button
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold 
          hover:text-white py-2 px-4 border border-green-500 
          hover:border-transparent 
          rounded"
          onClick={handlelogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
