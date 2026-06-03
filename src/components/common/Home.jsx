import lorry from "../../assets/lorry1.png";
import BestSellers from "./BestSellers";
import Navbar from "./Navbar";
import banner from "../../assets/exclusive.png";
import { motion, useScroll, useTransform } from "framer-motion";
import NewArrivals from "./NewArrivals";
import ServicesSection from "./Service";
import Brands from "./AllBrands";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import QuoteSection from "./Quotesection";
import FranchiseSection from "./FranchiseSection";


export default function Home() {

  // 🔥 PARALLAX SCROLL
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      <Navbar />


      <div className="block md:hidden bg-gray-50">

        {/* 🔥 IMAGE WRAPPER (IMPORTANT: relative) */}
        <div className="relative">

          <img
            src={lorry}
            alt="Truck"
            className="w-full h-56 object-cover"
          />

          {/* 🔥 SMOOTH BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 via-gray-50/10 to-transparent"></div>

        </div>

        {/* 🔥 TEXT */}
        <div className="text-center px-4 py-8">
          <h1 className="text-3xl font-bold text-teal-700 mb-3">
            Get the latest
          </h1>

          <p className="text-gray-500 text-sm mb-5">
            The widest range of tools under a single brand. <br />
            Bestseller among South India.
          </p>

          <button className="bg-teal-600 text-white px-6 py-2 rounded-lg">
            Shop Now
          </button>
        </div>

      </div>

      {/* 💻 DESKTOP VIEW */}
      <div className="hidden md:block relative h-screen overflow-hidden">

        {/* 🔥 PARALLAX IMAGE */}
        <motion.img
          src={lorry}
          alt="Truck"
          style={{ y }}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* 🔥 GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r"></div>

        {/* 🔥 TEXT CONTENT */}
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h1 className="text-5xl font-bold text-teal-700 mb-4">
              Get the latest
            </h1>

            <p className="text-gray-700 mb-6 text-lg">
              The widest range of tools under a single brand. <br />
              Bestseller among South India.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Shop Now
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* ================= MARQUEE ================= */}

      <div className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 md:py-5 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee text-sm md:text-lg font-medium px-4">
          Please purchase at your own discretion. &nbsp;&nbsp;&nbsp;
          We do not guarantee the compatibility of our accessories with products from other brands... &nbsp;&nbsp;&nbsp;
          — Total Product Expert
        </div>
      </div>

      {/* ================= BEST SELLERS ================= */}

      <motion.div
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >



        <BestSellers />
      </motion.div>
      <div className="bg-[#24343b] py-10 px-4 md:px-16">

        <div className="bg-[#24343b] py-10 px-4 md:px-16">

          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-xl">

            {/* IMAGE */}
            <img
              src={banner}
              alt="Tools Banner"
              className="w-full h-[280px] sm:h-[350px] md:h-[450px] object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center">
              <div className="text-white max-w-xl px-4 sm:px-6 md:px-12">

                {/* TITLE */}
                <h1 className="text-xl sm:text-2xl md:text-5xl font-bold leading-tight">
                  Exclusive Tools Collection
                </h1>

                {/* SUBTEXT */}
                <p className="mt-3 text-xs sm:text-sm md:text-lg text-gray-200">
                  Premium Stanley, Makita & Dewalt tools for professionals
                </p>

                <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-300">
                  Limited Time Offer • Free Shipping Available
                </p>

                {/* BUTTON */}
                <button className="mt-4 sm:mt-5 md:mt-6 bg-teal-600 hover:bg-teal-700 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-md text-sm md:text-base text-white font-medium transition">
                  Shop Now
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>

      <NewArrivals />
      <ServicesSection />
      <Brands />
      <Testimonials />
      <QuoteSection/>
      <div id="about">
        <AboutUs />
      </div>
      <FranchiseSection/>
      <div id="contact">
        <ContactUs />
      </div>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-500 text-white px-4 py-2 md:px-5 md:py-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition text-sm md:text-base">
        💬 Connect With Us
      </div>

    </div>
  );
}
