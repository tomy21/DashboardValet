import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function DropdownText({ title, data, idData }) {
  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <label htmlFor={idData} className="text-xs ">
        {title}
      </label>
      <Select
        id={idData}
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={"All Data"}
        options={data}
        className="min-w-[15vw] max-w-[20vw] text-xs "
      />
    </div>
  );
}
