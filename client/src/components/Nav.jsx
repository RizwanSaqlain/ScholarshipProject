import React from "react";
import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <Navbar
        fluid
        rounded
        className="border-y-2 text-white bg-[#005f73] fixed top-0 left-0 right-0 z-50"
      >
        <Navbar.Brand>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98bt-o_hBRrL3o8HVef9OigTMkOZXyE5VVQ&s"
            className="mr-3 h-6 sm:h-9"
            alt="AICTE Logo"
          />
          <span className="font-semibold self-center whitespace-nowrap text-xl text-white">
            PM-USPY (SSSJKL)
          </span>
        </Navbar.Brand>

        {/* Navbar Links */}
        <Navbar.Collapse className="ms-14">
          {[
            { path: "/home", label: "Home", icon: "/Home.svg" },
            { path: "/notifications", label: "Add Details", icon: "/Grievance.svg" },
            { path: "/grievance", label: "Grievance", icon: "/Grievance.svg" },
            { path: "/entrance", label: "Entrance Examination", icon: "/Entrance.svg" },
            { path: "/profile", label: "User Profile", icon: "/User.svg" },
            { path: "/register", label: "Register", icon: "/Register.svg" },
            { path: "/", label: "Log Out", icon: "/LogOut.svg" }
          ].map(({ path, label, icon }) => (
            <Navbar.Link
              key={path}
              href="#"
              className={`flex items-center rounded-md p-2 ${location.pathname === path ? "text-blue-600 " : "text-blue-500 hover:bg-blue-200 "}`}
            >
              <img className="h-5 mr-1" src={icon} alt={label} />
              <Link to={path} className={`${location.pathname === path ? "text-red-400 font-bold" : "text-white"}`}>
                {label}
              </Link>
            </Navbar.Link>
          ))}
        </Navbar.Collapse>

        {/* Flex container for Navbar.Toggle and Flowbite, aligned to the right */}
        <div className="ml-auto flex items-center gap-2">
          <Navbar.Toggle className="text-white hover:text-blue-500" />
        </div>
      </Navbar>
    </div>
  );
};

export default Nav;
