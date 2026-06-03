import React from "react";
import aboutImg from "../../assets/aboutus.png";
export default function AboutUs() {
  return (
    <section className="bg-gray-100 py-14 px-4 md:py-20 md:px-20">

      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

        {/* 🖼️ IMAGE */}
        <div className="relative order-1 md:order-none">
          <img
            src={aboutImg} alt="About us"
            className="rounded-lg shadow-lg w-full h-[250px] sm:h-[320px] md:h-auto object-cover"
          />

          {/* Floating Card */}
         <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 
                bg-white/90 backdrop-blur-md 
                px-4 py-3 md:px-5 md:py-4 
                rounded-xl shadow-lg border border-white/40">

  <p className="text-xs md:text-sm text-gray-500">
    Trusted by
  </p>

  <h4 className="text-base md:text-xl font-bold text-teal-600 leading-tight">
    5000+ Customers
  </h4>

</div>
        </div>

        {/* 📝 CONTENT */}
        <div className="order-2 md:order-none">
          <h2 className="text-4xl sm:text-3xl md:text-5xl font-bold text-gray-900">
            About Us
          </h2>

          <p className="text-gray-600 mt-4 md:mt-6 text-sm md:text-base leading-relaxed">
            We are committed to delivering high-quality power tools and services
            to professionals and DIY enthusiasts across India. Our mission is to
            provide reliable products from trusted brands like Stanley, Makita,
            and DeWalt while ensuring exceptional customer support.
          </p>

          <p className="text-gray-600 mt-3 md:mt-4 text-sm md:text-base leading-relaxed">
            With years of experience in the industry, we focus on innovation,
            durability, and customer satisfaction. Whether you need repairs,
            new tools, or expert advice — we’ve got you covered.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">

            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-teal-600 text-lg md:text-xl">✔</span>
              <p className="text-gray-700 text-sm md:text-base font-medium">
                Premium Quality Tools
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-teal-600 text-lg md:text-xl">✔</span>
              <p className="text-gray-700 text-sm md:text-base font-medium">
                Trusted Brands
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-teal-600 text-lg md:text-xl">✔</span>
              <p className="text-gray-700 text-sm md:text-base font-medium">
                Fast Delivery
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-teal-600 text-lg md:text-xl">✔</span>
              <p className="text-gray-700 text-sm md:text-base font-medium">
                24/7 Support
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}