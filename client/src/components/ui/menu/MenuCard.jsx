import React from "react";
import { Ham, Plus, CupSoda } from "lucide-react";

const MenuCard = ({ id, menuType, name, restaurantName, price }) => {
  return (
    <a
      key={id}
      href={`/menus/${id}`}
      className="flex flex-col p-3 bg-white rounded-md shadow-sm items-center w-full"
    >
      <div className="bg-indigo-100 rounded-lg flex justify-center items-center p-4 w-full aspect-square">
        {menuType === "makanan" ? (
          <Ham size={64} className="text-indigo-400" />
        ) : (
          <CupSoda size={64} className="text-indigo-400" />
        )}
      </div>
      {/* Info */}
      <div className="flex flex-col items-center w-full text-center mt-2">
        <span className="font-semibold text-base text-gray-800 truncate w-full">
          {name}
        </span>
        <span className="text-sm text-gray-600">{restaurantName}</span>
        <span className="text-sm text-gray-600">
          Rp. {price?.toLocaleString("id-ID") ?? "N/A"}
        </span>
      </div>
      <button className="cursor-pointer bg-indigo-500 rounded-full size-8 flex items-center justify-center text-white shadow-md hover:bg-indigo-600 transition-colors duration-200 self-end">
        <Plus size={20} />
      </button>
    </a>
  );
};

export default MenuCard;
