import {
  Home,
  Users,
  Settings,
  BotMessageSquare,
  LibraryBig,
  LayoutGrid,
} from "lucide-react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home, onylAdmin: true },
  { name: "Users", href: "/dashboard/users", icon: Users, onylAdmin: true },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    onylAdmin: true,
  },
  {
    name: "AI Chat",
    href: "/dashboard/ai-chat",
    icon: BotMessageSquare,
    onylAdmin: true,
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: LibraryBig,
    onylAdmin: false,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: LayoutGrid,
    onylAdmin: false,
  },
];

export function Sidebar() {
  const [role, setRole] = useState("user");

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const user = auth.currentUser;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setRole(userData.role);
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map(
          (item) =>
            ((role === "admin" && item.onylAdmin) || !item.onylAdmin) && (
              <Link
                to={item.href}
                key={item.name}
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
              >
                {item.icon && (
                  <item.icon className="inline-block mr-2 h-5 w-5" />
                )}
                {item.name}
              </Link>
            )
        )}
      </nav>
    </div>
  );
}
