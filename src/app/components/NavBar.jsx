"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/login");
  };

  return (
    <nav className="w-full bg-primary text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold hover:opacity-90">
          Car Rental System
        </a>

        <div className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-gray-200">
            Car Register
          </a>
          <a href="/customers" className="hover:text-gray-200">
            Customer
          </a>
          <a href="/rental" className="hover:text-gray-200">
            Rental
          </a>
          <a href="/return" className="hover:text-gray-200">
            Return
          </a>

          <button onClick={handleLogout} className="hover:text-gray-200">
            Login/Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
