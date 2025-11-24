"use client";
import { useState, useEffect } from "react";

export default function CarRegistrationPage() {
  const [form, setForm] = useState({
    carNo: "",
    make: "",
    model: "",
    rentFee: "",
    available: "Yes",
  });
  const [selectedCarId, setSelectedCarId] = useState(null);

  const [cars, setCars] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    if (!form.carNo || !form.make || !form.model) return;

    const payload = {
      car_reg_no: form.carNo,
      car_make: form.make,
      car_model: form.model,
      car_rent_fee: Number(form.rentFee),
      car_availability_status: form.available === "Yes" ? true : false,
    };

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    await fetchCars();

    setForm({ carNo: "", make: "", model: "", rentFee: "", available: "Yes" });
  };

  const fetchCars = async () => {
    const res = await fetch("/api/cars");
    const data = await res.json();

    const mapped = data.map((item) => ({
      id: item.id,
      carNo: item.car_reg_no,
      make: item.car_make,
      model: item.car_model,
      rentFee: item.rent_fee,
      available: item.availability === true ? "Yes" : "No",
    }));

    setCars(mapped);
  };

  const handleEdit = async () => {
    if (!selectedCarId) return alert("Please select a car to edit");

    const payload = {
      car_reg_no: form.carNo,
      car_make: form.make,
      car_model: form.model,
      rent_fee: Number(form.rentFee),
      availability: form.available,
    };

    const res = await fetch(`/api/cars/${selectedCarId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchCars();
  };

  const handleDelete = async () => {
    if (!selectedCarId) return alert("Please select a car to delete");

    await fetch(`/api/cars/${selectedCarId}`, {
      method: "DELETE",
    });

    setSelectedCarId(null);
    setForm({ carNo: "", make: "", model: "", rentFee: "", available: "Yes" });
    await fetchCars();
  };

  const handleCancel = () => {
    setSelectedCarId(null);

    setForm({
      carNo: "",
      make: "",
      model: "",
      rentFee: "",
      available: "Yes",
    });
  };

  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 px-10">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Car Registration
        </h2>

        <div className="space-y-4">
          <Input
            label="Car Reg No"
            name="carNo"
            value={form.carNo}
            onChange={handleChange}
          />
          <Input
            label="Make"
            name="make"
            value={form.make}
            onChange={handleChange}
          />
          <Input
            label="Model"
            name="model"
            value={form.model}
            onChange={handleChange}
          />
          <Input
            label="Rent Fee"
            name="rentFee"
            value={form.rentFee}
            onChange={handleChange}
          />

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Available
            </label>
            <select
              name="available"
              value={form.available}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              disabled={selectedCarId}
              className={`px-4 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 active:bg-blue-700 transition ${
                selectedCarId ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleAdd}
            >
              Add
            </button>

            <button
              disabled={!selectedCarId}
              className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow-md hover:bg-gray-300 transition ${
                !selectedCarId ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              disabled={!selectedCarId}
              className={`px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow-md hover:bg-gray-300 transition ${
                !selectedCarId ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleDelete}
            >
              Delete
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 shadow-md hover:bg-gray-200 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Car List</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-3 py-2 font-medium">CarRegNo</th>
              <th className="px-3 py-2 font-medium">Make</th>
              <th className="px-3 py-2 font-medium">Model</th>
              <th className="px-3 py-2 font-medium">Rent Fee</th>
              <th className="px-3 py-2 font-medium">Available</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedCarId(car.id);

                  setForm({
                    carNo: car.carNo,
                    make: car.make,
                    model: car.model,
                    rentFee: car.rentFee,
                    available: car.available,
                  });
                }}
              >
                <td className="px-3 py-2 text-gray-700">{car.carNo}</td>
                <td className="px-3 py-2 text-gray-700">{car.make}</td>
                <td className="px-3 py-2 text-gray-700">{car.model}</td>
                <td className="px-3 py-2 text-gray-700">{car.rentFee}</td>
                <td className="px-3 py-2 text-gray-700">{car.available}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block font-medium mb-1 text-gray-700">{label}</label>
      <input
        {...props}
        className="w-full rounded-md px-3 py-2 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
      />
    </div>
  );
}
