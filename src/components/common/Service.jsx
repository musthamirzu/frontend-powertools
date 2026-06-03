import React from "react";
import { Wrench, Truck, ShieldCheck, Headphones } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Tool Repair Service",
    desc: "Expert repair and maintenance for all power tools.",
    icon: <Wrench size={32} />,
  },
  {
    id: 2,
    title: "Fast Delivery",
    desc: "Quick and safe delivery across India.",
    icon: <Truck size={32} />,
  },
  {
    id: 3,
    title: "Warranty Support",
    desc: "Authorized warranty support for top brands.",
    icon: <ShieldCheck size={32} />,
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "We are here anytime for your queries.",
    icon: <Headphones size={32} />,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-6 md:px-20 overflow-hidden">

      {/* 🔥 Background Blur Effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 opacity-30 blur-3xl rounded-full"></div>

      {/* TITLE */}
      <div className="text-center mb-14 relative z-10">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        Our Services
      </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Reliable solutions tailored for your needs
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            
            {/* ICON */}
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition">
              {service.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              {service.desc}
            </p>

            {/* 🔥 Hover Line */}
            <div className="mt-6 h-1 w-0 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto group-hover:w-12 transition-all duration-300 rounded-full"></div>

          </div>
        ))}
      </div>
    </section>
  );
}