import React, { useContext, useEffect } from "react";
import { userContext } from "../App";
function Admin() {
  const { user, handlelogin, logout } = useContext(userContext);
  useEffect(() => {
    // if (!user) {
    //   window.location.href = "/login";
    // }
  });
  return (
    <>
      <div>Hello {user}</div>
      <button
        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold 
          hover:text-white py-2 px-4 border border-green-500 
          hover:border-transparent 
          rounded"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
}

export default Admin;
