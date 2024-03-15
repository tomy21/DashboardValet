import React, { useEffect, useState } from "react";
import ReactPagination from "react-paginate";
import { CiSquarePlus } from "react-icons/ci";
import { getAllUsers } from "../utils/usersAPI";
import { format } from "date-fns";
import AddUsers from "./Modal/addUsers";

export default function TableUsers() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [getUsers, setGetUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [row, setRows] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataAll = await getAllUsers(keyword, page, row);
      setGetUsers(dataAll.data);
      setPage(dataAll.currentPage);
      setTotalPage(dataAll.totalPages);
      setRows(dataAll.limit);
      setTotalRows(dataAll.totalRows);
      console.log("data", dataAll);
    };

    fetchData();
  }, [keyword, page, row]);

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log(keyword);
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="px-3 py-2 bg-teal-700 text-white focus:border-teal-300 rounded-md shadow-teal-100 shadow-md flex flex-row gap-x-2 items-center justify-center hover:bg-teal-600 mb-3"
          onClick={openModal}
        >
          <CiSquarePlus size={20} />
          <h1>Add Users</h1>
        </button>
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={handleSearchChange}
          className="border border-zinc-200 focus:border-amber-200 focus:border-2 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div className="border border-zinc-300 rounded-md text-xs">
        <table className="w-full table-auto">
          <thead className="bg-zinc-200">
            <tr>
              <th className="p-2 text-start ">No</th>
              <th className="p-2 text-start ">User</th>
              <th className="p-2 text-start ">Role</th>
              <th className="p-2 text-start ">Gender</th>
              <th className="p-2 text-start ">No. Handphone</th>
              <th className="p-2 text-start ">Last Active</th>
              <th className="p-2 text-start ">Status</th>
            </tr>
          </thead>
          <tbody>
            {getUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Not found data
                </td>
              </tr>
            ) : (
              getUsers.map((items, index) => (
                <tr
                  className="hover:bg-slate-300 cursor-pointer border-b"
                  key={index}
                >
                  <td className="text-start px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2 flex justify-start items-center gap-2">
                    <img
                      src={"/assets/logo.png"}
                      alt="Logo Valet"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-start items-start gap-y-1">
                      <h1 className="font-semibold ">{items.Username}</h1>
                      <h3 className="text-slate-400 text-xs">{items.Email}</h3>
                    </div>
                  </td>
                  <td className="text-start  px-2 py-2">{items.Description}</td>
                  <td className="text-start  px-2 py-2">
                    {items.Gender === "M" ? "Male" : "Female"}
                  </td>
                  <td className="text-start  px-2 py-2">{items.HandPhone}</td>
                  <td className="text-start  px-2 py-2">
                    {items.LastActivity === null
                      ? "-"
                      : format(
                          new Date(items.LastActivity),
                          "EEE, dd-MM-yyyy HH:mm"
                        )}
                  </td>
                  <td className="text-start  px-2 py-2">
                    <span className="bg-emerald-200 text-emerald-600 px-3 py-2 rounded-lg">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 xl:px-2 xl:py-5">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div className="flex flex-row gap-x-3 items-center justify-center">
              <p className=" text-gray-700">
                Showing
                <span className="font-medium px-1">1</span>
                to
                <span className="font-medium px-1">{row}</span>
                of
                <span className="font-medium px-1">{totalRows}</span>
                results
              </p>

              <select
                name="limit"
                value={row}
                onChange={(e) => setRows(parseInt(e.target.value))}
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
                    pageCount={totalPage}
                    onPageChange={changePage}
                    containerClassName={
                      "isolate inline-flex -space-x-px rounded-md shadow-sm "
                    }
                    activeClassName={"bg-orange-600 text-white focus:z-20"}
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
      <AddUsers isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
