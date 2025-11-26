import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", type: "route", path: "/" },
    { name: "Vision", type: "anchor", path: "vision" },
    { name: "Office Bearers", type: "anchor", path: "office-bearers" },
    { name: "Events", type: "route", path: "/events" },
    { name: "Gallery", type: "route", path: "/gallery" },
    { name: "Contact Us", type: "route", path: "/contact" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // Only track scroll on home page
    if (location.pathname === "/") {
      const handleScrollEvent = () => {
        setScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScrollEvent);
      return () => window.removeEventListener("scroll", handleScrollEvent);
    } else {
      setScrolled(true); // Always show on other pages
    }
  }, [location.pathname]);

  // Determine navbar classes
  const navbarClasses =
  location.pathname === "/" && !scrolled
    ? "absolute top-0 w-full z-50 transition-all duration-300 bg-transparent h-20 justify-center"
    : "fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md h-16 justify-between";

  return (
    <div className={navbarClasses}>
      <div className="flex items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
            <img src={logo} alt="Saptham Logo" className="h-12 w-12 object-contain" />
          </Link>
        </div>

        {/* Desktop Menu */}
        {(scrolled || location.pathname !== "/") && (
          <div className="hidden md:flex ml-auto">
            <ul className="menu menu-horizontal px-1 font-medium space-x-4">
              {navItems.map((item) =>
                item.type === "route" ? (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        if (location.pathname !== "/") {
                          window.location.href = `/#${item.path}`;
                        } else {
                          handleScroll(item.path);
                        }
                      }}
                      className="text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Mobile Menu Button */}
        {(scrolled || location.pathname !== "/") && (
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle text-[#1E1E1E]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full shadow-md md:hidden bg-white">
            <ul className="menu menu-vertical px-2 py-4 space-y-1 font-medium">
              {navItems.map((item) =>
                item.type === "route" ? (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        if (location.pathname !== "/") {
                          window.location.href = `/#${item.path}`;
                        } else {
                          handleScroll(item.path);
                        }
                        setIsOpen(false);
                      }}
                      className="w-full text-left text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
