"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;
    if (user.app_metadata?.role === "admin") {
      localStorage.setItem("userRole", "admin");
      window.location.href = "/";
    } else if (user.app_metadata?.role === "customer") {
      const res = await fetch(`/api/customers/${user.id}`);
      const customerData = await res.json();

      if (!customerData.error) {
        localStorage.setItem("userRole", "customer");
        const profile = {
          id: customerData.id,
          customer_id: customerData.customer_id,
          name: customerData.customer_name,
          mobile: customerData.customer_mobile,
          address: customerData.customer_address,
          img: customerData.img_url,
        };

        localStorage.setItem("userProfile", JSON.stringify(profile));
        window.location.href = "/my-rentals";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center  pt-10 bg-gray-100">
      <div className="flex justify-center">
        <img
          src="https://jdmlaipjljktmgvsxgxb.supabase.co/storage/v1/object/public/cars/weblogo.png"
          alt="Girl in a jacket"
          className="h-60 w-auto"
        />
      </div>
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Car Rental Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setForm({ email: "", password: "" })}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
