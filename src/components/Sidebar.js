import { Home, Users, Settings, BotMessageSquare, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "AI Chat", href: "/dashboard/ai-chat", icon: BotMessageSquare },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },

];

export function Sidebar() {
  const [role, setRole] = useState("user");

  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch user role from Supabase
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching role:", error);
      return;
    }

    if (data) {
      setRole(data.role);
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
