import React, { useState } from "react";

import API from "../../services/api";
import { useEffect } from "react";
export default function BrandsSection() {
 const [brands, setBrands] =
  useState([]);

const [activeBrand,
  setActiveBrand] =
  useState("");

const [products,
  setProducts] =
  useState([]);

  const fetchBrands =
  async () => {
    try {

      const res =
        await API.get(
          "/products/brands"
        );

      setBrands(res.data);

      if (res.data.length > 0) {
        setActiveBrand(
          res.data[0]
        );
      }

    } catch (err) {

      console.log(err);

    }
  };
  useEffect(() => {
  fetchBrands();
}, []);


  const fetchProductsByBrand =
  async () => {
    try {

      const res =
        await API.get(
          `/products/brand/${activeBrand}`
        );

      setProducts(
        res.data
      );

    } catch (err) {

      console.log(err);

    }
  };
  useEffect(() => {

  if (activeBrand) {
    fetchProductsByBrand();
  }

}, [activeBrand]);


  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6 md:px-20">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 bg-clip-text">
          All Brands
        </h2>
        <p className="text-gray-500 mt-3 text-lg">
          Explore top-quality tools from trusted brands
        </p>
      </div>

      {/* BRAND TABS */}
      <div className="flex flex-wrap justify-center gap-4 mb-14">
       {brands.map((brand) => (
  <button
    key={brand}
    onClick={() =>
      setActiveBrand(brand)
    }
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-md
              ${
                activeBrand === brand
                  ? "bg-teal-600 text-white shadow-lg scale-105"
                  : "bg-white/70 text-gray-700 border hover:bg-teal-50 hover:scale-105"
              }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            
            {/* IMAGE */}
            <div className="relative overflow-hidden">
             <img
  src={
    product.image
      ? product.image.startsWith(
          "http"
        )
        ? product.image
        : `http://localhost:5004/${product.image}`
      : "https://via.placeholder.com/300"
  }
  alt={product.name}
  className="
    w-full
    h-52
    object-cover
    group-hover:scale-110
    transition
    duration-500
  "
/>

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <h3 className="font-semibold text-gray-800 text-lg">
                {product.name}
              </h3>

              <p className="text-2xl font-bold text-teal-600 mt-2">
                ₹{product.price}
              </p>

              {/* BUTTON */}
              <button className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-green-500 text-white text-sm font-medium hover:opacity-90 transition">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}