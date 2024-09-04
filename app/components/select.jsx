import { useCallback, useState } from "react";

export default function Select({
  label,
  name,
  value = -1,
  onChange,
  options = [],
  id,
  className,
  required = false,
}) {
  const handleInput = (e) => {
    let { value } = e.target;
    // console.log({name, value})
    if (onChange) onChange({ target: { name, value } });
  };
  return (
    <label
      htmlFor={name}
      className={"flex flex-col mb-3" + " " + className}
      id={id}
    >
      <div className="mb-1">
        {label} {required && "*"}
      </div>
      <select
        id={name}
        className="h-[40px] bg-gray-950 rounded-md px-3 focus:outline-none focus:ring-[3px] focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={handleInput}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((item, i) => (
          <option key={i} value={item} className="bg-gray-800 py-3 block">
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

const cycle = (n, a, z) => {
  if (n < a) return z;
  if (n > z) return a;
  return n;
};
