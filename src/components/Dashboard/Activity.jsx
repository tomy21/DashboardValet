import React, { useEffect, useState } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import LineChart from "../Chart/LineChart";
import "react-datepicker/dist/react-datepicker.css";
import {
  reportDaily,
  reportMonthly,
  reportYearly,
} from "../../utils/generalApi";
import { DateTime } from "luxon";

export default function Activity({ activeButton, dateFilter }) {
  const [totalTrx, setTotalTrx] = useState(0);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        let reportData;
        let formattedDate;

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
        setTotalTrx(reportData.totalTrx[1][0]);
      } catch (e) {
        console.error("Failed to fetch transaction data:", e);
      }
    };

    fetchReport();
  }, [activeButton, dateFilter]);

  function formatDuration(totalSeconds) {
    // Menghitung jumlah jam, menit, dan detik
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Membuat string dengan format "0h 0m 0s"
    const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;

    return formattedDuration;
  }

  return (
    <div className="w-[65%] h-full border-gray-300 border rounded-md px-2 py-1">
      <h1 className="text-sm text-stone-500 font-medium">Activity </h1>
      <div className="flex flex-row justify-start items-center gap-5">
        {totalTrx && (
          <>
            <div className="flex flex-col">
              <h1 className="text-xs text-stone-400 mt-2">Transactions</h1>
              <div className="flex flex-row justify-end items-end gap-2">
                <h1 className="text-lg">
                  {totalTrx.TotalTrx ? totalTrx.TotalTrx.toLocaleString() : ""}
                </h1>
                <div
                  className={`flex flex-row gap-1 ${
                    totalTrx.TotalTrx > totalTrx.TotalTrxPrevious
                      ? "text-emerald-500"
                      : "text-red-500"
                  } text-xs`}
                >
                  {totalTrx.TotalTrx > totalTrx.TotalTrxPrevious ? (
                    <FaArrowUpLong size={10} />
                  ) : (
                    <FaArrowDownLong size={10} />
                  )}
                  <h1>
                    {totalTrx.TotalTrxPrevious !== 0
                      ? Math.abs(
                          (
                            ((totalTrx.TotalTrx - totalTrx.TotalTrxPrevious) /
                              totalTrx.TotalTrxPrevious) *
                            100
                          ).toFixed(2)
                        )
                      : 100}
                    %
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xs text-stone-400 mt-2">Avg. Durations</h1>
              <div className="flex flex-row justify-end items-end gap-2">
                <h1 className="text-lg">
                  {formatDuration(totalTrx.DurationAvg)}
                </h1>
                <div
                  className={`flex flex-row gap-1 ${
                    totalTrx.DurationAvg > totalTrx.DurationAvgPrevious
                      ? "text-emerald-500"
                      : "text-red-500"
                  } text-xs`}
                >
                  {totalTrx.DurationAvg > totalTrx.DurationAvgPrevious ? (
                    <FaArrowUpLong size={10} />
                  ) : (
                    <FaArrowDownLong size={10} />
                  )}
                  <h1>
                    {totalTrx.DurationAvgPrevious !== 0
                      ? Math.abs(
                          (
                            ((totalTrx.DurationAvg -
                              totalTrx.DurationAvgPrevious) /
                              totalTrx.DurationAvgPrevious) *
                            100
                          ).toFixed(2)
                        )
                      : 100}
                    %
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <LineChart
        width="100%"
        height="210px"
        activeButton={activeButton}
        dateFilter={dateFilter}
      />
    </div>
  );
}
