import React from "react";

const GalleryCarousel = ({ images }) => {
  return (
    <div className="carousel w-full max-w-3xl mx-auto rounded-xl shadow-xl">
      {images.map((img, index) => (
        <div id={`slide-${index}`} key={index} className="carousel-item relative w-full">
          <img src={img} className="w-full object-cover" />

          {/* Prev */}
          <a
            href={`#slide-${index === 0 ? images.length - 1 : index - 1}`}
            className="btn btn-circle absolute left-4 top-1/2 -translate-y-1/2"
          >
            ❮
          </a>

          {/* Next */}
          <a
            href={`#slide-${index === images.length - 1 ? 0 : index + 1}`}
            className="btn btn-circle absolute right-4 top-1/2 -translate-y-1/2"
          >
            ❯
          </a>
        </div>
      ))}
    </div>
  );
};

export default GalleryCarousel;
