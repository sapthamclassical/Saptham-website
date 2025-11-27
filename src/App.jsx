import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import OfficeBearers from "./components/OfficeBearers";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
const Contact = () => <div className="p-10 text-center text-2xl">Contact Us Page</div>;

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
