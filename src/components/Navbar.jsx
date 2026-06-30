import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-multi flex items-center justify-center shadow-lg shadow-brand-blue/20">
              <span className="text-white font-bold text-sm">VP</span>
            </div>
            <div>
              <span className="font-bold text-base text-dark">VP</span>
              <span className="font-bold text-base text-brand-blue"> Design & Print</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href}
                className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-brand-blue" : "text-gray-600 hover:text-brand-blue"}`}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="glass-btn text-white px-5 py-2.5 rounded-full text-sm font-semibold">
              Get a Quote
            </Link>
          </div>

          <button className="md:hidden p-2 text-dark" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-400 overflow-hidden ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="glass border-t border-white/20 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="block text-sm font-medium text-gray-700 hover:text-brand-blue py-2 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="block text-center glass-btn text-white px-5 py-3 rounded-full text-sm font-semibold">Get a Quote</Link>
        </div>
      </div>
    </nav>
  );
}
