import React from "react";

const Admin = () => {
  return (
    <div className="canvas-base !pb-28 gap-8">
      <div>
        <h1 className="page-title">Admin Panel</h1>
        <p className="page-subtitle">Kelola order sebagai admin di sini!</p>
      </div>
      <div className="flex flex-col gap-2">
        <a
          href="admin/orders/today"
          className="w-full p-8 rounded-md bg-indigo-500 hover:brightness-75 transition-all"
        >
          <h2 className="text-2xl text-white font-bold">Order Hari Ini</h2>
          <p className="text-sm text-white">Kelola order hari ini</p>
        </a>
        <a
          href="admin/restaurants"
          className="w-full p-8 rounded-md bg-indigo-500 hover:brightness-75 transition-all"
        >
          <h2 className="text-2xl text-white font-bold">Restoran</h2>
          <p className="text-sm text-white">Kelola restoran disini</p>
        </a>
        <a
          href="admin/menus"
          className="w-full p-8 rounded-md bg-indigo-500 hover:brightness-75 transition-all"
        >
          <h2 className="text-2xl text-white font-bold">Menu</h2>
          <p className="text-sm text-white">Kelola menu disini</p>
        </a>
        <a
          href="admin/users"
          className="w-full p-8 rounded-md bg-indigo-500 hover:brightness-75 transition-all"
        >
          <h2 className="text-2xl text-white font-bold">User</h2>
          <p className="text-sm text-white">Kelola user disini</p>
        </a>
      </div>
    </div>
  );
};

export default Admin;
