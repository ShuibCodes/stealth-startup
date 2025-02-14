import { Home, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            to={item.href}
            key={item.name}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            {item.icon && <item.icon className="inline-block mr-2 h-5 w-5" />}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
