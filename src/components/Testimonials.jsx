import React, { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ananya Desai",
      year: "Class of 2022",
      image: "/api/placeholder/150/150",
      quote:
        "Being part of Saptham was the highlight of my university experience. It let me pursue Bharatanatyam while making lifelong friends.",
      position: "Former Dance Lead",
    },
    {
      id: 2,
      name: "Rahul Menon",
      year: "Class of 2020",
      image: "/api/placeholder/150/150",
      quote:
        "Training and performances built my confidence and artistry. That foundation helped me start my own dance academy.",
      position: "Former President",
    },
    {
      id: 3,
      name: "Lakshmi Krishnan",
      year: "Class of 2021",
      image: "/api/placeholder/150/150",
      quote:
        "Saptham nurtures complete artists. The mentorship helped me understand the deeper aspects of classical arts.",
      position: "Former Secretary",
    },
    {
      id: 4,
      name: "Vikram Sundaram",
      year: "Class of 2019",
      image: "/api/placeholder/150/150",
      quote:
        "Discipline, teamwork, and creative problem-solving I learned here are invaluable in my career as an engineer.",
      position: "Former Treasurer",
    },
    {
      id: 5,
      name: "Meera Jayaraman",
      year: "Class of 2018",
      image: "/api/placeholder/150/150",
      quote:
        "Saptham balanced my technical education with art. Weekend practices and performances are my cherished memories.",
      position: "Former Event Coordinator",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  // Auto slide (every 5s)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
    resetInterval();
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 400);
    resetInterval();
  };

  const goToSlide = (idx) => {
    if (isAnimating || idx === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setTimeout(() => setIsAnimating(false), 400);
    resetInterval();
  };

  return (
    <section id="testimonials" className="relative py-20 bg-gray-50">
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#763C91]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#F26B1D]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E]">
            Alumni <span className="text-[#F26B1D]">Testimonials</span>
          </h2>
          <div className="mt-3 h-1 w-20 bg-[#F26B1D] mx-auto rounded" />
          <p className="mt-4 text-lg text-gray-600">
            Hear from our past members about their journey with Saptham
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 px-2">
                  {/* Card */}
                  <div className="relative rounded-2xl bg-white border border-gray-100 shadow-lg p-6 md:p-8">
                    {/* Subtle quote watermark SVG (top-right) */}
                    <svg
                      aria-hidden="true"
                      className="absolute -top-3 -right-3 h-16 w-16 opacity-10"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <path
                        d="M18 12c-5.523 0-10 4.477-10 10v14h14V22H16c0-2.21 1.79-4 4-4V12zm22 0c-5.523 0-10 4.477-10 10v14h14V22H38c0-2.21 1.79-4 4-4V12z"
                        fill="#F26B1D"
                      />
                    </svg>

                    {/* Header: avatar + name/role */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="h-14 w-14 rounded-full object-cover ring-2 ring-[#F26B1D]/60"
                        />
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#F26B1D]" />
                      </div>
                      <div>
                        <h4 className="text-base md:text-lg font-semibold text-[#1E1E1E]">
                          {t.name}
                        </h4>
                        <p className="text-sm text-gray-500">{t.position}</p>
                        <p className="text-xs text-gray-400">{t.year}</p>
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-700">
                      {t.quote}
                    </p>

                    {/* Accent bar */}
                    <div className="mt-6 h-1.5 w-16 rounded-full bg-[#F26B1D]/80" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        {/* Controls */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6
            h-10 w-10 rounded-full bg-white border border-gray-200 shadow hover:shadow-md
            text-gray-700 hover:text-[#F26B1D] transition"
          >
            <span className="inline-block -translate-y-px">←</span>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6
            h-10 w-10 rounded-full bg-white border border-gray-200 shadow hover:shadow-md
            text-gray-700 hover:text-[#F26B1D] transition"
          >
            <span className="inline-block -translate-y-px">→</span>
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? "w-6 bg-[#F26B1D]"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
