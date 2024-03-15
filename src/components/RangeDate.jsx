import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RangeDate() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col justify-start items-start gap-y-2">
      <label htmlFor="rangeDate" className="text-xs">
        Date Range
      </label>
      <DatePicker
        id="rangeDate"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
        className="focus:border-blue-500 border border-zinc-300 px-3 py-1 text-xs rounded-[5px] w-48 h-[2.4rem]"
      />
    </div>
  );
}
