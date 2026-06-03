import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Makita 320W Electric Sander",
    desc: "14,000 RPM, Durable Aluminium Base",
    image: "/images/sander.png",
    tag: "NEW",
    oldPrice: 5175,
    price: 4140,
  },
  {
    id: 2,
    name: "DeWalt 750W Reciprocating Saw",
    desc: "Variable Speed, 115mm Cutting Depth",
    image: "/images/saw.png",
    tag: "NEW",
    oldPrice: 7799,
    price: 6239,
  },
  {
    id: 3,
    name: "Bosch PH2 Screwdriver",
    desc: "Magnetic Tip, Ergonomic Handle",
    image: "/images/screwdriver.png",
    tag: "NEW",
    oldPrice: 175,
    price: 140,
  },
  {
    id: 4,
    name: "Stanley Cutter Knife",
    desc: "Heavy Duty, 3 Blades Included",
    image: "/images/cutter.png",
    tag: "NEW",
    oldPrice: 350,
    price: 280,
  },
  {
    id: 5,
    name: "Makita Angle Grinder",
    desc: "850W High Performance Motor",
    image: "/images/grinder.png",
    tag: "HOT",
    oldPrice: 6999,
    price: 5599,
  },
  {
    id: 6,
    name: "DeWalt Impact Drill",
    desc: "13mm Chuck, Powerful Motor",
    image: "/images/drill.png",
    tag: "HOT",
    oldPrice: 8999,
    price: 7499,
  },
  {
    id: 7,
    name: "Bosch Heat Gun",
    desc: "Variable Temperature Control",
    image: "/images/heatgun.png",
    tag: "NEW",
    oldPrice: 2999,
    price: 2399,
  },
  {
    id: 8,
    name: "Stanley Measuring Tape",
    desc: "5 Meter, Durable Build",
    image: "/images/tape.png",
    tag: "NEW",
    oldPrice: 499,
    price: 399,
  },
];

export default function NewArrivals() {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <div className="bg-gray-100 py-16 px-4 md:px-20">
      
      {/* TITLE */}
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        New Arrivals
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {visibleProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 relative"
          >
            
            {/* TAG */}
            <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs px-2 py-1 font-medium">
              {item.tag}
            </span>

            {/* IMAGE */}
            <div className="flex justify-center mb-6">
              <img
                src={item.image}
                alt={item.name}
                className="h-40 object-contain"
              />
            </div>

            {/* NAME */}
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {item.name}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-500 text-center mt-2">
              {item.desc}
            </p>

            {/* PRICE */}
            <div className="text-center mt-4">
              <span className="text-gray-400 line-through mr-2">
                ₹{item.oldPrice}
              </span>
              <span className="text-xl font-bold text-gray-800">
                ₹{item.price}
              </span>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center mt-5">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md text-sm">
                Buy Now
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* SHOW MORE / LESS BUTTON */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
        >
          {showAll ? "Show Less ↑" : "Show More ↓"}
        </button>
      </div>

    </div>
  );
}