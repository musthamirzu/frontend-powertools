import React from "react";
import { Mail, Phone, Smartphone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function ContactUs() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-20 relative">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT (TEXT) */}
        <div className="order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-6">
            Contact Us
          </h2>

          <p className="text-gray-600 mb-6">
            Contact us for dealer / distributorship / franchise opportunities.
          </p>

          {/* ADDRESS */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              Our address
            </h4>
            <p className="text-gray-600 leading-relaxed">
              National-Power-Tools, Pollachi main road, Sitko arch, Sunderapuram, Coimbatore.
            </p>
            <p className="text-sm mt-2 text-gray-700 cursor-pointer hover:underline">
              Get directions ↗
            </p>
          </div>

          {/* OPEN HOURS */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              Open hours
            </h4>
            <p className="text-gray-600">
              Monday-Saturday: 9:00 AM – 5:00 PM
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              Contact info
            </h4>
            <p className="text-gray-600">
              Call / WhatsApp: +91 7402471678
            </p>
            <p className="text-gray-600">
              info@nptpowertools.in
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white cursor-pointer transition">
                <FaFacebookF size={16} />
              </div>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white cursor-pointer transition">
                <FaInstagram size={16} />
              </div>
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white cursor-pointer transition">
                <FaYoutube size={16} />
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="order-1 md:order-2 relative">
          <img
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
            alt="contact"
            className="rounded-lg w-full h-[300px] md:h-[500px] object-cover"
          />

          {/* FLOATING ICONS */}
          <div className="absolute inset-0 flex items-center justify-center gap-6">
            
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-md">
              <Mail size={28} className="text-gray-800" />
            </div>

            <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-md">
              <Phone size={28} className="text-gray-800" />
            </div>

            <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-md">
              <Smartphone size={28} className="text-gray-800" />
            </div>

          </div>
        </div>

      </div>

     

    </section>
  );
}