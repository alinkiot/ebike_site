import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-black text-white py-24 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Our story</p>
        <h1 className="text-5xl font-bold">Built for riders,<br /><span className="italic font-light">by riders</span></h1>
      </div>

      {/* Mission */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Welcome to our community, <strong>Deruiz Ebikes</strong>, the green power.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Deruiz we build very modern ebikes, with an elegant look but still robust and stable. We want to give the customer the tools to go a little further than ever before.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mt-6">
          Deruiz was founded with a single mission: to create electric bicycles that don&apos;t compromise on performance, style, or sustainability. Every bike we build is a statement — that you can go further, faster, and smarter.
        </p>
      </div>

      {/* Our Philosophy */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">What drives us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black">Our Philosophy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Performance", 
                body: "Every component is selected for maximum efficiency and durability. We don't cut corners. We've rethought every single component from the ground up, carefully selected it, and consistently refined it."
              },
              { 
                title: "Design", 
                body: "Clean lines, premium finishes, and thoughtful ergonomics that turn heads on every street. We believe an e-bike should be as beautiful as it is functional."
              },
              { 
                title: "Sustainability", 
                body: "Zero emissions, responsibly sourced materials, and a commitment to a greener future. We want to give the customer the tools to go a little further than ever before."
              },
            ].map((v) => (
              <div key={v.title} className="text-center bg-white p-8 shadow-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-black">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Product Series */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-2">Our Collection</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-black">Our Bike Series</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Mica Pro</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Make every route your favorite route.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Mica Pro is our premium urban e-bike, designed for daily commuting with style and performance. Clean aesthetics meet cutting-edge technology.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Premium carbon fork for smooth rides</li>
              <li>• Integrated battery for clean look</li>
              <li>• Belt drive for low maintenance</li>
              <li>• Powerful motor for steep city hills</li>
            </ul>
          </div>
          <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "75%" }}>
            <Image
              src="/images/products/dh-mica-pro-1.webp"
              alt="Mica Pro"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
          <div className="order-2 md:order-1">
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "75%" }}>
              <Image
                src="/images/products/dh-dolomit-1.webp"
                alt="Dolomit"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-bold mb-4">Dolomit</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Alpine-born. Ready for adventure.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Built for mountain adventures, the Dolomit combines robust construction with modern e-bike technology. Conquer any terrain with confidence.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Sturdy aluminum frame</li>
              <li>• Full suspension for comfort</li>
              <li>• High torque motor for climbing</li>
              <li>• Large battery for long rides</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Showroom */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3">Visit us</p>
              <h2 className="text-3xl font-bold mb-6">Our Showroom</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Come experience our bikes in person. Our team of experts is ready to help you find the perfect ride. Schedule a test ride today!
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
    </div>
  );
}
