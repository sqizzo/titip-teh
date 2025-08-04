import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, ShieldUser } from "lucide-react";
import { useToast } from "../../context/ToastContext";

import { approveUser, fetchUsers, rejectUser } from "../../api/usersApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchUsers(token);
      setUsers(res.data.users);
    } catch (err) {
      showToast({
        type: "fail",
        title: "Gagal ambil data user",
        message: err.response?.data?.message || "Terjadi kesalahan.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  // Approve user
  const handleApprove = async (id) => {
    try {
      await approveUser(token, id);
      showToast({
        type: "success",
        title: "User di-approve",
        message: "User berhasil di-approve.",
      });
      getUsers();
    } catch (err) {
      showToast({
        type: "fail",
        title: "Gagal approve user",
        message: err.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  // Delete user
  const handleReject = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await rejectUser(token, id);
      showToast({
        type: "success",
        title: "User dihapus",
        message: "User berhasil dihapus.",
      });
      getUsers();
    } catch (err) {
      showToast({
        type: "fail",
        title: "Gagal hapus user",
        message: err.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div className="canvas-base gap-8 !pb-32">
      {/* User Table */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="page-title">Daftar User</h1>
          <p className="page-subtitle">
            Approve atau hapus user sesuai kebutuhan
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full rounded-md bg-white shadow">
            <thead>
              <tr className="bg-slate-100 ">
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Nama
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Role
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400">
                    Tidak ada user.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className=" hover:bg-slate-50 transition">
                    <td className="p-2 text-sm font-semibold">{u.name}</td>
                    <td className="p-2 text-sm">{u.email}</td>
                    <td className="p-2 text-sm capitalize">{u.role}</td>
                    <td className="p-2 text-sm capitalize">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          u.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-2 flex gap-2">
                      {u.status !== "approved" && (
                        <>
                          <button
                            className="bg-indigo-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition"
                            onClick={() => handleApprove(u.id)}
                          >
                            <Check size={16} /> Approve
                          </button>
                          <button
                            className="bg-indigo-500 text-white px-2 py-1 text-xs rounded flex items-center gap-1 transition"
                            onClick={() => handleReject(u.id)}
                          >
                            <X size={16} /> Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
