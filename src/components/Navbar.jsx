import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import logo from "../assets/vecteezy_netflix-logo.jpg";
import { FaPowerOff, FaSearch, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utilities/firebase-configs";
import { signOut } from "firebase/auth";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist", disabled: true },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });

    return () => unsubscribe(); // Cleanup function
  }, [navigate]);

  const handleLinkClick = (link) => {
    setShowMenu(false); // Hide the menu when a link is clicked
    // history.push(link);

    setTimeout(() => {
      navigate(link);
    }, 300); // Adjust timeout delay as needed
  };

  return (
    <div className="relative">
      <nav
        className={`fixed top-0 z-50 flex w-screen justify-between text-white ease-in-out duration-500 ${
          isScrolled
            ? "bg-[rgba(0,0,0,1)]"
            : "bg-gradient-to-b from-black to-transparent"
        }`}
      >
        <div
          id="left"
          className=" flex items-center gap-4 lg:gap-12  ml-4 md:ml-8 lg:ml-12  my-2"
        >
          <div className="w-16 md:w-24 lg:w-28">
            <img src={logo} alt="logo" />
          </div>
          <ul
            className={` ${
              showMenu
                ? "flex flex-col pt-20 gap-10 font-bold  absolute top-0 bg-black h-screen w-full"
                : "hidden"
            } md:flex items-center gap-4 md:gap-4 lg:gap-8 sm:text-xs md:text-sm lg:text-lg`}
          >
            {links.map(({ name, link, disabled }) => {
              return (
                <li
                  key={name}
                  onClick={() => {
                    handleLinkClick(link);
                  }}
                  className={
                    disabled
                      ? "disabled pointer-events-none opacity-50"
                      : " cursor-pointer"
                  }
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          id="right"
          className="flex items-center gap-6 mr-4 md:mr-8 lg:mr-12 my-2"
        >
          <div className={`flex gap-2 ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            {showSearch ? (
              <input
                type="text"
                placeholder="Search"
                id="searchInput"
                className="text-black px-2"
                onMouseEnter={() => setInputHover(true)}
                onMouseLeave={() => setInputHover(false)}
                onBlur={() => {
                  setShowSearch(false);
                  setInputHover(false);
                }}
              />
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => {
              signOut(firebaseAuth);
            }}
          >
            <FaPowerOff className="text-red-600" />
          </button>

          {/* Show the hamburger menu icon on small screens */}
          <div className="md:hidden">
            <button onClick={() => setShowMenu(true)}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
