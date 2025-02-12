import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-start p-10">
      <h2 className="text-5xl font-bold mb-10">Welcome to the Dashboard</h2>
      <div className="flex gap-5">
        <Link to={"/new-project"}>
          <div className="border h-[300px] w-[200px] rounded shadow-md hover:shadow-xl transition duration-200 ease-in-out flex flex-col">
            <div className="h-full flex items-center justify-center">
              <span className="opacity-20 font-bold text-xl">image</span>
            </div>
            <div className="h-[80px] border-t-2 flex items-center justify-center">
              <span className="text-xl text-center font-semibold">
                Rock Paper Siccors Game
              </span>
            </div>
          </div>
        </Link>
        <Link to={"/new-project"}>
          <div className="border h-[300px] w-[200px] rounded shadow-md hover:shadow-xl transition duration-200 ease-in-out flex flex-col">
            <div className="h-full flex items-center justify-center">
              <span className="opacity-20 font-bold text-xl">image</span>
            </div>
            <div className="h-[80px] border-t-2 flex items-center justify-center">
              <span className="text-xl text-center font-semibold">
                Rock Paper Siccors Game
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
