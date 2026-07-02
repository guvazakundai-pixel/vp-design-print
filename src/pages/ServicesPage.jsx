import { motion } from "framer-motion";
import { services } from "../content/data";
import { Clock, CheckCircle, AlertTriangle, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const vehicleImages = [
  { src: "/images/car-wrap-1.jpg", title: "Full Vehicle Wrap" },
  { src: "/images/car-wrap-2.jpg", title: "Fleet Branding" },
  { src: "/images/car-wrap-3.jpg", title: "Corporate Fleet Wrap" },
  { src: "/images/car-wrap-4.jpg", title: "Vehicle Branding" },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-light-bg via-white to-light-bg">
        <div className="blob blob-cyan animate-float" style={{ top: '10%', right: '5%' }} />
        <div className="blob blob-purple" style={{ bottom: '10%', left: '5%' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-cyan tracking-wide">SERVICES</span></div>
            <h1 className="text-4xl md:text-6xl font-black text-dark tracking-tight mb-6">
              Our <span className="text-gradient-brand">Services</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              From concept to creation — we offer end-to-end printing, branding, and design solutions. Every product is crafted with precision, premium materials, and attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, i) => (
            <motion.div key={service.id} id={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="scroll-mt-24 rounded-3xl p-8 md:p-10" style={{ background: `linear-gradient(135deg, rgba(37,99,235,0.05), rgba(6,182,212,0.03))`, backdropFilter: "blur(16px)", border: "1px solid rgba(37,99,235,0.08)" }}>
              <div className="flex items-start gap-5">
                <div className="text-4xl shrink-0">{service.icon}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">{service.title}</h2>
                  <p className="text-gray-500 leading-relaxed font-light mb-6">{service.desc}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-dark text-sm mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-xs">✓</span>
                        Products We Offer
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.items.map((item) => (
                          <span key={item} className="text-xs bg-white/60 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark text-sm mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-purple/10 flex items-center justify-center text-xs">◆</span>
                        Production Methods
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.methods.map((method) => (
                          <span key={method} className="text-xs bg-gradient-to-r from-brand-blue/10 to-brand-cyan/10 text-brand-blue px-3 py-1.5 rounded-full font-medium">{method}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {service.id === "vehicle-branding" && (
                    <div className="mt-8">
                      <h4 className="font-semibold text-dark text-sm mb-4">Recent Work</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {vehicleImages.map((img, i) => (
                          <motion.div key={img.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="rounded-2xl overflow-hidden bg-white/60 border border-gray-100 group">
                            <div className="aspect-[4/3] overflow-hidden">
                              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                            </div>
                            <div className="p-2.5">
                              <p className="font-semibold text-dark text-xs text-center">{img.title}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-light-bg">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-gray-500 font-light mb-8">Contact us for a free quote and consultation.</p>
            <Link to="/contact" className="glass-btn text-white px-8 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
