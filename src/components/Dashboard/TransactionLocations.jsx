import React, { useEffect, useState } from "react";
import {
  reportDaily,
  reportMonthly,
  reportYearly,
} from "../../utils/generalApi";
import { DateTime } from "luxon";

export default function TransactionLocations({ activeButton, dateFilter }) {
  const [listTrx, setListTrx] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataList;
        let formattedDate =
          DateTime.fromJSDate(dateFilter).toFormat("yyyy-MM-dd");
        if (activeButton === "monthly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const month = selectedDate.month;
          dataList = await reportMonthly(month);
        } else if (activeButton === "yearly") {
          const selectedDate = DateTime.fromJSDate(dateFilter);
          const year = selectedDate.year;
          dataList = await reportYearly(year);
        } else {
          formattedDate =
            DateTime.fromJSDate(dateFilter).toFormat("yyyy-MM-dd");
          dataList = await reportDaily(formattedDate);
        }
        setListTrx(dataList.listArea[1]);
      } catch (error) {
        console.error("Failed to fetch transaction data:", error);
      }
    };
    fetchData();
  }, [activeButton, dateFilter]);
  console.log(listTrx);
  // const formatRupiah = (amount) => {
  //   // Convert the amount to Indonesian Rupiah currency format
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //   }).format(amount);
  // };

  return (
    <div className="relative w-[26vw] h-full border-gray-300 border rounded-md px-2 py-1 flex flex-col">
      <h1 className="text-sm text-stone-500 font-medium text-start">
        Transactions by location
      </h1>
      <table className="mt-5">
        <tbody>
          {listTrx.length > 0 ? (
            listTrx.map((item, index) => (
              <tr key={index} className="text-xs border-b cursor-pointer">
                <td className="w-full py-2 ">
                  <h1 className="text-xs">{item.Name}</h1>
                  <h1 className="text-slate-400">
                    {"IDR " +
                      (item.TotalTariff
                        ? item.TotalTariff.toLocaleString()
                        : "")}
                  </h1>
                </td>
                <td className="">
                  {item.TotalTrx ? item.TotalTrx.toLocaleString() : 0}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <button className="absolute bottom-2 px-3 py-1 text-sm shadow-inner border border-stone-300 rounded-md mt-4">
        Show more
      </button> */}
    </div>
  );
}
