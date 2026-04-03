"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        subject: form.get("subject"),
        message: form.get("message"),
      }),
    });
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Get in touch</p>
            <h1 className="text-4xl font-bold text-black mb-6">Contact Us</h1>
            <p className="text-gray-600 leading-relaxed mb-10">
              Have a question about our bikes? Want to schedule a test ride? Looking for dealer partnership opportunities? We&apos;d love to hear from you.
            </p>
            <div className="mt-8 space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-black mb-1">Business Hours</p>
                <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                <p>Sunday: 10:00 AM – 5:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-black mb-1">Email</p>
                <p>alinkiot@163.com</p>
              </div>
              <div>
                <p className="font-semibold text-black mb-1">Phone</p>
                <p>18668485654</p>
              </div>
              <div>
                <p className="font-semibold text-black mb-1">Address</p>
                <p>123 Electric Avenue<br />San Francisco, CA 94102</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-gray-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Name</label>
                    <input name="name" required type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Email</label>
                    <input name="email" required type="email" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Subject</label>
                  <input name="subject" type="text" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-2">Message</label>
                  <textarea name="message" required rows={5} className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none" placeholder="Tell us more..." />
                </div>
                <button type="submit" className="w-full bg-yellow-400 text-black py-4 text-sm font-semibold tracking-widest uppercase hover:bg-yellow-300 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
