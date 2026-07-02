import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown, Star, Quote, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { stats, whyChoose, processSteps, testimonials, faqs, services, portfolioCategories } from "../content/data";

/* ─── PRODUCT CAROUSEL ─── */
const products = [
  { name: "T-Shirts", emoji: "👕", color: "from-brand-blue to-brand-cyan" },
  { name: "Hoodies", emoji: "🧥", color: "from-brand-purple to-brand-pink" },
  { name: "Baseball Caps", emoji: "🧢", color: "from-brand-cyan to-brand-lime" },
  { name: "Mugs", emoji: "☕", color: "from-brand-pink to-brand-orange" },
  { name: "Business Cards", emoji: "💳", color: "from-brand-blue to-brand-purple" },
  { name: "Flyers", emoji: "📄", color: "from-brand-lime to-brand-cyan" },
  { name: "Roll-Up Banners", emoji: "🪧", color: "from-brand-blue to-brand-pink" },
  { name: "Stickers", emoji: "🏷️", color: "from-brand-purple to-brand-cyan" },
  { name: "Vehicle Wraps", emoji: "🚗", color: "from-brand-cyan to-brand-blue" },
  { name: "Signage", emoji: "🪧", color: "from-brand-pink to-brand-purple" },
  { name: "Notebooks", emoji: "📓", color: "from-brand-lime to-brand-blue" },
  { name: "Corporate Gifts", emoji: "🎁", color: "from-brand-orange to-brand-pink" },
];

function ProductCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[400px] h-[340px] mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        {products.map((p, i) => {
          const isActive = i === active;
          const isPrev = i === (active - 1 + products.length) % products.length;
          const isNext = i === (active + 1) % products.length;
          return (
            <div
              key={p.name}
              className={`product-card absolute ${isActive ? "active" : "exit"}`}
              style={{
                background: `linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))`,
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                zIndex: isActive ? 10 : isPrev || isNext ? 5 : 0,
                transform: isActive ? "scale(1) translateY(0)" : isPrev ? "scale(0.85) translateY(-20px)" : isNext ? "scale(0.85) translateY(20px)" : "scale(0.7) translateY(40px)",
                opacity: isActive ? 1 : 0.3,
                transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                {p.emoji}
              </div>
              <p className="font-bold text-dark text-lg">{p.name}</p>
              <p className="text-gray-400 text-xs mt-1">VP Design & Print</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const duration = 2000, start = performance.now();
        function animate(now) {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="text-4xl md:text-5xl font-black text-white">{count}{suffix}</span>;
}

/* ─── FAQ ACCORDION ─── */
function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="relative py-24 overflow-hidden bg-light-bg">
      <div className="blob blob-pink" style={{ top: '-100px', right: '-50px' }} />
      <div className="blob blob-cyan" style={{ bottom: '-100px', left: '-50px' }} />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-blue tracking-wide">FAQ</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto font-light">Everything you need to know about our services.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.slice(0, 10).map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}>
              <button onClick={() => setOpen(open === i ? null : i)} className={`w-full text-left glass-card rounded-2xl p-5 transition-all duration-300 ${open === i ? "shadow-lg" : ""}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-dark text-sm">{faq.q}</span>
                  <ChevronDown size={18} className={`text-brand-blue shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{faq.a}</p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="blob blob-purple" style={{ top: '-100px', right: '-50px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-purple tracking-wide">TESTIMONIALS</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">What Our Clients Say</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-1 mb-3">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} size={14} className="fill-brand-orange text-brand-orange" />))}</div>
              <Quote size={20} className="text-brand-blue/20 mb-2" />
              <p className="text-gray-600 text-sm leading-relaxed font-light italic mb-4">"{t.text}"</p>
              <div className="border-t border-gray-100 pt-3">
                <p className="font-semibold text-dark text-sm">{t.name}</p>
                <p className="text-brand-cyan text-xs font-medium">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-light-bg">
      <div className="blob blob-blue" style={{ top: '-100px', left: '-50px' }} />
      <div className="blob blob-pink" style={{ bottom: '-100px', right: '-50px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-purple tracking-wide">ABOUT US</span></div>
            <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight mb-6">
              Zimbabwe's <span className="text-gradient-brand">Creative Printing</span> & Branding Experts
            </h2>
            <p className="text-gray-500 leading-relaxed font-light mb-6">
              VP Design & Print is a Zimbabwean creative printing company passionate about helping brands make lasting impressions. Since 2010, we've combined innovative design, premium-quality printing, and exceptional customer service to deliver world-class results.
            </p>
            <p className="text-gray-400 leading-relaxed font-light mb-6">
              From custom apparel and corporate branding to vehicle wraps, promotional products, banners, packaging, signage, and large-format printing — we help businesses, churches, schools, organisations, and individuals stand out.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Creativity", "Precision", "Quality", "Innovation"].map((tag) => (
                <span key={tag} className="glass text-xs font-semibold text-dark px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="glass-card rounded-3xl p-8 h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl gradient-multi flex items-center justify-center text-4xl mx-auto mb-4 shadow-2xl">🖨️</div>
                <p className="text-gray-400 text-sm font-light">Modern Print Studio</p>
                <p className="text-gray-300 text-xs font-light mt-1">DTF • Screen Printing • Embroidery • Large Format</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY CHOOSE ─── */
function WhyChoose() {
  return (
    <section className="relative py-24 overflow-hidden bg-dark">
      <div className="blob blob-cyan" style={{ top: '-150px', left: '10%' }} />
      <div className="blob blob-purple" style={{ bottom: '-150px', right: '10%' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-white/80 tracking-wide">WHY VP</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Why Choose VP Design & Print?</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChoose.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="glass-dark rounded-2xl p-5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Check size={16} className="text-brand-cyan shrink-0" />
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-white/40 text-xs font-light ml-7">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW ─── */
function ServicesOverview() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="blob blob-blue" style={{ top: '-100px', right: '-50px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-cyan tracking-wide">WHAT WE DO</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">Our Services</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto font-light">From concept to creation — we bring your brand to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card-blue rounded-3xl p-6 group cursor-default"
              style={{ background: `linear-gradient(135deg, rgba(37,99,235,0.06), rgba(6,182,212,0.04))`, backdropFilter: "blur(16px)", border: "1px solid rgba(37,99,235,0.1)" }}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-dark text-base mb-2">{s.title}</h3>
              <p className="text-gray-500 text-xs font-light leading-relaxed mb-3">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.items.slice(0, 4).map((item) => (
                  <span key={item} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{item}</span>
                ))}
                {s.items.length > 4 && <span className="text-[10px] text-brand-blue font-medium">+{s.items.length - 4} more</span>}
              </div>
              <Link to={`/services#${s.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:gap-2 transition-all">
                Learn More <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-center mt-10">
          <Link to="/services" className="glass-btn text-white px-8 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
            View All Services <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROCESS TIMELINE ─── */
function ProcessTimeline() {
  return (
    <section className="relative py-24 overflow-hidden bg-light-bg">
      <div className="blob blob-cyan" style={{ top: '-100px', left: '-50px' }} />
      <div className="blob blob-pink" style={{ bottom: '-100px', right: '-50px' }} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-pink tracking-wide">PROCESS</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">How It Works</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto font-light">From consultation to delivery — we make it seamless.</p>
        </motion.div>

        <div className="hidden md:flex items-start justify-between gap-4 relative">
          <div className="absolute top-8 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple opacity-30" />
          {processSteps.map((step) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: step.num * 0.08 }} className="flex flex-col items-center text-center relative z-10 flex-1">
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center font-bold text-brand-blue mb-3 relative z-10 shadow-lg">{step.num}</div>
              <h3 className="font-bold text-dark text-sm">{step.title}</h3>
              <p className="text-gray-400 text-xs mt-1 max-w-[130px] font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden relative pl-12">
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-cyan to-brand-purple opacity-30" />
          {processSteps.map((step) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: step.num * 0.05 }} className="relative pb-8 last:pb-0">
              <div className="glass absolute -left-12 top-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-brand-blue z-10 shadow-lg">{step.num}</div>
              <h3 className="font-bold text-dark text-sm">{step.title}</h3>
              <p className="text-gray-400 text-xs font-light mt-0.5">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ─── */
function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 overflow-hidden bg-white">
      <div className="blob blob-purple" style={{ top: '-100px', right: '-50px' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-pink tracking-wide">PORTFOLIO</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">Our Work</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto font-light">See the quality and creativity we bring to every project.</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {portfolioCategories.map((cat, i) => (
            <motion.div key={cat} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="glass-card rounded-2xl p-6 text-center group cursor-default" style={{ background: `linear-gradient(135deg, rgba(37,99,235,0.05), rgba(124,58,237,0.03))` }}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${["from-brand-blue to-brand-cyan", "from-brand-purple to-brand-pink", "from-brand-cyan to-brand-lime", "from-brand-pink to-brand-orange"][i % 4]} flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {["🏢", "🚗", "🎁", "👕", "🧢", "☕", "💳", "📄", "🪧", "⛪", "🏫", "💍", "📦"][i]}
              </div>
              <p className="font-semibold text-dark text-sm">{cat}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function ContactSection() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden bg-light-bg">
      <div className="blob blob-blue" style={{ top: '-150px', left: '10%' }} />
      <div className="blob blob-pink" style={{ bottom: '-150px', right: '10%' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="glass inline-block px-4 py-1.5 rounded-full mb-4"><span className="text-xs font-semibold text-brand-orange tracking-wide">CONTACT</span></div>
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">Get in Touch</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto font-light">Ready to start your project? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
            {[{ icon: "📞", title: "Call Us", value: "0717 696 415 / 0773 389 415", href: "tel:0717696415" },
              { icon: "💬", title: "WhatsApp", value: "+263 717 696 415", href: "https://wa.me/263717696415" },
              { icon: "✉️", title: "Email", value: "info@vpdesign.co.zw", href: "mailto:info@vpdesign.co.zw" },
              { icon: "📍", title: "Location", value: "Harare, Zimbabwe", href: "#" },
            ].map((item, i) => (
              <a key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="glass-card rounded-2xl p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-2xl">{item.icon}</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.title}</p>
                  <p className="font-semibold text-dark text-sm">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="glass-card rounded-3xl p-8">
            <h3 className="font-bold text-2xl text-dark mb-6">Get a Free Quote</h3>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
              </div>
              <input type="email" placeholder="Email" className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all" />
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
              <textarea rows={3} placeholder="Tell us about your project..." className="w-full bg-white/60 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-none" />
              <button type="submit" className="w-full glass-btn text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN ─── */
export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-light-bg via-white to-light-bg">
        <div className="blob blob-cyan animate-float" style={{ top: '5%', left: '5%' }} />
        <div className="blob blob-purple animate-float-slow" style={{ bottom: '10%', right: '5%' }} />
        <div className="blob blob-pink" style={{ top: '40%', right: '20%' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
              <div className="glass inline-block px-4 py-1.5 rounded-full mb-5">
                <span className="text-xs font-semibold text-gradient-brand">🇿🇼 Zimbabwe's Premium Print & Branding Studio</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight text-dark">
                Zimbabwe's Creative
                <br />
                <span className="text-gradient-brand">Printing & Branding</span>
                <br />
                Experts
              </h1>
              <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-lg leading-relaxed font-light">
                Transform your ideas into premium printed products. From custom apparel and corporate branding to vehicle wraps, signage, and large-format printing — we help you stand out.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/contact" className="glass-btn text-white px-8 py-3.5 rounded-full font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-brand-blue/20">
                  Get a Free Quote <ArrowRight size={16} />
                </Link>
                <a href="#portfolio" className="glass-btn-outline text-dark px-8 py-3.5 rounded-full font-semibold text-sm border border-gray-200 hover:border-brand-blue hover:text-brand-blue transition-all inline-flex items-center gap-2">
                  Explore Our Work <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-cyan/5 to-brand-purple/10 blur-[80px] rounded-full" />
              <ProductCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 overflow-hidden bg-dark">
        <div className="blob blob-cyan" style={{ top: '-100px', left: '30%' }} />
        <div className="blob blob-purple" style={{ bottom: '-100px', right: '30%' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s) => (
              <motion.div key={s.label} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <AnimatedCounter target={s.value} suffix={s.suffix} />
                <p className="mt-2 text-brand-cyan font-semibold text-xs md:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <About />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Why Choose VP */}
      <WhyChoose />

      {/* Portfolio */}
      <Portfolio />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQSection />

      {/* Contact */}
      <ContactSection />
    </main>
  );
}
