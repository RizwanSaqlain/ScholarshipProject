import React from "react";

import { Link, NavLink } from "react-router-dom";

const Forms = () => {
  return (
    <>
      <div className="container mt-16 flex justify-around space-x-6 p-2 pt-5 mx-auto">
        <NavLink
          to="/forms/personal"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-red-600" : "text-blue-600"
            } hover:text-blue-800`
          }
        >
         
         <img className="h-8" src="/Personal.svg" alt="" />
          <span>Personal Details</span>
        </NavLink>

        <NavLink
          to="/forms/contact"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-red-600" : "text-blue-600"
            } hover:text-blue-800`
          }
        >
         <img className="h-8" src="/Address.svg" alt="" />
          <span>Address Details</span>
        </NavLink>

        <NavLink
          to="/forms/family"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-red-600" : "text-blue-600"
            } hover:text-blue-800`
          }
        >
         <img src="/Family.svg" alt="" className="h-8" />
          <span>Family and Income</span>
        </NavLink>

        <NavLink
          to="/forms/attachments"
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-red-600" : "text-blue-600"
            } hover:text-blue-800`
          }
        >
         <img src="/Attachments.svg" alt="" className="h-8" />
          <span>Attachments</span>
        </NavLink>
      </div>
    </>
  );
};

export default Forms;
