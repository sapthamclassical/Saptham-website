import React from "react";

const EventCard = ({ title, date, location, description,hideMeta }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-100 bg-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      
      {/* Hover overlay gradient */}
      <div className="absolute inset-0 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-400 before:via-amber-300 before:to-transparent before:opacity-0 before:transition-all before:duration-500 group-hover:before:opacity-30"></div>

      {/* Card content */}
      <div className="relative card-body p-6 flex flex-col justify-between h-full">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Hide this for other events */}
        {!hideMeta && (
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-semibold">Date:</span> {date} <br />
            <span className="font-semibold">Location:</span> {location}
          </p>
        )}

        {/* Description */}
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>

        {/* Optional Button */}
        {/* <button className="btn btn-primary mt-2">Learn More</button> */}
      </div>
    </div>
  );
};

export default EventCard;
