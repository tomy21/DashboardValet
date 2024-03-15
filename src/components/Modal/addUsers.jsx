import React, { useState } from "react";
import axios from "axios";
import SuccessSubmit from "./successSubmit";

const AddUsers = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState(0);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/registerUser",
        {
          roleId: role,
          name: name,
          gender: gender,
          userName: userName,
          email: email,
          handphone: handphone,
          locationCode: location,
        }
      );

      if (response.status !== 200) {
        console.log("Error Insert Data", response.message);
      } else {
        setShowSuccess(true);
        setUserName("");
        setName("");
        setEmail("");
        setHandphone("");
        setGender("");
        setLocation("");
        onClose();
      }
    } catch (err) {
      console.log("Error Insert Data", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 flex items-start justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg max-w-md w-full top-12 p-8">
          <div className="flex justify-between items-center mb-4 border-b-2 pb-4 border-slate-300">
            <h1 className="text-xl font-semibold">Add User</h1>
            <button
              className="hover:text-gray-800 hover:bg-red-400 bg-red-600 rounded-md text-white px-2 py-1"
              onClick={onClose}
            >
              X
            </button>
          </div>

          <form onSubmit={handleSubmit} className="text-xs max-w-md mx-auto">
            <div className="flex flex-col mb-2">
              <label htmlFor="userName" className="mb-1">
                User Name <span className="text-red-600 font-semibold">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border border-gray-300 rounded-sm p-2"
                placeholder="Input Username"
                required
                autoFocus
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="name" className="mb-1">
                Name <span className="text-red-600 font-semibold">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-sm p-2"
                placeholder="Input Name"
                required
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="name" className="mb-1">
                Locations <span className="text-red-600 font-semibold">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-gray-300 rounded-sm p-2"
                placeholder="Input Location"
                required
              />
            </div>

            <div className="flex flex-col mb-1 w-full">
              <label htmlFor="email" className="mb-1">
                Email <span className="text-red-600 font-semibold">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-sm p-2 w-full"
                placeholder="Input Email"
                required
              />
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex flex-col mb-1 w-full">
                <label htmlFor="handphone" className="mb-1">
                  No. Handphone{" "}
                  <span className="text-red-600 font-semibold">*</span>
                </label>
                <input
                  type="text"
                  id="handphone"
                  name="handphone"
                  value={handphone}
                  onChange={(e) => setHandphone(e.target.value)}
                  className="border border-gray-300 rounded-sm p-2 w-full"
                  placeholder="Input No Handphone"
                  required
                />
              </div>

              <div className="flex flex-col mb-1 justify-start items-start w-full">
                <label htmlFor="gender" className="mb-1">
                  Gender <span className="text-red-600 font-semibold">*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border border-gray-300 rounded-sm p-2 w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <div className="flex flex-col mb-1 w-full">
                <label htmlFor="role" className="mb-1">
                  Role <span className="text-red-600 font-semibold">*</span>
                </label>
                <select
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-300 rounded-sm p-2 w-full"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="5">Admin</option>
                  <option value="13">Petugas Valet</option>
                </select>
              </div>

              <div className="flex flex-col mb-3 justify-start items-start w-full">
                <label htmlFor="foto" className="block mb-1">
                  Foto
                </label>
                <input
                  name="foto"
                  id="foto"
                  type="file"
                  className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  accept=".png,.jpg,.jpeg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 float-end text-white py-2 px-4 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <div>
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Add User"
              )}
            </button>
          </form>
        </div>
        {showSuccess && <SuccessSubmit onClose={() => setShowSuccess(true)} />}
      </div>
    </div>
  );
};

export default AddUsers;
