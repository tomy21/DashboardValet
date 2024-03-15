import React, { useEffect, useState } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import {
  reportDaily,
  reportMonthly,
  reportYearly,
} from "../../utils/generalApi";
import { DateTime } from "luxon";

export default function Information({ activeButton, dateFilter }) {
  const [totalTrx, setTotalTrx] = useState({
    TotalIncome: 0,
    TotalTrx: 0,
    TotalVIPTrx: 0,
    TotalValetTrx: 0,
  });
  useEffect(() => {
    const fetchReport = async () => {
      try {
        let reportData;
        let formattedDate =
          DateTime.fromJSDate(dateFilter).toFormat("yyyy-MM-dd");
        if (activeButton === "monthly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const month = selectedDate.month;
          reportData = await reportMonthly(month);
        } else if (activeButton === "yearly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const year = selectedDate.year;
          reportData = await reportYearly(year);
        } else {
          formattedDate =
            DateTime.fromJSDate(dateFilter).toFormat("yyyy-MM-dd");
          reportData = await reportDaily(formattedDate);
        }

        if (reportData.totalTrx && reportData.totalTrx.length > 1) {
          setTotalTrx(
            reportData.totalTrx[1][0] || {
              TotalIncome: 0,
              TotalTrx: 0,
              TotalVIPTrx: 0,
              TotalValetTrx: 0,
            }
          );
        }
      } catch (error) {
        console.error("Failed to fetch daily report:", error);
      }
    };
    fetchReport();
  }, [activeButton, dateFilter]);

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + " MIO";
    } else {
      return number.toLocaleString();
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="border border-gray-300 rounded-md w-48 h-24 px-2 py-1">
        <h1 className="text-sm text-stone-500 font-medium">Total Income</h1>
        <h1 className="font-medium mt-2 mb-3 text-lg">
          {formatNumber(totalTrx.TotalIncome || 0)}
        </h1>
        <h1 className="text-xs flex flex-row gap-2 items-start">
          <div
            className={`flex flex-row gap-1 ${
              totalTrx.TotalIncome > totalTrx.TotalIncomePrevious
                ? "text-emerald-500"
                : "text-red-500"
            } text-xs`}
          >
            {totalTrx.TotalIncome > totalTrx.TotalIncomePrevious ? (
              <FaArrowUpLong size={10} />
            ) : (
              <FaArrowDownLong size={10} />
            )}
            <h1>
              {totalTrx.TotalIncomePrevious !== 0
                ? Math.abs(
                    (
                      ((totalTrx.TotalIncome - totalTrx.TotalIncomePrevious) /
                        totalTrx.TotalIncomePrevious) *
                      100
                    ).toFixed(2)
                  )
                : 100}
              %
            </h1>
          </div>
          <span className="text-stone-400 ">
            vs{" "}
            {activeButton === "monthly"
              ? "Last month"
              : activeButton === "daily"
              ? "Yesterday"
              : "Last year"}
          </span>
        </h1>
      </div>

      <div className="border border-gray-300 rounded-md w-48 h-24 px-2 py-1">
        <h1 className="text-sm text-stone-500 font-medium">VIP</h1>
        <h1 className="font-medium mt-2 mb-3 text-lg">
          {totalTrx.TotalVIPTrx || 0}
        </h1>
        <h1 className="text-xs flex flex-row gap-2 items-start">
          <div
            className={`flex flex-row gap-1 ${
              totalTrx.TotalVIPTrx > totalTrx.TotalVIPTrxPrevious
                ? "text-emerald-500"
                : "text-red-500"
            } text-xs`}
          >
            {totalTrx.TotalVIPTrx > totalTrx.TotalVIPTrxPrevious ? (
              <FaArrowUpLong size={10} />
            ) : (
              <FaArrowDownLong size={10} />
            )}
            <h1>
              {totalTrx.TotalVIPTrxPrevious !== 0
                ? Math.abs(
                    (
                      ((totalTrx.TotalVIPTrx - totalTrx.TotalVIPTrxPrevious) /
                        totalTrx.TotalVIPTrxPrevious) *
                      100
                    ).toFixed(2)
                  )
                : 100}
              %
            </h1>
          </div>
          <span className="text-stone-400 ">
            vs{" "}
            {activeButton === "monthly"
              ? "Last month"
              : activeButton === "daily"
              ? "Yesterday"
              : "Last year"}
          </span>
        </h1>
      </div>

      <div className="border border-gray-300 rounded-md w-48 px-2 py-1">
        <h1 className="text-sm text-stone-500 font-medium">Valet</h1>
        <h1 className="font-medium mt-2 mb-3 text-lg">
          {totalTrx.TotalValetTrx ? totalTrx.TotalValetTrx.toLocaleString() : 0}
        </h1>
        <h1 className="text-xs flex flex-row gap-2 items-start">
          <div
            className={`flex flex-row gap-1 ${
              totalTrx.TotalValetTrx > totalTrx.TotalValetTrxPrevious
                ? "text-emerald-500"
                : "text-red-500"
            } text-xs`}
          >
            {totalTrx.TotalValetTrx > totalTrx.TotalValetTrxPrevious ? (
              <FaArrowUpLong size={10} />
            ) : (
              <FaArrowDownLong size={10} />
            )}
            <h1>
              {totalTrx.TotalValetTrxPrevious !== 0
                ? Math.abs(
                    (
                      ((totalTrx.TotalValetTrx -
                        totalTrx.TotalValetTrxPrevious) /
                        totalTrx.TotalValetTrxPrevious) *
                      100
                    ).toFixed(2)
                  )
                : 100}
              %
            </h1>
          </div>
          <span className="text-stone-400 ">
            vs{" "}
            {activeButton === "monthly"
              ? "Last month"
              : activeButton === "daily"
              ? "Yesterday"
              : "Last year"}
          </span>
        </h1>
      </div>
    </div>
  );
}
