"use client";
import React, { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setSubmitted(false);

    fetch("/api/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, feedback }),
    })
      .then(async (res) => {
        if (res.ok) {
          setSubmitted(true);
        } else {
          const data = await res.json();
          setErrorMsg(data.error ? data.error : "Failed to submit feedback. Try again.");
        }
      })
      .catch(() => {
        setErrorMsg("Network error. Please try again.");
      });
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Beautiful static gradient background + blur */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black filter blur-xl opacity-80" />
      <div className="absolute top-24 left-32 w-72 h-72 bg-purple-600 opacity-30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-16 right-20 w-60 h-60 bg-blue-700 opacity-30 rounded-full filter blur-3xl"></div>
      {/* Card content */}
      <div className="relative z-10 rounded-3xl shadow-2xl bg-zinc-900 px-8 py-10 w-full max-w-lg flex flex-col items-center border border-zinc-700">
        <h1 className="text-4xl font-extrabold mb-4 text-white tracking-tight">Feedback Form</h1>
        <p className="text-zinc-400 mb-6 text-center font-medium">
          Share your thoughts — help us build better experiences!
        </p>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
            disabled={submitted}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            required
            disabled={submitted}
          />
          <textarea
            name="feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 h-32 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-base"
            required
            disabled={submitted}
          ></textarea>
          <button
            type="submit"
            className={`bg-gradient-to-tr from-purple-700 to-blue-500 hover:from-blue-700 hover:to-purple-800 text-white py-2 px-6 rounded-lg font-semibold shadow-lg transition-all text-lg ${submitted ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={submitted}
          >
            Submit Feedback
          </button>
        </form>
        {submitted && (
          <div className="mt-6 px-4 py-3 bg-green-700/90 text-green-200 rounded-lg font-bold transition animate-bounce">
            Thank you for your feedback!
          </div>
        )}
        {errorMsg && (
          <div className="mt-6 px-4 py-3 bg-red-900/90 text-red-200 rounded-lg font-bold">
            {errorMsg}
          </div>
        )}
      </div>
    </main>
  );
}

// trigger redeploy
