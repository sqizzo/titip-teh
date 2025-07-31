import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRestaurants, deleteRestaurant } from "../../../api/restaurantApi";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "../../../context/ToastContext";

const Restaurants = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getRestaurants = async () => {
    setLoading(true);
    try {
      const res = await fetchRestaurants(token);
      setRestaurants(res.data.restaurant || []);
    } catch (err) {
      showToast({
        type: "fail",
        title: "Gagal ambil data restoran",
        message: err.response?.data?.message || "Terjadi kesalahan.",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus restoran ini?")) return;
    try {
      await deleteRestaurant(token, id);
      showToast({
        type: "success",
        title: "Restoran dihapus",
        message: "Restoran berhasil dihapus.",
      });
      getRestaurants();
    } catch (err) {
      showToast({
        type: "fail",
        title: "Gagal hapus restoran",
        message: err.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div className="canvas-base !pb-32 gap-8">
      <div>
        <h1 className="page-title">Daftar Restoran</h1>
        <p className="page-subtitle">
          Kelola, edit, atau hapus restoran di sini
        </p>
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <button
          onClick={() => navigate("/admin/restaurants/add")}
          className="w-full p-8 rounded-md bg-indigo-500 hover:brightness-75 transition-all text-left"
        >
          <h2 className="text-2xl text-white font-bold">Tambah Restoran</h2>
          <p className="text-sm text-white">Tambah restoran baru ke sistem</p>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-md bg-white shadow">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Nama
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Kontak
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Alamat
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-400">
                  Loading...
                </td>
              </tr>
            ) : restaurants.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-400">
                  Tidak ada restoran.
                </td>
              </tr>
            ) : (
              restaurants.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50 transition">
                  <td className="p-2 text-sm font-semibold text-center">
                    {r.name}
                  </td>
                  <td className="p-2 text-sm text-center">{r.contact}</td>
                  <td className="p-2 text-sm text-center">{r.address}</td>
                  <td className="p-2 flex gap-2 justify-center">
                    <button
                      className="bg-indigo-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition"
                      onClick={() =>
                        navigate(`/admin/restaurants/edit/${r._id}`)
                      }
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition"
                      onClick={() => handleDelete(r._id)}
                    >
                      <Trash2 size={16} /> Hapus
                    </button>
                    <button
                      className="bg-slate-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1 transition"
                      onClick={() =>
                        navigate(`/admin/restaurants/detail/${r._id}`)
                      }
                    >
                      <Eye size={16} /> Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Restaurants;
