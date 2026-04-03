import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-widest uppercase text-yellow-400">DERUIZ</span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium electric bicycles designed for the modern rider. Beyond limits, beyond expectations.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Products</h4>
            <ul className="space-y-2">
              {[
                { label: "City E-Bikes", href: "/e-bikes/city" },
                { label: "Trekking", href: "/e-bikes/trekking" },
                { label: "SUV", href: "/e-bikes/suv" },
                { label: "MTB", href: "/e-bikes/mtb" },
                { label: "Gravel / Road", href: "/e-bikes/gravel" },
                { label: "Folding", href: "/e-bikes/folding" },
                { label: "Accessories", href: "/accessories" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>alinkiot@163.com</li>
              <li>18668485654</li>
              <li className="pt-2">
                <div className="flex gap-3">
                  {[
                    { label: "Instagram", href: "https://instagram.com" },
                    { label: "Facebook", href: "https://facebook.com" },
                    { label: "YouTube", href: "https://youtube.com" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white transition-colors">
                      {s.label}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Deruiz. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
