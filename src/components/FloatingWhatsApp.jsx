import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/263717696415" target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl glass shadow-xl shadow-brand-blue/20 flex items-center justify-center hover:scale-105 transition-all duration-300"
      aria-label="Chat on WhatsApp">
      <MessageCircle size={26} className="text-brand-blue" />
    </a>
  );
}
