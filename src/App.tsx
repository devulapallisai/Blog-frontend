import React, { useState, createContext, useEffect } from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Articlelist from "./pages/Articlelist";
import About from "./pages/About";
import firebase from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "./components/firebase";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notfound from "./pages/404";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useNavigate } from "react-router-dom";
export const userContext = createContext({
  user: "",
  handlelogin: () => {},
  logout: () => {},
});
function App() {
  const provider = new GoogleAuthProvider();
  // const navigate = useNavigate();
  const [user, setuser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      if (User) {
        auth.currentUser
          ?.getIdToken(true)
          .then(function (idToken) {
            const { displayName, email, photoURL } = User;
            if (email) {
              fetch("http://localhost:5000/admins").then((res) =>
                res.json().then((re) => {
                  if (re.includes(email)) {
                    setuser(email);
                  }
                })
              );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setuser("");
      }
    });
  }, []);
  const handlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const token = credential ? credential.accessToken : undefined;
        const user = result.user;
        // console.log(user);
        // setuser(user.displayName ? user.displayName : "");
        fetch("http://localhost:5000/admins").then((res) =>
          res.json().then((re) => {
            if (!re.includes(user.email)) {
              logout();
              alert("Looks like you are not an admin :(");
              return;
            }
          })
        );
        // navigate("/admin");
        // window.location.href = "/admin";
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
    signOut(auth)
      .then(() => {
        setuser("");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, handlelogin, logout }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/article-list" element={<Articlelist />} />
            <Route path="/article" element={<Article />}>
              <Route path=":name" element={<Article />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}
function Layout() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Outlet />
      </div>
    </>
  );
}
export default App;
