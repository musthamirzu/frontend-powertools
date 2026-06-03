import React from "react";
import quote from "../../assets/quote.png";

export default function QuoteSection() {
  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="order-2 md:order-1">
            
            <h2 className="text-3xl md:text-5xl font-medium text-gray-700 leading-relaxed">
              “Give ordinary people the right tools, and they will design and build the most extraordinary things.”
            </h2>

            <p className="mt-6 text-gray-500 text-base md:text-lg">
              — Neil Gershenfeld
            </p>

          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={quote}
              alt="worker"
              className="w-full max-w-md md:max-w-lg object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}