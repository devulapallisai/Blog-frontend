import React, { useContext, useState } from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Articlelist from "./pages/Articlelist";
import About from "./pages/About";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notfound from "./pages/404";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
function Layout() {
  const [user, setuser] = useState();
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
