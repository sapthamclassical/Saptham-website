import React from "react";
import EventCard from "./EventCard";
  const events = [
        {
            title: "Techofes",
            description:
                "Saptham proudly performed during the inauguration of Techofes, the flagship inter-college cultural festival of CEG, bringing music, dance, and expression to kick off the grand celebrations.",
            images: ["/src/assets/Gallery/General/1.webp", "/src/assets/Gallery/General/2.webp"],
        },
        {
            title: "Agni",
            description:
                "Saptham performed at the inaugural ceremony of Agni, CEG’s vibrant intra-college cultural fest, adding an artistic touch to the celebrations.",
            images: ["/src/assets/Gallery/General/14.webp", "/src/assets/Gallery/General/14.webp"],
        },
        {
            title: "Vizha",
            description:
                "Saptham contributed to the inauguration of Vizha — the freshers day of CEG — celebrating creativity, tradition, and talent through music and dance.",
            images: ["/src/assets/Gallery/General/12.webp", "/src/assets/Gallery/General/12.webp"],
        },
        {
            title: "Sampradha",
            description:
                "Saptham performed at the opening of Sampradha, a intra-college cultural fest of ACT that showcases heritage and artistry through expressive dance and music.",
            images: ["/src/assets/Gallery/General/7.webp", "/src/assets/Gallery/General/8.webp"],
        },
        {
            title: "Kalakrithi",
            description:
                "Saptham was part of the inaugural performances of Kalakrithi, the renowned inter-college festival of ACT, adding vibrant music and dance.",
            images: ["/src/assets/Gallery/General/6.webp", "/src/assets/Gallery/General/10.webp"],
        },
        {
            title: "Symposium Performances",
            description:
                "Saptham has performed during symposium events at both CEG & ACT, enriching academic gatherings with cultural performances.",
            images: ["/src/assets/Gallery/General/5.webp", "/src/assets/Gallery/General/12.webp"],
        },
    ];
const GeneralEvents = () => {
  return (
    <section className="py-20 bg-van-teal bg-opacity-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-van-teal-dark" style={{ fontFamily: 'Cinzel, serif' }}>
            Other <span className="text-manjari-mustard">Events & Performances</span>
          </h2>
          <div className="mt-2 h-1 w-24 bg-van-teal mx-auto"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              hideMeta={true}   // <— tells card to hide date & location
              images={event.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneralEvents;
