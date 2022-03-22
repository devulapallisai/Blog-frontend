import React from "react";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Articlelist from "./pages/Articlelist";
import About from "./pages/About";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/article-list" element={<Articlelist />} />
          <Route path="/article" element={<Article />}>
            <Route path=":name" element={<Article />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
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
