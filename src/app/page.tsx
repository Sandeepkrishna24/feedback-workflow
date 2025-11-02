"use client";
import { useState } from "react";

export default function HRDashboard() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendFeedbackRequest = async () => {
    const email = prompt("Enter user's email to send feedback request:");
    if (!email) return;
    setLoading(true); setSent(false); setErrorMsg("");
    try {
      const res = await fetch("/api/send-feedback-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: email }),
      });
      setLoading(false);
      if (res.ok) setSent(true);
      else setErrorMsg("Failed to send feedback request. Please try again.");
    } catch {
      setLoading(false);
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#09090f] via-[#23234d] to-[#672ad4] overflow-hidden">
      {/* Creative Accent Shapes */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/40 via-blue-500/20 to-transparent blur-2xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-48 bg-blue-700/30 rounded-full blur-3xl transform -rotate-12 z-0"></div>
      <div className="absolute top-6 right-10 w-64 h-64 bg-pink-600/20 rounded-full blur-2xl opacity-80 z-0"></div>

      {/* Glassmorphic dashboard card */}
      <div className="relative z-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg ring-1 ring-inset ring-white/10 px-10 py-12 max-w-lg flex flex-col items-center border border-zinc-800">
        <div className="flex items-center gap-4 mb-2">
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
            <rect width="36" height="36" rx="12" fill="#8b5cf6" />
            <path d="M22.5 14.5V25M13.5 20.5V25M9 17l9-8 9 8M6 25h24" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="text-3xl font-extrabold text-white drop-shadow tracking-tight">
            HR Dashboard
          </h1>
        </div>
        <p className="text-zinc-100/90 mb-7 text-center font-medium text-lg">
          Instantly send feedback requests to users/clients with a single click.<br />
          <span className="text-blue-200/80 text-sm">(This view is private for HR only)</span>
        </p>

        <button
          onClick={handleSendFeedbackRequest}
          disabled={loading}
          className={`bg-gradient-to-tr from-fuchsia-600 via-purple-500 to-blue-500 hover:scale-105 transition-transform text-white shadow-lg px-8 py-3 rounded-2xl font-bold text-lg w-full mb-3 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Sending..." : "Send Feedback Request"}
        </button>

        {sent && (
          <div className="mt-3 px-4 py-3 bg-green-700/90 text-green-200 rounded-lg font-bold text-center animate-bounce shadow">
            Request sent successfully!
          </div>
        )}
        {errorMsg && (
          <div className="mt-3 px-4 py-3 bg-red-900/90 text-red-200 rounded-lg font-bold text-center shadow">
            {errorMsg}
          </div>
        )}

        <div className="flex flex-row gap-4 mt-8 text-base font-medium w-full justify-center">
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-white text-black px-5 font-semibold hover:bg-gray-200 transition-colors w-48"
            href="/feedback"
          >
            ↗ Go To Feedback Form
          </a>
        </div>
      </div>
    </main>
  );
}
