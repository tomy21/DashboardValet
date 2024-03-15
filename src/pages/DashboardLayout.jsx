import React, { useEffect, useState } from "react";
import TransactionLocations from "../components/Dashboard/TransactionLocations";
import Activity from "../components/Dashboard/Activity";
import Information from "../components/Dashboard/Information";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Navbar from "../components/Navbar";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegCalendarAlt, FaAngleDown } from "react-icons/fa";
import FilterExport from "../components/Modal/filterExport";

export default function DashboardLayout() {
  const currentMonthStartDate = new Date();
  currentMonthStartDate.setDate(1);
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState("monthly");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const openModalFile = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      <input
        type="text"
        ref={ref}
        value={value}
        onClick={onClick}
        className="border border-gray-300 text-start text-xs items-center w-40 pl-8 pr-3 py-1 rounded-md"
      />
      <FaRegCalendarAlt className="absolute top-1 left-2 text-gray-500" />
      <FaAngleDown className="absolute top-1 right-0 text-gray-500" />
    </div>
  ));

  return (
    <>
      <Navbar email={email} username={username} />
      <div className="container m-auto mt-2">
        <div className="flex flex-col mb-5">
          <p className="text-sm text-stone-500">Welcome back,</p>
          <h1 className="text-xl">Dashboard Valet</h1>
        </div>
        <div className="flex flex-row justify-between mb-3">
          <p className="text-stone-500">
            {DateTime.local().toFormat("EEEE, dd LLLL yyyy")}
          </p>
          <div className="flex justify-between items-center gap-5">
            <div className="flex flex-row gap-3">
              {activeButton === "daily" && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd-MMMM-yyyy"
                  popperPlacement="bottom-start"
                  customInput={<CustomInput />}
                />
              )}
              {activeButton === "monthly" && (
                <DatePicker
                  showMonthYearPicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="MMMM-yyyy"
                  popperPlacement="bottom-start"
                  customInput={<CustomInput />}
                />
              )}
              {activeButton === "yearly" && (
                <DatePicker
                  showYearPicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy"
                  popperPlacement="bottom-start"
                  customInput={<CustomInput />}
                />
              )}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-1 text-xs font-medium ${
                    activeButton === "daily"
                      ? "bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white rounded-s-md"
                      : "text-gray-400 bg-transparent border border-gray-400 rounded-s-md"
                  }`}
                  onClick={() => {
                    handleButtonClick("daily");
                  }}
                >
                  Daily
                </button>
                <button
                  type="button"
                  className={`px-4 py-1 text-xs font-medium ${
                    activeButton === "monthly"
                      ? " bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                      : "text-gray-400 bg-transparent border-t border-b border-gray-400"
                  }`}
                  onClick={() => {
                    handleButtonClick("monthly");
                  }}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={`px-4 py-1 text-xs font-medium ${
                    activeButton === "yearly"
                      ? "bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white rounded-e-md"
                      : "text-gray-400 bg-transparent border border-gray-400 rounded-e-md"
                  }`}
                  onClick={() => {
                    handleButtonClick("yearly");
                  }}
                >
                  Yearly
                </button>
              </div>
            </div>
            <button
              className="flex flex-row gap-2 items-center justify-center shadow-inner border rounded-md px-3 py-1 text-sm hover:shadow hover:shadow-yellow-500"
              onClick={() => {
                openModalFile();
              }}
            >
              <span>
                <MdOutlineFileDownload />
              </span>
              export
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center gap-x-2 w-full h-[50vh]">
          <Information activeButton={activeButton} dateFilter={startDate} />
          <Activity activeButton={activeButton} dateFilter={startDate} />
          <TransactionLocations
            activeButton={activeButton}
            dateFilter={startDate}
          />
        </div>
      </div>
      <FilterExport isOpen={openModal} onClose={closeModal} />
    </>
  );
}
