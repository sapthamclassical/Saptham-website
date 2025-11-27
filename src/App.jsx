import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import OfficeBearers from "./components/OfficeBearers";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
                <section id="testimonials">
                  <Testimonials />
                </section>
              </>
            }
          />

          {/* Other dedicated pages */}
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
