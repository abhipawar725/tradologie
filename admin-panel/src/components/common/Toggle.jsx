import React from "react";

const Toggle = ({ label, register }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" {...register} />
        <div className="h-6 w-11 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
      </label>
    </div>
  );
};

export default Toggle;
