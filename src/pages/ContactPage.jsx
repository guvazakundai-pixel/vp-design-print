import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <main>
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-light-bg via-white to-light-bg">
        <div className="blob blob-pink animate-float" style={{ top: '5%', right: '5%' }} />
        <div className="blob blob-cyan" style={{ bottom: '10%', left: '5%' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mb-16">
            <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-orange tracking-wide">CONTACT</span></div>
            <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tight mb-6">
              Get a <span className="text-gradient-brand">Free Quote</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed font-light">Ready to start your project? Reach out and we'll get back to you within 24 hours.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4">
              {[{ icon: "📞", title: "Call Us", value: "0717 696 415", sub: "Also: 0773 389 415", href: "tel:0717696415" },
                { icon: "💬", title: "WhatsApp", value: "+263 717 696 415", sub: "Fastest response", href: "https://wa.me/263717696415" },
                { icon: "✉️", title: "Email", value: "info@vpdesign.co.zw", sub: "We reply within 24 hours", href: "mailto:info@vpdesign.co.zw" },
                { icon: "📍", title: "Location", value: "Harare, Zimbabwe", sub: "Delivery across Zimbabwe", href: "#" },
              ].map((item, i) => (
                <a key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="glass-card rounded-2xl p-5 flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-3xl">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.title}</p>
                    <p className="font-semibold text-dark">{item.value}</p>
                    <p className="text-gray-400 text-xs font-light">{item.sub}</p>
                  </div>
                </a>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="glass-card rounded-3xl p-8">
              <h3 className="font-bold text-2xl text-dark mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
                <select className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all">
                  <option value="">Select Service</option>
                  <option>Custom Apparel</option>
                  <option>Cap Branding</option>
                  <option>Corporate Gifts</option>
                  <option>Business Printing</option>
                  <option>Large Format Printing</option>
                  <option>Signage</option>
                  <option>Vehicle Branding</option>
                  <option>Graphic Design</option>
                  <option>Other</option>
                </select>
                <textarea rows={4} placeholder="Describe your project — quantity, timeline, specific requirements..." className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none" />
                <button type="submit" className="w-full glass-btn text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
