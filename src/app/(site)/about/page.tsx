import Image from "next/image";
import RevealSection from "@/components/home/RevealSection";
import CountUp from "@/components/about/CountUp";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-black text-white py-24 px-4 text-center animate-fade-in-up">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3 opacity-0 animate-fade-in-up [animation-delay:200ms]">Our Story</p>
        <h1 className="font-serif-display text-5xl opacity-0 animate-fade-in-up [animation-delay:400ms]">Built for riders,<br /><span className="italic">by riders</span></h1>
      </div>

      {/* Company Introduction */}
      <RevealSection delay={200}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            <strong>Deruiz</strong> — established with a passion for premium cycling, we are dedicated to designing, developing and manufacturing high‑quality electric bicycles that blend cutting‑edge technology with timeless design.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Our team includes experienced product engineers and quality control specialists who work tirelessly to ensure every Deruiz e-bike meets the highest standards. We believe in innovation without compromise, building electric bicycles that don't compromise on performance, style, or sustainability.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Every bike we build is a statement — that you can go further, faster, and smarter. Deruiz gives you the tools to go a little further than ever before.
          </p>
        </div>
      </RevealSection>

      {/* Company Stats */}
      <RevealSection delay={250}>
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-black mb-2"><CountUp target={15} suffix="+" /></p>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Years of Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black mb-2"><CountUp target={8000} suffix="m²" /></p>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Production Facility</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black mb-2"><CountUp target={50000} suffix="+" /></p>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Annual Output</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-black mb-2"><CountUp target={50} suffix="+" /></p>
                <p className="text-sm text-gray-600 uppercase tracking-wide">Countries Exported</p>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Our Philosophy */}
      <RevealSection delay={300}>
        <div className="bg-gray-50 pt-0 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Our Values</p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-black">What Drives Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  title: "Performance", 
                  body: "Every component is carefully selected from international premium suppliers for maximum efficiency and durability. We don't cut corners. Every single part — even the smallest bolt — is chosen for quality. We never compromise."
                },
                { 
                  title: "Design", 
                  body: "Clean modern lines, premium finishes, and ergonomic design that turns heads on every street. We believe an e-bike should be as beautiful as it is functional — a perfect blend of form and function."
                },
                { 
                  title: "Sustainability", 
                  body: "Zero emissions transportation, responsibly sourced materials, and a commitment to building a greener future. We continue to innovate to reduce our environmental footprint."
                },
              ].map((v, index) => (
                <div key={v.title} className="text-center bg-white p-8 shadow-sm reveal visible" style={{ animationDelay: `${index * 100 + 400}ms` }}>
                  <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-black">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Our Partners */}
      <RevealSection delay={350}>
        <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Trusted Partners</p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-black">Our Component Partners</h2>
            <p className="text-gray-600 mt-4">We work with the world's leading component suppliers to ensure every ride is the best it can be</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {["Shimano", "Samsung", "Bafang", "Enviolo"].map((partner, index) => (
              <div key={partner} className="text-center py-8 px-4 bg-gray-50 reveal visible" style={{ animationDelay: `${index * 100 + 200}ms` }}>
                <span className="text-xl font-bold text-gray-800">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Our Product Series */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <RevealSection delay={0}>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Our Collection</p>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-black">Our Bike Series</h2>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mica Pro</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Make every route your favorite route.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Mica Pro is our premium urban e-bike, designed for daily commuting with refined style and effortless performance. Clean aesthetics meet cutting‑edge cycling technology.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Premium carbon fork for smooth rides</li>
                <li>• Integrated battery for clean, modern look</li>
                <li>• Carbon belt drive for ultra‑low maintenance</li>
                <li>• High torque mid‑motor for steep city hills</li>
              </ul>
            </div>
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "75%" }}>
              <Image
                src="/images/products/dh-mica-pro-1.webp"
                alt="Mica Pro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
            <div className="order-2 md:order-1">
              <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "75%" }}>
                <Image
                  src="/images/products/dh-dolomit-1.webp"
                  alt="Dolomit"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4">Dolomit</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Alpine-born. Ready for adventure.</strong>
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Built for mountain adventures, the Dolomit combines robust construction with modern e-bike engineering. Conquer any trail with confidence.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Premium aluminum frame construction</li>
                <li>• Full suspension for maximum comfort</li>
                <li>• High torque motor for confident climbing</li>
                <li>• Large capacity battery for all‑day exploration</li>
              </ul>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* Showroom */}
      <RevealSection delay={300}>
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Visit Us</p>
                <h2 className="text-3xl font-bold mb-6">Our Showroom</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Come experience our bikes in person. Our expert team is ready to help you find the perfect ride. Schedule a test ride today!
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Address:</strong> 123 Electric Avenue</p>
                  <p><strong>Hours:</strong> Mon–Sat: 9am – 7pm</p>
                  <p><strong>Phone:</strong> +1 (800) 123-4567</p>
                </div>
              </div>
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm tracking-widest uppercase">Showroom Photo</span>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
