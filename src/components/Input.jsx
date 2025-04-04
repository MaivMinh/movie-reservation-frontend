import React from "react";

const Input = ({ type, name, label, autoFocus, value, onChange }) => {
  return (
    <div class="relative z-0 w-full my-1 group">
      <input
        autoFocus={autoFocus !== undefined ? true : false}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none dark:text-[#85A900] font-semibold dark:border-gray-600 dark:focus:border-[#85A900] focus:outline-none focus:ring-0 focus:border-[#85A900] peer"
        placeholder=" "
        required
      />
      <label
        for={name}
        class="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#85A900] peer-focus:dark:text-[#85A900] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;