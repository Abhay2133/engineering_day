"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const Page = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [formData, setFormData] = useState({ UniversityRollNo:"",EmailAddress:"", FirstName:"", LastName:"", Branch:"", Department:"", Year:"1st", PhoneNumber:"", SelectedEvents:"" });
  // const [formData, setFormData] = useState({
  //   UniversityRollNo: "1234",
  //   EmailAddress: "a@b.c",
  //   FirstName: "123",
  //   LastName: "123",
  //   Branch: "123",
  //   Department: "123",
  //   Year: "1",
  //   PhoneNumber: "1233",
  //   SelectedEvents: "",
  // });
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoMode, setInfoMode] = useState(
    "none" || "error" || "success" || "uploading" 
  );
  const eventsLimit = 2;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInfoMode("uploading");
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, Year:parseInt(formData.Year)}),
      });

      const result = await response.json();
      if (response.ok) {
        // console.log("Success:", result);
        setInfoMode("success");
      } else {
        console.error("Error:", response.statusText);
        setInfoMode("error");
      }
    } catch (error) {
      let res = await response.json();
      console.error("Error:", error, { res });
    }
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEventSelection = (i) => {
    let newList = Array.from(selectedEvents);
    if (newList.includes(i)) newList = newList.filter((e) => e != i);
    else newList.push(i);

    setSelectedEvents([...newList]);
    setFormData({
      ...formData,
      SelectedEvents: newList.map((i) => events[i]).join(","),
    });
  };

  return (
    <div className="bg-black min-h-svh w-[100%] " onSubmit={handleSubmit}>
      <form className="max-w-[60vw] mx-auto ">
        <h1 className="text-4xl font-bold text-white text-center py-10">
          Registration Form
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={handleInput}
            value={formData.EmailAddress}
            type="email"
            name="EmailAddress"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={handleInput}
            value={formData.UniversityRollNo}
            type="number"
            name="UniversityRollNo"
            id="uurollno"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="uurollno"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            University Roll No
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleInput}
              value={formData.FirstName}
              type="text"
              name="FirstName"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleInput}
              value={formData.LastName}
              type="text"
              name="LastName"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleInput}
              value={formData.Branch}
              type="text"
              name="Branch"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Branch
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleInput}
              value={formData.Department}
              type="text"
              name="Department"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Department
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <select
              onChange={handleInput}
              value={formData.Year}
              name="Year"
              id="year"
              className="bg-black rounded p-3-full block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              // defaultValue={""}
              required
            >
              <option className="text-black" value="1st">
                1st
              </option>
              <option className="text-black" value="2nd">
                2nd
              </option>
              <option className="text-black" value="3rd">
                3rd
              </option>
              <option className="text-black" value="4th">
                4th
              </option>
              <option className="text-black" value="5th">
                5th
              </option>
            </select>
            <label
              htmlFor="year"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-pink-600"
            ></label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={handleInput}
              value={formData.PhoneNumber}
              type="number"
              name="PhoneNumber"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
        </div>
        <div className="w-full">
          <label className="block mb-4 font-regular text-xl text-white">
            Select the Events:
          </label>
          <div className="sm:flex flex-col items-center gap-2 lg:grid lg:grid-cols-3 justify-center">
            {events.map((item, i) => (
              <label
                className=" text-white flex gap-x-3  w-[90%] md:w-auto"
                htmlFor={item}
                key={i}
              >
                <input
                  id={item}
                  type="checkbox"
                  onClick={() => handleEventSelection(i)}
                  value={item}
                  checked={selectedEvents.includes(i)}
                  disabled={
                    selectedEvents.length >= eventsLimit &&
                    !selectedEvents.includes(i)
                  }
                  name="event"
                  required={selectedEvents.length == 0}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        {infoMode == "success" && (
          <div className="flex p-4 text-base mt-5 rounded border border-gray-50 bg-[#252] text-white">
            Registration Completed
            <div
              onClick={() => setInfoMode("none")}
              className="ml-auto hover:cursor-pointer hover:bg-[#363] active:scale-90 transition-none"
            >
              ❌
            </div>
          </div>
        )}
        {infoMode == "error" && (
          <div className="flex p-4 text-base mt-5 rounded border border-gray-50 bg-[#522] text-white">
            Registration Failed
            <div
              onClick={() => setInfoMode("none")}
              className="ml-auto hover:cursor-pointer hover:bg-[#363] active:scale-90 transition-none"
            >
              ❌
            </div>
          </div>
        )}
        {infoMode == "uploading" && (
          <div className="flex gap-x-3 p-4 text-base mt-5 rounded border border-gray-50 bg-[#225] text-white">
            <div className="spinner border border-[5px] border-[rgba(0,0,0,0.5)] border-t-blue-700 h-[20px] w-[20px] rounded-full"></div>
            <div>Uploading Data</div>
            <div
              onClick={() => setInfoMode("none")}
              className="ml-auto hover:cursor-pointer hover:bg-[#363] active:scale-90 transition-none"
            >
              ❌
            </div>
          </div>
        )}
        <div className="flex items-center justify-center py-5">
          <button
            type="submit"
            className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Submit
          </button>
        </div>
      </form>
      {/* {showSuccessSnackbar && <Modal body={'User Registered'}/>} */}
    </div>
  );
};

function SnackBar(text) {
  return (
    <div className="fixed w-svw h-[60px] bottom-0 left-0 bg-red-500"></div>
  );
}

export default Page;

const events = [
  "Video Presentation",
  "E-Sports",
  "Web War",
  "Model Presentation",
  "Face Painting",
  "Boat Race",
  "Painting",
  "Anime Creation",
  "Engineer's Fun Run",
  "Cosplay",
  "Coding War",
  "Robo Race",
  "Technical Quiz",
  "Cooking Competition",
];
