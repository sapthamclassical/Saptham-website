import React from "react";
import EventCard from "./EventCard";
  const events = [
        {
            title: "Techofes",
            description:
                "Saptham proudly performed during the inauguration of Techofes, the flagship inter-college cultural festival of CEG, bringing music, dance, and expression to kick off the grand celebrations.",
        },
        {
            title: "Agni",
            description:
                "Saptham performed at the inaugural ceremony of Agni, CEG’s vibrant intra-college cultural fest, adding an artistic touch to the celebrations.",
        },
        {
            title: "Vizha",
            description:
                "Saptham contributed to the inauguration of Vizha — the freshers day of CEG — celebrating creativity, tradition, and talent through music and dance.",
        },
        {
            title: "Sampradha",
            description:
                "Saptham performed at the opening of Sampradha, a intra-college cultural fest of ACT that showcases heritage and artistry through expressive dance and music.",
        },
        {
            title: "Kalakrithi",
            description:
                "Saptham was part of the inaugural performances of Kalakrithi, the renowned inter-college festival of ACT, adding vibrant music and dance.",
        },
        {
            title: "Symposium Performances",
            description:
                "Saptham has performed during symposium events at both CEG & ACT, enriching academic gatherings with cultural performances.",
        },
    ];
const GeneralEvents = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
            Other <span className="text-orange-500">Events & Performances</span>
          </h2>
          <div className="mt-2 h-1 w-24 bg-orange-500 mx-auto"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              hideMeta={true}   // <— tells card to hide date & location
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneralEvents;
