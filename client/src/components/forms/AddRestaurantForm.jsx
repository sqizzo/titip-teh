import React, { useState } from "react";
import { Building2, Phone, MapPin } from "lucide-react";

const AddRestaurantForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !formData.name ? "Nama restoran wajib diisi." : "",
      contact: !formData.contact ? "Kontak restoran wajib diisi." : "",
      address: !formData.address ? "Alamat restoran wajib diisi." : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (hasError) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col gap-8">
        {/* Nama Restoran */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-bold">
            Nama Restoran
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <Building2 size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              id="name"
              placeholder="Contoh: Warung Titip Teh"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.name && (
            <span className="text-xs text-red-400">{errors.name}</span>
          )}
        </div>

        {/* Kontak Restoran */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contact" className="text-md font-bold">
            Kontak Restoran
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <Phone size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              id="contact"
              placeholder="0812xxxxxxx"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.contact && (
            <span className="text-xs text-red-400">{errors.contact}</span>
          )}
        </div>

        {/* Alamat Restoran */}
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-md font-bold">
            Alamat Restoran
          </label>
          <div className="relative flex border-transparent">
            <div className="absolute top-0 left-0 bg-slate-200/50 rounded-l-md h-full w-12 flex justify-center items-center">
              <MapPin size={16} className="text-slate-600/50 z-3" />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              id="address"
              placeholder="Jl. Contoh No. 123"
              className="pl-15 py-3 grow text-sm rounded-md border-slate-200 border-1 focus:outline-none focus:border-indigo-400 z-2"
              onChange={handleChange}
            />
          </div>
          {errors.address && (
            <span className="text-xs text-red-400">{errors.address}</span>
          )}
        </div>

        {/* Tombol Submit */}
        <div className="flex flex-col gap-4 items-center">
          <button
            type="submit"
            className="px-4 py-3 mt-6 text-white bg-indigo-500 rounded-md font-semibold text-md cursor-pointer w-full hover:shadow-md hover:shadow-indigo-400/30 transition-all"
          >
            Tambah Restoran
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddRestaurantForm;
