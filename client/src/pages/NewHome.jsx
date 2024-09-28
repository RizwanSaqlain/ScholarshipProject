import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Marquee from "react-fast-marquee";
import newLogo from "../assets/newLogo.gif";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Icon for instructions
import data from "../DataObject/GeneralInstruction";
import noticeData from "../DataObject/Notice";

function NewHome() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-[#f0f8ff] p-20 pt-4 overflow-hidden min-h-screen">
        {/* Marquee Section */}
        <Marquee pauseOnHover speed={100} className="pb-4 text-red-600 font-semibold text-[17px] marquee-bg">
          {/* Add your scrolling content here */}
          <span>Important Update: Scholarship Deadlines Extended | Don't Miss Out!</span>
        </Marquee>

        {/* Hero Section */}
        <div className="rounded mb-6 relative flex min-h-[550px] bg-[#ffffff] shadow-lg overflow-hidden px-10">
          <div
            className="w-full mx-auto absolute inset-0 z-0 bg-center bg-cover rounded mb-6"
            style={{
              backgroundImage:
                "linear-gradient(-135deg, rgba(0, 0, 0, 0.5) 40%, transparent),url('https://www.aicte-india.org/sites/default/files/bureau%20-overview_6.jpg')",
              height: "100%",
              width: "100%",
              opacity: 0.9,
            }}
          ></div>

          <div className="z-10 w-full flex flex-row items-center justify-between px-12 py-16">
            {/* Left Text Section */}
            <div className="w-[60%] text-left">
              <h1 className="text-white font-bold text-5xl leading-tight fade-in md:text-4xl sm:text-3xl">
                Special Scholarship Scheme for J&K and Ladakh (PM-USP)
              </h1>
              <p className="mt-4 text-[#e0e0e0] text-xl">
                Empowering students with new educational opportunities.
              </p>
            </div>

            {/* Right Buttons Section */}
            <div className="w-[30%] flex flex-col items-center gap-6">
              <button
                aria-label="Navigate to login page"
                className="w-full px-8 py-[14px] font-semibold text-white bg-[#006778] hover:bg-[#005362] transition-all duration-200 rounded-full shadow-lg btn-shadow"
                onClick={() => navigate('/home')}
              >
                Login
              </button>
              <button
                aria-label="Navigate to sign-up page"
                className="w-full px-8 py-[14px] font-semibold text-[#006778] bg-white hover:bg-[#f5f5f5] transition-all duration-200 rounded-full shadow-lg border btn-shadow"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="w-full mt-12 flex flex-row gap-12">
          {/* General Instructions Section */}
          <div className="w-[65%]">
            <h2 className="text-3xl font-semibold mb-4">General Instructions</h2>
            <div className="h-1 bg-[#A1D6E2] rounded mb-6"></div>

            <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
              {data.map((item, index) => (
                <div key={index} className="p-4 text-lg text-[#333] font-medium border-b last:border-none flex items-center gap-2">
                  <AiOutlineInfoCircle className="text-blue-500" /> {/* Icon for Instructions */}
                  {item.heading}
                </div>
              ))}
            </div>
          </div>

          {/* Notices Section */}
          <div className="w-[35%] bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-red-600">Don't miss! Special Scholarship Scheme for PM-USP...</p>
            </div>
            <div className="border-2 border-gray-200 p-4 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 text-[#217080]">NOTICES SECTION</h3>
              <div className="h-1 bg-[#A1D6E2] rounded mb-4"></div> {/* Divider under notice title */}

              {/* Notice content with a scrollable area */}
              <div className="space-y-2 max-h-[600px] overflow-y-scroll">
                {noticeData.map((item, index) => (
                  <div key={index} className={`flex items-start gap-2 p-3 rounded-lg ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} cursor-pointer hover:underline`}>
                    <PiArrowBendDownRightBold className="text-xl text-[#217080]" />
                    <p className="text-sm">{item.notice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHome;
