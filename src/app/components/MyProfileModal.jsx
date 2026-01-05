"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";

export default function ProfileModal({ isOpen, onClose, profile }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative">
        {profile ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              {profile.img && (
                <img
                  src={profile.img}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border"
                />
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 font-bold">Name</label>
                <p className="text-lg text-gray-700  pb-1">{profile.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 font-bold">Tel</label>
                <p className="text-lg text-gray-700  pb-1">{profile.mobile}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400 font-bold">
                  Address
                </label>
                <p className="text-lg text-gray-700">{profile.address}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-8 bg-primary text-white py-2 rounded-xl hover:bg-opacity-90 transition"
            >
              Close
            </button>
          </>
        ) : (
          <p className="text-center text-red-500 p-10">ไม่พบข้อมูลโปรไฟล์</p>
        )}
      </div>
    </div>
  );
}
