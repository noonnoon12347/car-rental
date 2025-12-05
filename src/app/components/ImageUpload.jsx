"use client";
import { useState, useEffect } from "react";

export default function ImageUpload({ label, value, onChange, page }) {
  const [preview, setPreview] = useState(value ? value : null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const clearImage = () => {
    setPreview(null);
    onChange(null);
  };

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
    } else if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);
  if (page === "car") {
    return (
      <div>
        <label className="block mb-1 font-medium text-gray-700">{label}</label>

        {preview ? (
          <div className="w-full h-full relative rounded-lg overflow-hidden">
            <img src={preview} className="w- h-full object-cover" />
            <button
              onClick={clearImage}
              className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs shadow"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="file-upload"
              className="w-full h-50 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="text-3xl text-gray-400">+</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="file-upload"
            />
          </>
        )}
      </div>
    );
  }
  if (page === "customer") {
    return (
      <div>
        <label className="block mb-1 font-medium text-gray-700">{label}</label>

        {preview ? (
          <div className="w-25 h-25 relative rounded-lg overflow-hidden">
            <img src={preview} className="w- h-full object-cover" />
            <button
              onClick={clearImage}
              className="absolute top-1 right-1 bg-white rounded-full px-2 py-1 text-xs shadow"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <label
              htmlFor="file-upload"
              className="w-25 h-25 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="text-3xl text-gray-400">+</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
              id="file-upload"
            />
          </>
        )}
      </div>
    );
  }
}
