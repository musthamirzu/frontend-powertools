import React from "react";
import franchiseImg from "../../assets/franchiseImg.png";

export default function FranchiseSection() {
  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div className="order-2 md:order-1 text-center md:text-left">

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-gray-800 mb-5 leading-tight">
              Franchise Opportunity
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              National Power Tools is expanding its presence across India and invites
              passionate entrepreneurs to partner with us. We aim to build a strong
              network of franchise stores delivering high-quality power tools and
              equipment to professionals and businesses.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              By joining hands with us, you gain access to a trusted brand, a wide
              product portfolio, and continuous support to grow your business in a
              competitive market.
            </p>

            <ul className="text-gray-600 text-sm sm:text-base space-y-2 mt-3 text-left">
              <li>• Wide range of professional tools and accessories</li>
              <li>• Strong supplier network and consistent product availability</li>
              <li>• Attractive margins and scalable business model</li>
              <li>• Marketing and operational support from our team</li>
              <li>• High demand in construction and industrial sectors</li>
              <li>• Opportunity to grow with a fast-expanding brand</li>
            </ul>

            <p className="text-gray-500 text-sm mt-5">
              We are looking for committed partners ready to grow with us and build
              a successful business under the National Power Tools brand.
            </p>

            <button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-sm sm:text-base w-full md:w-fit">
              Apply for Franchise
            </button>

          </div>

          {/* IMAGE */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src={franchiseImg}
              alt="Franchise"
              className="w-full max-w-md md:max-w-lg object-cover rounded-xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
}