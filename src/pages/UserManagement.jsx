import React from "react";
import TableUsers from "../components/TableUsers";
import Navbar from "../components/Navbar";

export default function UserManagement() {
  return (
    <div>
      <Navbar />
      <div className="container m-auto py-3">
        <TableUsers />
      </div>
    </div>
  );
}
