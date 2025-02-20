import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function Header() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center">
            <button
              className="flex items-center gap-1 font-semibold border rounded p-1"
              onClick={handleLogout}
            >
              Logout
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
