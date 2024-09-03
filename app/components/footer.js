import React from "react";

const footer = () => {
  return (
    <div>
      <div className="bg-black">
        <div className="text-white text-center p-4 py-10 text-4xl font-semibold">
          Contact Us At
        </div>
        <div className="text-white text-center text-xl text-blue-500">
          Faculty Coordinator
        </div>
        <div className="md:flex-row flex flex-col md:gap-3 justify-center items-center">
          <div className="text-white text-center text-lg ">Dr Madhu Kirola</div>
          <div className="text-[#888]">(Head of Department,CSE)</div>
        </div>
        <div className="md:flex-row mt-1 flex flex-col md:gap-3 justify-center items-center">
          <div className="text-white text-center text-lg ">
            Mr Awadhesh Chandramauli
          </div>
          <div className="text-[#888]">(Head of Department,CE)</div>
        </div>
        <div className="text-white text-center text-xl mt-8 text-blue-500 ">
          Student Coordinator
        </div>
        <div className="md:flex-row flex flex-col md:gap-3 justify-center items-center">
          <div className="text-white text-center text-lg flex flex-col lg:flex-row">Vansh Taneja<div> -  6397379913 - </div></div>
          <div className="text-[#888]">(B.TECH CSE 4th year)</div>
        </div>
        <div className="md:flex-row mt-1 flex flex-col md:gap-3 justify-center items-center">
          <div className="text-white text-center text-lg  flex flex-col lg:flex-row ">
          Ishu Mishra<div> - 9193373770 - </div>
          </div>
          <div className="text-[#888]">(B.TECH CSE 3rd year)</div>
        </div>
        <div className="text-white text-center mt-8 text-sm pb-2">
          &copy; 2024 Engineers Day. All rights reserved.
        </div>

        <div className="md:text-sm mt-3 pb-2 text-white text-center font-light font-sm  ">
          Site Created by: <br className="md:hidden" /> Swati Mishra , Abhay Bisht , Vansh Gambhir
        </div>
      </div>
    </div>
  );
};

export default footer;
