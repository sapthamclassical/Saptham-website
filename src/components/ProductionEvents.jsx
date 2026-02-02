import React from "react";
import EventCard from "./EventCard";

const ProductionEvents = () => {
  const productionEvents = [
    {
      title: "Payanam – The Golden Ages of Tamil Nadu",
      date: "30th April 2022",
      location: "Vivekananda Auditorium",
      description:
        "Payanam celebrated the rich heritage and history of Tamil Nadu through Bharatanatyam, a classical dance form renowned for its finesse and grace. Set to the melodious ragams of Carnatic music, the performance beautifully brought to life stories from the golden ages of Tamil culture.",
      images: ["/src/assets/Gallery/Payanam/3.webp", "/src/assets/Gallery/Payanam/2.webp"],
    },
    {
      title: "Vishwam – The Divine Incarnations of Lord Narayana",
      date: "20th May 2023",
      location: "Vivekananda Auditorium",
      description:
        "Vishwam presented the timeless stories of Lord Vishnu’s ten avatars in a grand musical play. Combining drama, music, and devotion, the production offered an immersive journey into the divine tales of Lord Narayana.",
      images: ["/src/assets/Gallery/Vishwam/1.jpeg", "/src/assets/Gallery/Vishwam/2.jpeg"],
    },
    {
      title: "RasaLeela – A Complete Spectrum of Emotions",
      date: "13th April 2024",
      location: "Vivekananda Auditorium",
      description:
        "RasaLeela explored the full spectrum of human emotions through expressive music and dance. This annual production captured joy, love, longing, and devotion, leaving the audience enchanted by its artistry and storytelling.",
      images: ["/src/assets/Gallery/Rasaleela/1.webp", "/src/assets/Gallery/Rasaleela/2.webp"],
    },
    {
      title: "Yaathra – Love, Life & Legacy",
      date: "17th May 2025",
      location: "Vivekananda Auditorium",
      description:
        "Yaathra wove together themes of love, longing, and devotion, presenting a journey of emotions and timeless stories. With music, movement, and expressive performances, the production offered a reflective and captivating experience for all.",
      images: ["/src/assets/Gallery/Yaathra/8.webp", "/src/assets/Gallery/Yaathra/8.webp"],
    },
  ];

  return (
    <section className="py-20 bg-van-teal bg-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-van-teal-dark font-heading">
            Saptham's <span className="text-manjari-mustard">Annual Production</span>
          </h2>
          <div className="mt-2 h-1 w-24 bg-van-teal mx-auto"></div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {productionEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
              images={event.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionEvents;
