"use client";
import { useState } from "react";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-25 right-6 z-50 w-[360px] h-[520px] bg-white rounded-2xl shadow-xl  flex flex-col overflow-hidden">
          <div className="h-12 px-4 flex items-center justify-between">
            <p className="font-semibold">Service</p>
            <button
              onClick={() => setOpen(false)}
              className="text-sm hover:cursor-pointer"
            >
              ปิด
            </button>
          </div>
          <ChatBox />
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg bg-black text-white flex items-center justify-center hover:cursor-pointer"
        aria-label="Open chat"
      >
        💬
      </button>
    </>
  );
}
