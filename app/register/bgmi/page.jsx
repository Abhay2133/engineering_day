"use client";
import Input from "../../components/input";
import Select from "../../components/select";
import Info from "../../components/infobox";

import Image from "next/image";
import { useCallback, useState } from "react";

export default function BGMI() {
  const [infoTheme, setInfoTheme] = useState("suggest");
  const [infoText, setInfoText] = useState(" * fields are required");
  const [formData, setFormData] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    setInfoTheme("suggest");
    setInfoText("Uploading Form ...");

    console.log(formData);

    // return ;
    try {
      const response = await fetch("/api/registration/bgmi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, year: parseInt(formData.year) }),
      });

      if (response.ok) {
        let data = await response.json();
        let {type} = data;
        switch(type){
          case "success":
            setInfoTheme("success");
            setInfoText("Form Submitted Successfully");
            break;
          case "error":
            setInfoTheme("error");
            setInfoText(data.message+" -- Contact US with Error");
            break;
        }
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

  const otherDepFee = 200;

  return (
    <div className="w-full grid-bg text-white py-10">
      <form
        onSubmit={onSubmit}
        className="bg-blur w-[95%] mx-auto md:w-[600px] flex flex-col bg-[rgba(255,255,255,0.1)] px-5 lg:px-10 rounded-3xl border border-gray-500"
      >
        <h1 className="text-center text-2xl md:4xl py-10">
          - BGMI BADSHAH -<br />{" "}
          <span className="text-gray-400">Registration Form</span>
        </h1>
        {/* Team Name - Leader */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Team Name"}
            name={"team_name"}
            onChange={handleInput}
            value={formData["team_name"]}
            className={"flex-1"}
            required
          />
          <Input
            required
            label={"Team Leader"}
            name={"team_leader"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["team_leader"]}
          />
        </div>
        {/* Player 2 - player 3 */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Player 2"}
            name={"player2"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["player2"]}
          />
          <Input
            label={"Player 3"}
            name={"player3"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["player3"]}
          />
        </div>

        {/* Player - 4 */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Player 4"}
            name={"player4"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["player4"]}
          />
          <div className="flex-1"></div>
        </div>

        {/* Year - Semester */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            options={["1st", "2nd", "3rd", "4th", "5th"]}
            label={"Year"}
            name={"year"}
            onChange={handleInput}
            value={formData["year"]}
            className="flex-1"
            required
          />
          <Select
            options={Array.from({ length: 10 }).map((e, i) => i + 1)}
            label={"Semester"}
            name={"semester"}
            onChange={handleInput}
            value={formData["semester"]}
            className="flex-1"
            required
          />
        </div>
        {/* Gender - Roll */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            label={"Gender"}
            name={"gender"}
            options={["Male", "Female", "Other"]}
            className={"flex-1"}
            value={formData["gender"]}
            onChange={handleInput}
            required
          />
          <Input
            className={"flex-1"}
            label={"University Roll No."}
            value={formData["rollno"]}
            onChange={handleInput}
            name="rollno"
            placeholder={"eg. 23362xxxxxx"}
            type="number"
            required
          />
        </div>

        {/* Phone - email */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            className={"flex-1"}
            type="number"
            label={"Phone"}
            value={formData["phone"]}
            onChange={handleInput}
            name="phone"
            required
          />
          <Input
            label={"Email"}
            name={"email"}
            className={"flex-1"}
            type="email"
            onChange={handleInput}
            value={formData["email"]}
            required
          />
        </div>

        {/* Department */}
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

        {/* Price - ScreenShot */}
        <div className="flex flex-col md:flex-row gap-xfp5">
          <div className="flex-1 flex-shrink mb-2">
            <div className="text-white mb-2">Charges</div>
            <div className="text-gray-300 flex-1 h-[40px] border flex items-center justify-center border-[#444] rounded text-center">
              {formData["department"]
                ? formData["department"] === "UIT"
                  ? "FREE"
                  : `Rs. ${otherDepFee}`
                : "Choose a Department first"}
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        {/* Payment screenshot */}
        <div className="flex flex-col mt-2">
          {formData["department"] && formData["department"] != "UIT" && (
            <>
              <div className="mb-2">Scan this QR and Upload the Screenshot</div>
              <img
                src="/payment-qr-200.jpg"
                className="w-full md:w-[50%] mx-auto rounded"
              />
              <Input
                label={"Transaction ID"}
                name={"transaction_id"}
                value={formData["transaction_id"]}
                onChange={handleInput}
                required
              />
            </>
          )}
        </div>

        <Info
          theme={infoTheme}
          onClose={() => setInfoTheme("none")}
          text={infoText}
        />
        {/* <InfoBox theme="error" />
        <InfoBox theme="success" /> */}
        {/* SUbmit button */}
        <div className="my-4 flex ">
          <button className="hover:bg-[#223] px-10 py-3 border border-[#555] bg-[#00000088] text-white rounded-lg flex-1 md:flex-none  focus:outline-none focus:ring-[3px] focus:ring-blue-600 focus:border-transparent active:scale-90 transition-none ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const departments = [
  "UIT",
  "USCS",
  "SALS",
  "SLA",
  "UIPS",
  "LCD",
  "UIM",
  "USHHM",
  "USJMC",
  "UCN",
  "USHS",
  "SOA",
];
