import { User } from "lucide-react";
import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="canvas-base !pb-32">
      <div className="bg-white/75 rounded-md py-12 min-h-fit shadow-lg/5 flex flex-col items-center">
        <div className="size-28 rounded-full bg-indigo-400 border-4 border-indigo-500 flex justify-center items-center text-white mb-4">
          {" "}
          <User size={46} />
        </div>
        <div className="flex flex-col text-center">
          <p className="text-xl font-medium">{user.name}</p>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>
        <a
          href="profile/edit"
          className="rounded-md bg-indigo-500 px-4 py-2 mt-6 text-white text-sm font-semibold"
        >
          Edit Akun
        </a>
      </div>
    </div>
  );
};

export default Profile;
