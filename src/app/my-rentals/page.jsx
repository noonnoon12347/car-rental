"use client";
import { useEffect, useState } from "react";
import useAuth from "@/hook/useAuth";

export default function MyRentals() {
  const { loading } = useAuth("customer");
  const [allRentals, setAllRentals] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchRentals = async () => {
      const profile = JSON.parse(localStorage.getItem("userProfile"));
      if (profile?.id) {
        const res = await fetch(`/api/rentals/customer/${profile.id}`);
        const data = await res.json();
        setAllRentals(data);
      }
    };
    fetchRentals();
  }, []);

  // ฟังก์ชันกรองข้อมูลตาม Tab
  const filteredRentals = allRentals.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Rented")
      return item.rental_status === "Active" || item.rental_status === "Rented";
    if (activeTab === "Returned") return item.rental_status === "Returned";
    return true;
  });

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Rental History</h1>
        <div className="flex border-b border-gray-300 mb-6 gap-8">
          {["All", "Rented", "Returned"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredRentals.length > 0 ? (
            filteredRentals.map((item) => (
              <div
                key={item.rental_id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row ">
                  {/* รูปภาพรถ และ Badge สถานะ */}
                  <div className="relative w-full md:w-56 ">
                    <img
                      src={item.cars?.img_url}
                      className="w-full h-full  object-cover"
                      alt="Car"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm text-white ${
                        item.rental_status === "Rented"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.rental_status}
                    </div>
                  </div>

                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {item.cars?.car_reg_no}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">
                          Daily Fee: {item.rental_daily_fee} THB
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400  font-bold">
                          Total Amount
                        </p>
                        <p className="text-xl font-black text-primary">
                          ฿
                          {(
                            item.rental_total_amount + item.fine_amount
                          )?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Grid ข้อมูลวันที่ */}
                    <div className="grid grid-cols-2 gap-4 mt-4 py-3">
                      <div>
                        <p className="text-sm text-gray-400">Start Date</p>
                        <p className="text-sm font-semibold text-gray-600">
                          {item.rental_start_date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400  ">Return Date</p>
                        <p className="text-sm font-semibold text-gray-600">
                          {item.rental_due_date}
                        </p>
                      </div>
                    </div>

                    {/* ส่วนแจ้งเตือนค่าปรับ (ถ้ามี) */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-4">
                        {item.days_elapsed > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <span className="text-xs">
                              Late: {item.days_elapsed} Day
                            </span>
                          </div>
                        )}
                        {item.fine_amount > 0 && (
                          <div className="flex items-center gap-1 text-red-500">
                            <span className="text-xs">
                              Fine: ฿{item.fine_amount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
              <p className="text-gray-400 italic">
                No rental history found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
