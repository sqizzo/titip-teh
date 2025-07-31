import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import AddRestaurantForm from "../../../components/forms/AddRestaurantForm";
import { addRestaurant } from "../../../api/restaurantApi";

const AddRestaurant = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const token = localStorage.getItem("token");

  const handleAddRestaurant = async (formData) => {
    try {
      await addRestaurant(token, formData);
      showToast({
        type: "success",
        title: "Restoran Berhasil Ditambah",
        message: "Restoran baru sudah ditambahkan!",
      });
      navigate("/admin/restaurants");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Terjadi kesalahan saat menambah restoran.";
      showToast({
        type: "fail",
        title: "Gagal tambah restoran",
        message: msg,
      });
    }
  };

  return (
    <div className="canvas-base gap-12 !pb-32">
      {/* Navigation */}
      <button
        className="cursor-pointer text-slate-600/50 bg-slate-200/50 rounded-full w-fit p-2"
        onClick={() => navigate("/admin/restaurants")}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Greeting */}
      <div className="flex gap-4 flex-col text-center items-center">
        <h1 className="page-title">Tambah Restoran Baru</h1>
        <p className="page-subtitle w-xs text-sm text-center">
          Isi data di bawah untuk menambah restoran baru ke sistem!
        </p>
      </div>

      {/* Form */}
      <AddRestaurantForm onSubmit={handleAddRestaurant} />
    </div>
  );
};

export default AddRestaurant;
