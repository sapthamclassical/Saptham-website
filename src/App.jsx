import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import OfficeBearers from "./components/OfficeBearers";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// Dummy pages
const Events = () => <div className="p-10 text-center text-2xl">Events Page</div>;
const Gallery = () => <div className="p-10 text-center text-2xl">Gallery Page</div>;
const Contact = () => <div className="p-10 text-center text-2xl">Contact Us Page</div>;

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20">
        <Routes>
          {/* Home page renders all sections */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <section id="vision">
                  <Vision />
                </section>
                <section id="office-bearers">
                  <OfficeBearers />
                </section>
                <Testimonials />
              </>
            }
          />

          {/* Other dedicated pages */}
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
