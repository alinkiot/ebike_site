"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Registration failed.");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-2xl font-bold tracking-widest uppercase">DERUIZ</Link>
          <p className="mt-3 text-sm text-gray-500">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Name</label>
            <input name="name" type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Email</label>
            <input name="email" type="email" required className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Password</label>
            <input name="password" type="password" required minLength={8} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors" placeholder="Min. 8 characters" />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-yellow-400 text-black py-4 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors disabled:opacity-50">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-semibold hover:opacity-70">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
