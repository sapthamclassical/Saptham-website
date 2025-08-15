import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", type: "route", path: "/" },
    { name: "Vision", type: "anchor", path: "vision" },
    { name: "Office Bearers", type: "anchor", path: "office-bearers" },
    { name: "Events", type: "route", path: "/events" },
    { name: "Gallery", type: "route", path: "/gallery" },
    { name: "Contact Us", type: "route", path: "/contact" },
  ];

  // Smooth scroll for internal anchors
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src={logo}
                alt="Saptham Logo"
                className="h-16 w-16 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) =>
                item.type === "route" ? (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 text-base font-medium text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (location.pathname !== "/") {
                        // redirect to home, then scroll
                        window.location.href = `/#${item.path}`;
                      } else {
                        handleScroll(item.path);
                      }
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 text-base font-medium text-[#1E1E1E] hover:text-[#F26B1D] transition-all duration-300"
                  >
                    {item.name}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#1E1E1E] hover:text-[#F26B1D] focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-base font-medium text-[#1E1E1E] hover:text-[#F26B1D]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => {
                    if (location.pathname !== "/") {
                      window.location.href = `/#${item.path}`;
                    } else {
                      handleScroll(item.path);
                    }
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-[#1E1E1E] hover:text-[#F26B1D]"
                >
                  {item.name}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
