import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaUserMinus, FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      //   console.log({ res });
      return res.data;
    },
  });
  // =================== add admin handle ==================
  const hanleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Add Admin",
      text: `Are you sure you want to make ${user.displayName} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Success!",
              text: `${user.displayName} is now an admin.`,
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          console.error("Make admin error:", error);
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to make admin.",
            icon: "error",
          });
        }
      }
    });
  };

  //   ============ remove admin handle ============
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Remove Admin",
      text: `Are you sure you want to remove Admin role from ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Success!",
              text: `${user.displayName} is no longer an admin.`,
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          console.error("Remove admin error:", error);
          Swal.fire({
            title: "Error!",
            text: error.response?.data?.message || "Failed to remove admin.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary font-bold ">
        Manage Users ( {users.length} )
      </h1>
      <span className="divider"></span>
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search User"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Admin Action</th>
              <th>Others Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>
                  <label>{index + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  <span className="badge badge-ghost badge-sm">
                    {user.role}
                  </span>
                </td>
                <th className=" space-x-3">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn btn-sm bg-warning"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => hanleMakeAdmin(user)}
                      className="btn btn-sm btn-success"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </th>
                <th>
                  <button className="btn btn-accent btn-xs">
                    <FaEye />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
