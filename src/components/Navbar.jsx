import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

const Navbar = ({ email, username }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const role = localStorage.getItem("role");
  const dropdownRef = useRef();

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const location = useLocation();

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-100 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      )}
      <div className="border-b">
        <div className="container m-auto py-1">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-end gap-x-5">
              <Link
                to="#"
                className="border bg-slate-700 rounded-md p-1 flex flex-row gap-x-2 items-end"
              >
                <img
                  src={"/assets/logo192.png"}
                  width={40}
                  height={30}
                  alt="Logo Sky"
                />
                <h1 className="text-sm text-white">SKY Valet</h1>
              </Link>
              <ul className="flex flex-row items-center gap-x-3 text-sm">
                {role === "5" ? (
                  ""
                ) : (
                  <>
                    <li
                      className={`p-2 hover:bg-zinc-100 rounded-md ${
                        location.pathname === "/dashboard" ? "bg-zinc-200" : ""
                      }`}
                    >
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-zinc-100 rounded-md ${
                        location.pathname === "/transactions"
                          ? "bg-zinc-200"
                          : ""
                      }`}
                    >
                      <Link to="/transactions">Valet Trx</Link>
                    </li>
                    <li
                      className={`p-2 hover:bg-zinc-100 rounded-md ${
                        location.pathname === "/userManagement"
                          ? "bg-zinc-200"
                          : ""
                      }`}
                    >
                      <Link to="/userManagement">Users Management</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div
              className="flex flex-row-reverse gap-x-5"
              onClick={toggleDropdown}
            >
              <img
                src={"/assets/logo.png"}
                height={40}
                width={40}
                alt="Foto"
                className="rounded-full"
              />
              <div className="flex flex-col text-end">
                <h1 className="text-sm font-semibold">{username}</h1>
                <h1 className="text-xs text-zinc-300">{email}</h1>
              </div>
            </div>
            {dropdownVisible && (
              <div
                ref={dropdownRef}
                className="origin-top-right absolute top-12 right-5 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  className="py-1 px-3 flex flex-row justify-start items-center hover:bg-gray-100 cursor-pointer"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <CiLogout />
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
