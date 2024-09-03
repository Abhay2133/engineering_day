"use client";

import { useCallback, useState } from "react";

export default function BGMI() {
  const [formData, setFormData] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full grid-bg text-white py-10">
      <form
        onSubmit={onSubmit}
        className="bg-blur w-[95%] mx-auto md:w-[600px] flex flex-col bg-[rgba(255,255,255,0.1)] px-10 rounded-3xl"
      >
        <h1 className="text-center text-4xl py-10">BGMI Registration Form</h1>
        {/* Team Name - Leader */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Team Name"}
            name={"team-name"}
            onChange={handleInput}
            value={formData["team-name"]}
            className={"flex-1"}
          />
          <Input
            label={"Team Leader"}
            name={"team-leader"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["team-leader"]}
          />
        </div>
        {/* Player 2 - player 3 */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Player 2"}
            name={"player-2"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["player-2"]}
          />
          <Input
            label={"Player 3"}
            name={"player-3"}
            className={"flex-1"}
            onChange={handleInput}
            value={formData["player-3"]}
          />
        </div>
        {/* Year - Semester */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Input
            label={"Year"}
            name={"year"}
            className={"flex-1"}
            type="number"
            onChange={handleInput}
            value={formData["year"]}
          />
          <Input
            label={"Semester"}
            name={"semester"}
            className={"flex-1"}
            type="number"
            onChange={handleInput}
            value={formData["semester"]}
          />
        </div>
        {/* Gender - Email */}
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            label={"Gender"}
            name={"gender"}
            options={["Male", "Female", "Other"]}
            className={"flex-1"}
            onChange={handleInput}
          />
          <Input
            label={"Email"}
            name={"email"}
            className={"flex-1"}
            type="email"
            onChange={handleInput}
            value={formData["email"]}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-x-5">
          <Select
            options={["UIT", "USCS", "Other"]}
            label={"Department"}
            name={"department"}
            onChange={handleInput}
            value={formData["department"]}
            className="flex-1"
          />
          <div className="flex-1"></div>
        </div>
        {/* SUbmit button */}
        <div className="mb-4 flex ">
          <button className="hover:bg-[#223] px-10 py-3 border-none bg-[#00000088] text-white rounded-lg flex-1 md:flex-none  focus:outline-none focus:ring-[3px] focus:ring-blue-600 focus:border-transparent active:scale-90 transition-none ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  className,
}) {
  return (
    <div className={`flex flex-col space-y-2  ${className} mb-4`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#ffffff11] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[3px] focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
// import React, { useState, useCallback } from 'react';

function Select({
  label,
  name,
  value = -1,
  onChange,
  options = [],
  id,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleToggle = useCallback(() => {
    console.log("handle toggle");
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleOptionClick = (index, e) => {
    e.stopPropagation();
    setSelectedOption(index);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: options[index] } });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      handleToggle();
    }
  };

  const handleKeys = (e) => {
    e.stopPropagation();
    // e.preventDefault();

    // console.log("handling arrow", e)
    if (!(e.code !== "ArrowUp" || e.code !== "ArrowDown")) return;
    let index;
    if (e.code === "ArrowUp") {
      index = cycle(selectedOption - 1, 0, options.length);
      setSelectedOption(index);
    } else if (e.code === "ArrowDown") {
      index = (selectedOption + 1) % options.length;
      setSelectedOption(index);
    } else if (e.key === "Enter" || e.key === " ") {
      setIsOpen(false);
    }

    if (onChange) {
      onChange({ target: { name, value: options[index] } });
    }
  };

  return (
    <div
      className={`relative flex flex-col mb-3 ${className}`}
      // tabIndex={0}
    >
      {label && (
        <label htmlFor={id} className="text-white mb-1">
          {label}
        </label>
      )}
      <div
        id={id}
        className="relative cursor-pointer border border-gray-300 rounded-md shadow-sm bg-[#ffffff01] focus:outline-none focus:ring-[3px] focus:ring-blue-500 focus:border-transparent"
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        // onKeyDown={handleKeyDown}
      >
        <div className="px-3 py-2 flex justify-between items-center">
          <span className="text-white">
            {selectedOption >= 0 ? options[selectedOption] : "Select an option"}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <div
            tabIndex={0}
            onKeyDown={handleKeys}
            className="absolute z-10 mt-1 w-full bg-[#000000] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none focus:ring-[3px] focus:ring-blue-500 focus:border-transparent"
          >
            {options.map((option, i) => (
              <div
                key={i}
                className={`px-3 py-2 cursor-pointer hover:bg-[#ffffff33] ${
                  i === selectedOption ? "bg-[#4455ff]" : ""
                }`}
                onClick={(e) => handleOptionClick(i, e)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Upload({
  label,
  name,
  value = -1,
  onChange,
  options = [],
  id,
  className,
}) {
  
}

const cycle = (n, a, z) => {
  if (n < a) return z;
  if (n > z) return a;
  return n;
};
