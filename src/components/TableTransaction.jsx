import React, { useEffect, useState } from "react";
import ReactPagination from "react-paginate";
import { allTrxValet } from "../utils/generalApi";
import { format } from "date-fns";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa6";
import { IoDownloadOutline } from "react-icons/io5";
import FilterExport from "./Modal/filterExport";

function TableTransaction() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [countData, setCountData] = useState(0);
  const [sortBy, setSortBy] = useState("UpdatedOn");
  const [sortDirection, setSortDirection] = useState("DESC");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataAll = await allTrxValet(
        pages,
        limit,
        sortBy,
        sortDirection,
        search
      );
      setDataTransaction(dataAll.data);
      setTotalPages(dataAll.totalPages);
      setPages(dataAll.currentPage);
      setCountData(dataAll.totalData);
    };

    fetchData();
  }, [pages, limit, sortBy, sortDirection, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortBy === key && sortDirection === "asc") {
      direction = "desc";
    }
    setSortBy(key);
    setSortDirection(direction);
  };

  const renderSortIcon = (columnName) => {
    if (sortBy === columnName) {
      return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const changePage = ({ selected }) => {
    setPages(selected + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(dataTransaction);

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <button
          className="bg-emerald-600  text-white text-sm px-3 py-2 mb-2 rounded-md shadow-md shadow-emerald-800 flex justify-between items-center gap-2 hover:bg-emerald-500"
          onClick={openModal}
        >
          <span>
            <IoDownloadOutline size={21} />
          </span>
          Download{" "}
        </button>
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          className="py-2 px-2 text-xs mb-2 border border-zinc-300 rounded-md"
          placeholder="Search"
        />
      </div>
      <div className="border border-zinc-300 rounded-md text-xs">
        <div className="overflow-x-auto pb-1">
          <table className="w-full table-auto">
            <thead className="bg-zinc-200">
              <tr>
                <th className="p-2 text-start cursor-pointer">No</th>
                <th
                  className="p-2 text-start cursor-pointer w-72"
                  onClick={() => requestSort("LocationCode")}
                >
                  <div className=" flex justify-between items-center">
                    NameLocation <span>{renderSortIcon("LocationCode")}</span>
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer w-60"
                  onClick={() => requestSort("TrxNo")}
                >
                  <div className=" flex justify-between items-center">
                    NoTransaction <span>{renderSortIcon("TrxNo")}</span>
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer w-60"
                  onClick={() => requestSort("TicketNumber")}
                >
                  <div className="flex justify-between items-center">
                    TicketNumber <span>{renderSortIcon("TicketNumber")}</span>
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer"
                  onClick={() => requestSort("VehiclePlate")}
                >
                  <div className="flex justify-between items-center">
                    VehiclePlate {renderSortIcon("VehiclePlate")}
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer w-40"
                  onClick={() => requestSort("InTime")}
                >
                  <div className="flex justify-between items-center">
                    InTime {renderSortIcon("InTime")}
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer w-40"
                  onClick={() => requestSort("ReqPickupOn")}
                >
                  <div className="flex justify-between items-center">
                    RequestTime {renderSortIcon("ReqPickupOn")}
                  </div>
                </th>
                <th
                  className="p-2 text-start cursor-pointer w-40"
                  onClick={() => requestSort("OutTime")}
                >
                  <div className="flex justify-between items-center">
                    OutTime {renderSortIcon("OutTime")}
                  </div>
                </th>
                <th className="p-2 text-start cursor-pointer">Foto</th>
                <th
                  className="p-2 text-start cursor-pointer"
                  onClick={() => requestSort("NoKeySlot")}
                >
                  <div className="flex justify-between items-center">
                    NoKeySlot {renderSortIcon("NoKeySlot")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataTransaction.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Not found data
                  </td>
                </tr>
              ) : (
                dataTransaction.map((items, index) => (
                  <tr
                    className="hover:bg-slate-300 cursor-pointer border-b"
                    key={index}
                  >
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.Name ?? "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.TrxNo ?? "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.TicketNumber ?? "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.VehiclePlate ?? "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.InTime != null
                        ? format(new Date(items.InTime), "yyyy-MM-dd HH:mm:ss")
                        : "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.ReqPickupOn != null
                        ? format(
                            new Date(items.ReqPickupOn),
                            "yyyy-MM-dd HH:mm:ss"
                          )
                        : "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.OutTime != null
                        ? format(new Date(items.OutTime), "yyyy-MM-dd HH:mm:ss")
                        : "-"}
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      <button className="bg-cyan-700 text-white px-1 py-1 rounded-md">
                        Detail
                      </button>
                    </td>
                    <td className="text-start px-2 py-1 whitespace-nowrap">
                      {items.NoKeySlot ?? "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 xl:px-2 xl:py-5">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex flex-row gap-x-3 items-center justify-center">
              <p className=" text-gray-700">
                Showing
                <span className="font-medium px-1">1</span>
                to
                <span className="font-medium px-1">{limit}</span>
                of
                <span className="font-medium px-1">{countData}</span>
                results
              </p>

              <select
                name="limit"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="px-2 py-1 border border-zinc-200 focus:border-amber-200 focus:border-2  rounded-md"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div>
              <nav aria-label="Page navigation">
                <ul className="justify-content-center">
                  <ReactPagination
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={totalPages}
                    onPageChange={changePage}
                    containerClassName={
                      "isolate inline-flex -space-x-px rounded-md shadow-sm "
                    }
                    activeClassName={"bg-yellow-500 text-white focus:z-20"}
                    previousClassName={
                      "inline-flex items-center rounded-l-md px-4 py-1 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                    nextClassName={
                      "inline-flex items-center rounded-r-md px-4 py-1 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                    pageLinkClassName={
                      "inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 "
                    }
                    disabledLinkClassName={"text-gray-400"}
                  />
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <FilterExport isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default TableTransaction;
