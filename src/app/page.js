"use client";
import { useState, useEffect } from "react";
import useAuth from "@/hook/useAuth";
import ImageUpload from "./components/ImageUpload";
import { uploadImage } from "@/lib/uploadImage";
import { deleteImage } from "@/lib/deleteImage";

export default function CarRegistrationPage() {
  const { loading } = useAuth("admin");
  const [form, setForm] = useState({
    carNo: "",
    make: "",
    model: "",
    rentFee: "",
    available: "Yes",
    image: null,
    imagePath: null,
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

    let imageUrl = null;
    let imagePath = null;

    if (form.image instanceof File) {
      const uploaded = await uploadImage(form.image, "cars");
      imageUrl = uploaded.url;
      imagePath = uploaded.path;
    }

    const payload = {
      car_reg_no: form.carNo,
      car_make: form.make,
      car_model: form.model,
      car_rent_fee: Number(form.rentFee),
      car_availability_status: form.available === "Yes",
      img_url: imageUrl,
      img_path: imagePath,
    };

    const res = await fetch("/api/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchCars();
    setForm({
      carNo: "",
      make: "",
      model: "",
      rentFee: "",
      available: "Yes",
      image: null,
      imagePath: null,
    });
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
      imgURL: item.img_url || null,
      imgPath: item.img_path || null,
    }));

    setCars(mapped);
  };

  const handleEdit = async () => {
    if (!selectedCarId) return alert("Please select a car to edit");

    let imageUrl = form.image;
    let imagePath = form.imagePath;

    if (form.image instanceof File) {
      const deleteOldImg = await deleteImage(form.imagePath, "cars");

      const uploaded = await uploadImage(form.image, "cars");
      imageUrl = uploaded.url;
      imagePath = uploaded.path;
    }

    const payload = {
      car_reg_no: form.carNo,
      car_make: form.make,
      car_model: form.model,
      car_rent_fee: Number(form.rentFee),
      car_availability_status: form.available === "Yes",
      img_url: imageUrl,
      img_path: imagePath,
    };

    const res = await fetch(`/api/cars/${selectedCarId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    await fetchCars();
    setForm({
      carNo: "",
      make: "",
      model: "",
      rentFee: "",
      available: "Yes",
      image: null,
      imagePath: null,
    });
  };

  const handleDelete = async () => {
    if (!selectedCarId) return alert("Please select a car to delete");

    if (form.imagePath) {
      await deleteImage(form.imagePath, "cars");
    }

    await fetch(`/api/cars/${selectedCarId}`, {
      method: "DELETE",
    });

    setSelectedCarId(null);
    setForm({
      carNo: "",
      make: "",
      model: "",
      rentFee: "",
      available: "Yes",
      image: null,
      imagePath: null,
    });
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
      image: null,
      imagePath: null,
    });
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 px-10">
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Car Registration
        </h2>

        <div className="space-y-4">
          <ImageUpload
            label="Car Image"
            value={form.image}
            onChange={(file) => setForm({ ...form, image: file })}
            page="car"
          />

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
              <th className="px-3 py-2 font-medium">Image</th>
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
                    image: car.imgURL,
                    imagePath: car.imgPath,
                  });
                }}
              >
                <td className="px-3 py-2 text-gray-700">
                  <img
                    src={
                      car.imgURL ||
                      "https://jdmlaipjljktmgvsxgxb.supabase.co/storage/v1/object/public/cars/default.png"
                    }
                    className="w-20 h-10 object-cover rounded-md"
                  />
                </td>
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
