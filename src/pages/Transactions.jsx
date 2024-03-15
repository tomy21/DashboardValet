import React from "react";
import TableTransaction from "../components/TableTransaction";
import Navbar from "../components/Navbar";

export default function Transactions() {
  return (
    <>
      <Navbar />
      <div className="container m-auto mt-3">
        <TableTransaction />
      </div>
    </>
  );
}
