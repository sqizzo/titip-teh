import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

// API
import { fetchMenus } from "../api/menuApi";

// Components
import { Calendar, FileCheck2, ShieldUser } from "lucide-react";
import MenuCard from "../components/ui/menu/MenuCard";
import { PulseLoader } from "react-spinners";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const now = dayjs().format("DD MMM YYYY");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getMenus = async () => {
      try {
        setIsLoading(true);
        const res = await fetchMenus(token);
        setMenus(res.data.menus);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getMenus();
  }, []);

  return (
    <div className="canvas-base gap-8 !pb-32">
      {/* Greeting card */}
      <div className="w-full p-6 rounded-md bg-indigo-500 flex flex-wrap flex-col gap-4 shadow-lg shadow-indigo-600/30">
        <h1 className="text-2xl font-bold text-white">
          Halo, <span>{user.name ?? "Nama"}</span>!
        </h1>
        {/* Info */}
        <div className="flex gap-y-4 gap-x-6 flex-wrap">
          {/* Role */}
          <div className="flex items-center justify-center gap-4">
            {/* Icons */}
            <div className="flex items-center justify-center size-10 bg-white rounded-md text-indigo-500">
              <ShieldUser />
            </div>
            {/* Text Info */}
            <div className="flex flex-col justify-center gap-0 ">
              <span className="text-white font-medium text-sm">Role</span>
              <span className="text-white text-xs">
                {user.role[0].toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>
          {/* Total Order */}
          <div className="flex items-center justify-center gap-4">
            {/* Icons */}
            <div className="flex items-center justify-center size-10 bg-white rounded-md text-indigo-500">
              <FileCheck2 />
            </div>
            {/* Text Info */}
            <div className="flex flex-col justify-center gap-0 ">
              <span className="text-white font-medium text-sm">Jml Order</span>
              <span className="text-white text-xs">0</span>
            </div>
          </div>
          {/* Calendar */}
          <div className="flex items-center justify-center gap-4">
            {/* Icons */}
            <div className="flex items-center justify-center size-10 bg-white rounded-md text-indigo-500">
              <Calendar />
            </div>
            {/* Text Info */}
            <div className="flex flex-col justify-center gap-0 ">
              <span className="text-white font-medium text-sm">Today</span>
              <span className="text-white text-xs">{now}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="page-title">Mau Pesan Apa?</h1>
          <p className="page-subtitle">Ayo lihat menu yang mau kamu pesan</p>
        </div>
        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <MenuCard
                name={menu.name}
                key={menu._id}
                id={menu._id}
                restaurantName={menu.restaurant.name}
                price={menu.price}
                menuType={menu.menuType}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              {isLoading ? (
                <PulseLoader size={8} color="#4f39f6" />
              ) : (
                "Tidak Ada Menu"
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
