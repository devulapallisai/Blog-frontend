import React, { useState } from "react";
import Admin from "../images/Admin.svg";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import auth from "../components/firebase";
import { useNavigate } from "react-router-dom";
function Login() {
  const provider = new GoogleAuthProvider();
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  const handlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const token = credential ? credential.accessToken : undefined;
        const user = result.user;
        // console.log(user);
        setuser(user.displayName ? user.displayName : "");
        navigate("/admin");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };
  const logout = () => {
    setuser("");
    auth.signOut();
    navigate("/login");
  };
  return (
    <div>
      <div className="text-center md:text-4xl text-2xl text-orange-400 font-heading">
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
        <button
          className="bg-transparent hover:bg-green-500 text-green-700 font-semibold 
          hover:text-white py-2 px-4 border border-green-500 
          hover:border-transparent 
          rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Login;
