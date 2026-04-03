"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    section: "Order & Invoicing",
    items: [
      {
        q: "Can I request an invoice?",
        a: "As soon as your order is complete, we will send you an email containing the invoice. If you need any modifications to your invoice, please contact our support team.",
      },
      {
        q: "What payment options are there?",
        a: "We accept credit/debit cards, Klarna, Apple Pay, Google Pay, PayPal, Giropay, bank transfer, WeChat, and bike financing options.",
      },
      {
        q: "What happens after I place my order?",
        a: "You will receive an order confirmation email immediately. Once payment clears and your package ships, you will receive tracking information via email.",
      },
    ],
  },
  {
    section: "Delivery & Shipping",
    items: [
      {
        q: "What are the delivery costs?",
        a: "Delivery costs vary by region. Please refer to our Shipping Information page for full details on rates and estimated delivery times.",
      },
      {
        q: "How will my e-bike be delivered?",
        a: "Your bike arrives in a sturdy, upright cardboard box. Please inspect the packaging for damage before signing. Keep the battery packaging in case you need it for future service. Separately ordered accessories ship in separate packages.",
      },
      {
        q: "Can I change the delivery address after placing my order?",
        a: "Yes, as long as the package has not yet shipped. Once a tracking number has been assigned, address changes are no longer possible. Contact us as soon as possible if you need to make a change.",
      },
    ],
  },
  {
    section: "Assembly",
    items: [
      {
        q: "How do I assemble my bicycle myself?",
        a: "Each bike comes with assembly instructions, and we also provide online video guides. Deruiz recommends professional dealer assembly, which is free of charge if you purchased directly from us. Separately ordered accessories may incur an installation fee.",
      },
    ],
  },
  {
    section: "Product & Technology",
    items: [
      {
        q: "Why does Deruiz use 48-volt motors?",
        a: "48 volts give you more power, more efficiency, and more range. Higher voltage means smoother operation, greater torque on climbs, and the ability to use larger battery capacities — all of which translate to a better riding experience.",
      },
      {
        q: "What is the range of a Deruiz e-bike?",
        a: "Range depends on the model, rider weight, terrain, and assist level. Most Deruiz models offer between 40–100 km per charge. Check the individual product page for specific range estimates.",
      },
      {
        q: "How long does it take to charge the battery?",
        a: "A full charge typically takes 4–6 hours depending on the battery capacity and charger. We recommend charging after each ride to keep the battery in optimal condition.",
      },
    ],
  },
  {
    section: "Financing & Leasing",
    items: [
      {
        q: "Can I get a Deruiz e-bike via JobRad or BusinessBike lease?",
        a: "Yes. We work with various leasing providers including JobRad, Bikeleasing, Lease a Bike, and BusinessBike. Contact us for details on how to set up a lease through your employer.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-black">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-none text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-black text-white py-20 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Support</p>
        <h1 className="text-4xl sm:text-5xl font-bold">Frequently Asked<br /><span className="italic font-light">Questions</span></h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {faqs.map((section) => (
          <div key={section.section} className="mb-12">
            <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">
              {section.section}
            </h2>
            <div>
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-yellow-400 p-8 text-center">
          <h3 className="text-lg font-bold text-black mb-2">Still have questions?</h3>
          <p className="text-sm text-black/70 mb-6">Our team is happy to help you find the right bike and answer any questions.</p>
          <a
            href="/contact"
            className="inline-block bg-black text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 hover:bg-gray-900 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
