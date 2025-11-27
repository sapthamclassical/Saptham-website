import { AnimatedTestimonials } from "./ui/animated-testimonials.jsx";

const Testimonials = () => {
  const testimonials = [
    {
      name: "RESHMA",
      designation: "PRESIDENT '16 - '17",
      quote:
        "Saptham took me from member to President, giving me opportunities, learning experiences, and a space to grow my talent and character. Organising and hosting events shaped me hugely. It is a wonderful platform for those passionate about music and performing arts and wanting to take their skills to a larger audience.",
      src: "/images/testimonials/reshma.jpg",
    },
    {
      name: "VINIKSHA",
      designation: "BATCH OF '22",
      quote:
        "I learnt a lot in dance during my days in Saptham club. The practice sessions before every programme is the best. It was chill, fun and I had the best experience there",
      src: "/images/testimonials/viniksha.jpg",
    },
    {
      name: "SHRADDHA",
      designation: "VICE PRESIDENT '17 - '19",
      quote:
        "Saptham was an ideal platform for anyone who wanted to showcase their talent in the classical arts. As the VP for 2 consecutive academic years I watched the club grow tremendously and am especially proud of how far they've come in the years after I graduated. Onward and upward!",
      src: "/images/testimonials/shraddha.jpg",
    },
    {
      name: "SUSHRUT",
      designation: "MUSIC HEAD '21 - '22",
      quote:
        "Saptham is one club that always feels like home. Saptham grew from being a club no one knew about, to the club that performed its own 1.5 hour special and growing up with that was phenomenal. I met some of the wonderful people I know through Saptham, and I'll always be a proud Saptham Alumnus!",
      src: "/images/testimonials/sushrut.jpg",
    },
    {
      name: "MEENAKSHI",
      designation: "PRESIDENT '21 - '22",
      quote:
        "Saptham is very close to my heart. This club gave me a platform to experiment and get creative with dance. During the four years, I learnt a lot and performed on various stages, all while creating some great memories with some amazing friends. I also had the opportunity to lead the club as a president and along with my teammates, I got to bring about new changes and ideas as well. My time in Saptham is something I will cherish forever.",
      src: "/images/testimonials/meenakshi.jpg",
    },
    {
      name: "ANANYA",
      designation: "VICE PRESIDENT '21 - '22",
      quote:
        "I'm Ananya Ravindran and I'm currently a music therapist at VHS hospital, hoping to pursue masters by research in neuroscience and music therapy. My time as the vice president of Saptham was one of the best experiences of my college life. With countless memories and unforgettable experiences, I got to learn, explore and lead a team, along with the club's president, to help it reach new heights. Working with like minded people gave me a sense of satisfaction and happiness, leading to many successful performances.",
      src: "/images/testimonials/ananya.jpg",
    },
    {
      name: "ROSE",
      designation: "BATCH OF '22",
      quote:
        "I joined Saptham in my second year and first performed at Agni'19. After Covid, I became more involved—helping with Saptham’s first dance drama and performing at Techofes’22. I met amazing people and made meaningful connections. My only regret is not being more involved earlier.",
      src: "/images/testimonials/rose.jpg",
    },
    {
      name: "SAKTHI",
      designation: "VICE PRESIDENT '20",
      quote:
        "SAPTHAM is an excellent organisation to explore artistic aspects. I served as secretary for a year and vice president the next. Organising performances, rehearsals, and events created unforgettable, fun-filled memories and experiences. The club provided a platform to showcase talents and connect with like-minded individuals passionate about Indian classical arts. Grateful for the growth and friendships formed during my time in SAPTHAM.",
        src: "/images/testimonials/sakthi.jpg",
    },
    {
      name: "HARINI",
      designation: "VICE PRESIDENT '20 - '21",
      quote:
        "Despite juggling many activities, Saptham was where I felt truly seen. I loved being among people dedicated to Indian classical arts. I interacted with talented artists and helped the club grow, especially during the pandemic when we had to innovate. Saptham gave me some of my best university memories.",
      src: "/images/testimonials/harini.jpg",
    },
  ];

  return (
    <section id="office-bearers" className="py-20 ">
      <div className="text-center mb-12 ">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-800">
          Alumni's <span className="text-orange-500">Testimonials</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
      </div>

      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
};

export default Testimonials;