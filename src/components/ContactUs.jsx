import React from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold ">
          Contact <span className="text-orange-500">Us</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-orange-500 mx-auto"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT SIDE — DETAILS */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-[#763C91]">Reach Out to Us</h3>

          <p className="text-gray-700">
            The Official Classical Arts Club of Anna University
          </p>

          <div className="space-y-4 text-gray-700">
            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="text-orange-500" />
              <p>
                Email:{" "}
                <a
                  href="mailto:sapthamclassical@gmail.com"
                  className="text-orange-500 hover:underline"
                >
                  sapthamclassical@gmail.com
                </a>
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-orange-500" />
              <p>
                Phone:
                <br />
                <a
                  href="tel:+919444499090"
                  className="text-orange-500 hover:underline"
                >
                  Ahalya: +91 94444 99090
                </a>
                <br />
                <a
                  href="tel:+919842228645"
                  className="text-orange-500 hover:underline"
                >
                  Soumya: +91 98422 28645
                </a>
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <MapPin className="text-orange-500" />
              <p>
                Anna University, Chennai  
                <br />
                Tamil Nadu, India
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold mt-6 mb-3 text-[#763C91]">
                Follow Us
              </h4>

              <div className="flex space-x-5">
                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/sapthamceg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500"
                >
                  <Facebook size={26} />
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/sapthamclassical?igsh=NGNobHdwc3k5b25l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500"
                >
                  <Instagram size={26} />
                </a>

                {/* YOUTUBE */}
                <a
                  href="https://www.youtube.com/@SapthamClassicalAU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500"
                >
                  <Youtube size={26} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="card bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
          <form className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Your Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Message</span>
              </label>
              <textarea
                rows="4"
                className="textarea textarea-bordered w-full"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#763C91] text-white hover:bg-orange-500 border-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* MAP */}
      <div className="mt-16">
        <iframe
          title="Saptham Location Map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7774.791347884569!2d80.2365983!3d13.0104565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700035eebd9%3A0x7984c41bf20d3100!2sCEG%20Square!5e0!3m2!1sen!2sin!4v1764260329277!5m2!1sen!2sin"
        className="w-full h-72 rounded-2xl shadow-lg border"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
