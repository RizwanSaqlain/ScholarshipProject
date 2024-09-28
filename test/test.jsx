import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import Marquee from "react-fast-marquee";
import newLogo from "../assets/newLogo.gif";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import data from "../DataObject/GeneralInstruction";
import noticeData from "../DataObject/Notice";

function NewHome() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <>
      <Navbar />
      <div className="bg-[#A1D6E2] p-6 pt-4 overflow-hidden">
        <Marquee pauseOnHover children speed={100} className="pb-2 text-red-600 font-semibold text-[17px]">
          {/* <p className="w-[100vw]"> This is a running text paragraph in ReactJS. </p> */}
        </Marquee>
        <div className="rounded-1xl p6 px-6 relative flex size-full min-h-screen flex-col bg-[#ffffff] ">
          <div
            className="w-full mx-auto opacity-85 absolute top-5 left-7 z-1 bg-center bg-no-repeat bg-cover flex flex-col justify-start bg-[#FFFFFF] @[480px]:rounded-xl min-h-80 rounded-2xl"
            style={{
              backgroundImage: "linear-gradient(-135deg, transparent 40%, #000),url('https://www.aicte-india.org/sites/default/files/bureau%20-overview_6.jpg')",
              height: "480px",
              width: "96%",
            }}
          ></div>

          <div className="z-10 h-[500px] mx-auto flex flex-row items-center justify-around">
            <div className="w-[60%] flex gap-4 flex-col">
              <div className="text-[#231d1d] font-bold text-4xl opacity-100">
                Special Scholarship Scheme for J&K and Ladakh (PM-USP)
              </div>
              <div className="font-semibold text-xl text-[#000000e1] text-[#dfd6d6]">
                Providing educational opportunities for students.
              </div>
            </div>

            <div className="w-[40%] opacity-100 flex flex-col items-center justify-center gap-6">
              <button
                className="px-8 py-[10px] font-semibold text-white bg-[#1a697a] rounded-2xl text-base hover:scale-[90%] transition-all duration-200"
                onClick={() => navigate('/home')} // Navigate to /home on click
              >
                Login
              </button>
              <button className="px-6 py-[10px] font-semibold text-[#1a697a] bg-white rounded-2xl text-base hover:scale-[90%] transition-all duration-200">
                SignUp
              </button>
            </div>
          </div>

          <div className="w-full mt-8 mb-4 flex flex-row">
            <div className="w-[70%] ml-2">
              <h2 className="text-3xl font-semibold">General Instructions</h2>
              <div className="h-1 bg-[#A1D6E2] rounded"></div>

              <div className="mt-5 m-1 border rounded-xl">
                {data.map((data) => (
                  <div className="p-2 pl-5 border-b rounded-xl text-[#000000]">{data.heading}</div>
                ))}
              </div>
            </div>
            <div className="w-[30%] mt-5 h-fit bg-white ml-10">
              <div className="mb-2">
                <p className="text-lg px-2 text-center text-red-800">Don't miss! Special Scholarship Scheme for PM-USP...</p>
              </div>
              <div className="border-2 border-[#aaabab] p-3 rounded-2xl ">
                <h3 className="font-bold text-xl mb-2 text-[#217080]">NOTICES SECTION</h3>

                <div className="container-snap h-80 p-1 pt-2 flex flex-col gap-3 overflow-x-hidden overflow-y-scroll">
                  <div>
                    <img src={newLogo} className="h-7 w-14 rounded-full inline" />
                    <p className="text-sm inline">POSTMATRIC SCHOLARSHIP TIME-TABLE (2023-24) FOR GENERAL, MINORITY AND OBC CATEGORY 08 JULY 2024</p>
                  </div>
                  <div>
                    {noticeData.map((data) => (
                      <>
                        <PiArrowBendDownRightBold className="inline font-extrabold text-xl mr-2" />
                        <p className="text-sm inline">{data.notice}</p>
                        <br />
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewHome;
