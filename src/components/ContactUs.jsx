import React, { useState } from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mojwgvjb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-heading">
          Contact <span className="text-manjari-mustard">Us</span>
        </h2>
        <div className="mt-2 h-1 w-20 bg-van-teal mx-auto"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT SIDE — DETAILS */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-van-teal font-heading">Reach Out to Us</h3>

          <p className="text-gray-700">
            The Official Classical Arts Club of Anna University
          </p>

          <div className="space-y-4 text-gray-700">
            {/* Email */}
            <div className="flex items-center gap-4">
              <Mail className="text-van-teal" />
              <p>
                Email:{" "}
                <a
                  href="mailto:sapthamclassical@gmail.com"
                  className="text-manjari-mustard hover:underline"
                >
                  sapthamclassical@gmail.com
                </a>
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-van-teal" />
              <p>
                Phone:
                <br />
                <a
                  href="tel:+919444499090"
                  className="text-manjari-mustard hover:underline"
                >
                  Ahalya: +91 94444 99090
                </a>
                <br />
                <a
                  href="tel:+919842228645"
                  className="text-manjari-mustard hover:underline"
                >
                  Soumya: +91 98422 28645
                </a>
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <MapPin className="text-van-teal" />
              <p>
                Anna University, Chennai
                <br />
                Tamil Nadu, India
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-semibold mt-6 mb-3 text-van-teal font-heading">
                Follow Us
              </h4>

              <div className="flex space-x-5">
                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/sapthamceg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-van-teal"
                >
                  <Facebook size={26} />
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/sapthamclassical?igsh=NGNobHdwc3k5b25l"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-van-teal"
                >
                  <Instagram size={26} />
                </a>

                {/* YOUTUBE */}
                <a
                  href="https://www.youtube.com/@SapthamClassicalAU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-van-teal"
                >
                  <Youtube size={26} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="card bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Message</span>
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn w-full bg-van-teal text-white hover:bg-manjari-mustard border-none"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
            )}
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
