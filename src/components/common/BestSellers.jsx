import React from "react";

const products = [
  {
    id: 1,
    name: "3M Dust Mask - TSP403",
    price: 11,
    oldPrice: 14,
    tag: "ON SALE",
    image: "/images/mask.png",
  },
  {
    id: 2,
    name: "Gardena 3pcs Hose Quick Connector Set - THWS030301",
    price: 199,
    oldPrice: 250,
    tag: "BEST SELLER",
    image: "/images/hose.png",
  },
  {
    id: 3,
    name: "Bosch 9 Pcs Interchangeable Screwdriver Set - THT250906",
    price: 576,
    oldPrice: 720,
    tag: "ON SALE",
    image: "/images/screwdriver.png",
  },
  {
    id: 4,
    name: "Stanley 12\" Hacksaw Frame Adjustable Tension - THT54106",
    price: 699,
    oldPrice: 875,
    tag: "ON SALE",
    image: "/images/hacksaw.png",
  },
  {
    id: 5,
    name: "DeWalt 8 Inch Mini Bolt Cutter - THT11386",
    price: 360,
    oldPrice: 450,
    tag: "ON SALE",
    image: "/images/cutter.png",
  },
];

const BestSellers = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-20">
   
      <h2 className="text-4xl font-semibold text-center mb-10">
        Best Sellers
      </h2>

      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border"
          >
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />

              <div>
                {/* TAG */}
                <span
                  className={`text-xs px-2 py-1 rounded text-white ${
                    product.tag === "BEST SELLER"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  {product.tag}
                </span>

                {/* NAME */}
                <p className="text-gray-700 mt-2 text-sm md:text-base">
                  {product.name}
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="text-right">
              {/* OLD PRICE */}
              <p className="text-gray-400 line-through text-sm">
                ₹{product.oldPrice.toFixed(2)}
              </p>

              {/* NEW PRICE */}
              <p className="text-lg font-semibold text-gray-800">
                ₹{product.price.toFixed(2)}
              </p>

              {/* BUTTON */}
              <button className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;