"use client";
import { useState } from "react";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // เก็บประวัติแชตเป็น messages แบบ OpenAI
  const [messages, setMessages] = useState([
    { role: "assistant", content: "สวัสดี! อยากให้ช่วยอะไรดี 😊" },
  ]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // ส่งเฉพาะ user/assistant ไม่ส่ง system
          messages: nextMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Request failed");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "ขอโทษนะ ตอนนี้ระบบมีปัญหานิดหน่อย ลองใหม่อีกครั้งได้ไหม",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
              m.role === "user"
                ? "ml-auto bg-black text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 text-gray-500 rounded-2xl px-3 py-2 text-sm w-fit">
            กำลังพิมพ์...
          </div>
        )}
      </div>

      <div className="p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 mx-1 border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={send}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-black text-white text-sm disabled:opacity-50"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}
