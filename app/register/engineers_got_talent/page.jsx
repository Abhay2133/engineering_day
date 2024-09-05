"use client";
import Input from "../../components/input";
import Select from "../../components/select";
import Info from "../../components/infobox";

import { useCallback, useState } from "react";

export default function EngineersGotTalent() {
  const [infoTheme, setInfoTheme] = useState("suggest");
  const [infoText, setInfoText] = useState(" * fields are required");

  const [formData, setFormData] = useState({
    // branch: "core",
    // department: "UIT",
    // email: "af@c.c",
    // events: "Singing",
    // firstname: "aslfkj",
    // gender: "Male",
    // lastname: "l;skdsjf",
    // phone: "45235",
    // rollno: "1355321",
    // semester: "1st",
    // year: "1st",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setInfoTheme("suggest");
    setInfoText("Uploading Form ...");

    console.log({ formData });
    try {
      const response = await fetch("/api/registration/talent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, year: parseInt(formData.year) }),
      });

      if (response.ok) {
        let data = await response.json();
        console.log({ data });
        setInfoTheme("success");
        setInfoText("Form Submitted Successfully");
      } else {
        console.error("Failed to submit form");
        setInfoTheme("error");
        setInfoText("Error submitting form");
        // Handle the error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setInfoTheme("error");
      setInfoText("Error submitting form");
      // Handle the error (e.g., show an error message)
    }
  };
  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full grid-bg text-white py-10">
      <form
        onSubmit={onSubmit}
        className="bg-blur w-[95%] mx-auto md:w-[600px] flex flex-col bg-[rgba(255,255,255,0.1)] px-5  lg:px-10 rounded-3xl"
      >
        
        <h1 className="text-center text-2xl md:4xl py-10">
          - Engineers' Got Talent -<br />{" "}
          <span className="text-gray-400">Registration Form</span>
        </h1>
        {/* Team Name - Leader */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"First Name"}
            name={"firstname"}
            onChange={handleInput}
            value={formData["firstname"]}
            className={"flex-1"}
            required
          />
          <Input
            required
            label={"Last Name"}
            name={"lastname"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["lastname"]}
          />
        </div>
        {/* Player 2 - player 3 */}

        {/* Year - Semester */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            label={"Year"}
            name={"year"}
            options={["1st"]}
            className={"flex-1"}
            onChange={handleInput}
            value={formData['year']}
            required
          />
          <Select
            label={"Semester"}
            value={formData['semester']}
            name={"semester"}
            options={["1st"]}
            className={"flex-1"}
            onChange={handleInput}
            required
          />
        </div>
        {/* Gender - Email */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            label={"Gender"}
            name={"gender"}
            value={formData['gender']}
            options={["Male", "Female", "Other"]}
            className={"flex-1"}
            onChange={handleInput}
            required
          />
          <Input
            label={"University Roll No."}
            name={"rollno"}
            className={"flex-1"}
            type="number"
            onChange={handleInput}
            value={formData["rollno"]}
            required
          />
        </div>

        {/* Phone - Department */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Email"}
            name={"email"}
            className={"flex-1"}
            type="email"
            onChange={handleInput}
            value={formData["email"]}
            required
          />
          <Input
            className={"flex-1"}
            type="number"
            label={"Phone"}
            value={formData["phone"]}
            onChange={handleInput}
            name="phone"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            options={departments}
            label={"Department"}
            name={"department"}
            onChange={handleInput}
            value={formData["department"]}
            className="flex-1"
            required
          />
          <Input
            className={"flex-1"}
            label={"Branch"}
            value={formData["branch"]}
            onChange={handleInput}
            name="branch"
            placeholder={"eg. Core"}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            options={events}
            label={"Events"}
            name={"events"}
            onChange={handleInput}
            value={formData["events"]}
            className="flex-1"
            required
          />
          <div className="flex-1"></div>
        </div>
        {/* Price - ScreenShot */}

        {/* Payment screenshot */}

        <Info
          theme={infoTheme}
          onClose={() => setInfoTheme("none")}
          text={infoText}
        />
        {/* <InfoBox theme="error" />
        {/* SUbmit button */}
        <div className="my-4 flex ">
          <button className="hover:bg-[#223] px-10 py-3 border-none bg-[#00000088] text-white rounded-lg flex-1 md:flex-none  focus:outline-none focus:ring-[3px] focus:ring-blue-600 focus:border-transparent active:scale-90 transition-none ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const departments = ["UIT"];
const events = ["Dancing", "Singing", "Poetry", "Mimicry", "Rapping"];
