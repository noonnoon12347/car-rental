"use client";
import { useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";

export default function CustomerPage() {
  useAuth();
  const [form, setForm] = useState({
    customerId: "",
    name: "",
    address: "",
    mobile: "",
  });

  const [customers, setCustomers] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!form.name) return;

    const payload = {
      customer_id: form.customerId,
      customer_name: form.name,
      customer_address: form.address,
      customer_mobile: form.mobile,
    };

    await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchCustomers();
    handleCancel();
  };

  const fetchCustomers = async () => {
    const res = await fetch("/api/customers");
    const data = await res.json();

    const mapped = data.map((customer) => ({
      id: customer.customer_id,
      name: customer.customer_name,
      address: customer.customer_address,
      mobile: customer.customer_mobile,
    }));

    setCustomers(mapped);
  };

  const handleCancel = () => {
    setForm({ customerId: "", name: "", address: "", mobile: "" });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 px-10">
      {/* LEFT: FORM */}
      <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer</h2>

        <div className="space-y-4">
          <Field label="Customer ID">
            <input
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </Field>

          <Field label="Customer Name">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </Field>

          <Field label="Address">
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </Field>

          <Field label="Mobile">
            <input
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </Field>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAdd}
              className="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-sm hover:bg-blue-600 active:bg-blue-700 transition"
            >
              Add
            </button>

            <button
              onClick={() =>
                setForm({ customerId: "", name: "", address: "", mobile: "" })
              }
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: TABLE */}
      <div className="bg-white shadow-sm rounded-xl p-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-3 py-2 text-left font-medium">CustomerID</th>
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Address</th>
                <th className="px-3 py-2 text-left font-medium">Mobile</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-700">{c.id}</td>
                  <td className="px-3 py-2 text-gray-700">{c.name}</td>
                  <td className="px-3 py-2 text-gray-700">{c.address}</td>
                  <td className="px-3 py-2 text-gray-700">{c.mobile}</td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-gray-400"
                  >
                    No customers added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
