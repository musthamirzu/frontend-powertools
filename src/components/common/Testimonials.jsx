import React, { useRef, useState } from "react";

const reviews = [
  {
    name: "David Manuel Domingo",
    location: "Uttarakhand",
    rating: 5,
    text: "Prompt, courteous and trustworthy service Thank you very much indeed for the prompt, courteous and trustworthy service.",
  },
  {
    name: "Ashley Rebello",
    location: "Mumbai",
    rating: 4,
    text: "Quality Tools and Value for money I’m pretty fascinated by the Quality Tools and value for money",
  },
  {
    name: "Ravi Kumar",
    location: "Chennai",
    rating: 5,
    text: "Excellent service and fast delivery. Highly recommended.",
  },
  {
    name: "Arjun Singh",
    location: "Delhi",
    rating: 4,
    text: "Good quality products and quick shipping.",
  },
  {
    name: "Mohammed Ali",
    location: "Kerala",
    rating: 5,
    text: "Very professional service and reliable tools.",
  },
  {
    name: "Karthik Raj",
    location: "Coimbatore",
    rating: 5,
    text: "Best place to buy tools. Amazing experience!",
  },
];

export default function Testimonials() {
  const scrollRef = useRef();
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    const percent =
      (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    setProgress(percent);
  };

  return (
    <section className="bg-gray-100 py-14 px-4 md:py-20 md:px-20">

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl  font-semibold text-gray-800 mb-8 md:mb-12">
        What Customers Say
      </h2>

      {/* SCROLL */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 md:gap-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[420px] 
                       max-w-[280px] sm:max-w-[320px] md:max-w-[420px] 
                       bg-white border border-gray-300 rounded-lg p-5 md:p-8"
          >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">

              {/* STARS */}
              <div className="flex gap-1 text-yellow-500 text-sm md:text-lg">
                {"★★★★★".split("").map((_, i) => (
                  <span
                    key={i}
                    className={i < review.rating ? "" : "text-gray-300"}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* NAME */}
              <p className="font-semibold text-gray-800 text-sm md:text-base">
                {review.name} - {review.location}
              </p>
            </div>

            {/* LINE */}
            <div className="border-t border-gray-300 mb-3 md:mb-4"></div>

            {/* TEXT */}
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-[3px] bg-gray-300 mt-4 md:mt-6 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

    </section>
  );
}