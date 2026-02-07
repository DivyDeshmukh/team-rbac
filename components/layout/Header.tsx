"use client";

import { User } from "@/lib/shared/types";
import { useAuth } from "@/store/Provider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const navigation = [
    { name: "Home", href: "/", show: true },
    { name: "Dashboard", href: "/dashboard", show: true },
  ].filter((item) => item.show);

  const getNavItemClass = (href: string) => {
    let isActive = false;
    if (href === "/") {
      isActive = pathname === "/";
    } else if (href === "/dashboard") {
      isActive = pathname.startsWith(href);
    }

    return `px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;
  };

  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-white">
            TeamAccess
          </Link>
          {/* Navigation */}
          {user && (
            <nav className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={getNavItemClass(item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* User Info */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-bold text-[#09DF72]">{user.name.charAt(0).toUpperCase()}{user.name.slice(1)} ({user.role})</span>
                <button
                  onClick={logout}
                  className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-slate-300 text-sm hover:bg-slate-500 hover:text-white rounded transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="ml-4 px-3 py-2 bg-blue-600 text-white text-sm rounded-hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
