import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsonDataTrx } from "../../utils/generalApi";
import * as XLSX from "xlsx";

function FilterExport({ isOpen, onClose }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  if (!isOpen) {
    return null;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      console.error("Export data is empty or undefined.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "export_data.xlsx");
  };

  const handleItemClick = async (format) => {
    if (!startDate || !endDate) {
      console.error("Please select start and end date.");
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const exportData = await jsonDataTrx(formattedStartDate, formattedEndDate);
    exportToExcel(exportData);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-start justify-center z-50 ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg w-[90wh] top-12 p-8">
          <div className="flex justify-between items-center mb-2 border-b pb-2 border-slate-300">
            <h1 className="text-base font-semibold">Filter Data</h1>
            <button onClick={onClose} className="text-2xl">
              &times;
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
                dateFormat={"yyyy-MM-dd"}
              />
            </div>
          </div>
          <div className="w-32">
            <button
              onClick={() => handleItemClick()}
              className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 bg-white border-emerald-700 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 mt-2"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterExport;
