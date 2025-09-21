import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo.png";
import "../index.css";
import QuotationSection from "../components/QuotationSection";



export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    }, []);

    // Close mobile menu on scroll
    useEffect(() => {
      const handleScroll = () => {
        if (isOpen) {
          setIsOpen(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 shadow-md fixed w-full bg-white z-50">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Pet.Love.Travel" className="h-10 rounded-full transition-transform duration-300 hover:scale-110" />
          <span className="text-xl font-bold text-[#17C0EB]">Pet.Love.Travel</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-[#17C0EB] transition">Home</a>
          <a href="#services" className="hover:text-[#17C0EB] transition">Services</a>
          <a href="#howitworks" className="hover:text-[#17C0EB] transition">How It Works</a>
          <a href="#contact" className="hover:text-[#17C0EB] transition">Contact</a>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-[#17C0EB] transition">Dashboard</Link>
              <button 
                onClick={() => supabase.auth.signOut()}
                className="hover:text-[#17C0EB] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-[#17C0EB] transition">Login</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6 text-[#17C0EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <Link to="/login" className="btn-brand hidden md:inline-block">
  Book a Ride
</Link>

      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-4 right-4 bg-white shadow-lg rounded-lg z-40 text-center animate-fadeIn p-4">
          <a href="#home" className="block py-3 border-b hover:text-[#17C0EB]" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#services" className="block py-3 border-b hover:text-[#17C0EB]" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#howitworks" className="block py-3 border-b hover:text-[#17C0EB]" onClick={() => setIsOpen(false)}>How It Works</a>
          <a href="#contact" className="block py-3 border-b hover:text-[#17C0EB]" onClick={() => setIsOpen(false)}>Contact</a>
          <Link to="/login" className="block btn-brand w-full mt-4" onClick={() => setIsOpen(false)}>
            Book Now
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-[#17C0EB] to-[#129BB3] text-white pt-24">
        <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-6 transform transition duration-700 hover:scale-105 animate-fadeIn">
          <img src={logo} alt="Pet.Love.Travel" className="h-28" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 animate-fadeIn">Your Trusted Pet Transport Service</h1>
        <p className="max-w-xl text-lg mb-6 animate-fadeIn">
          Safe, reliable, and loving transport for your pets across Metro Manila and nationwide — via car, ferry, or plane.
        </p>
        <Link to="/login" className="btn-brand text-lg px-6 py-3 bg-white text-[#17C0EB] hover:bg-gray-100 transition duration-300">
          Book Now
        </Link>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 max-w-5xl mx-auto animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#17C0EB]">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="transition-transform duration-500 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Metro Manila Transport</h3>
            <p>Fast and safe transport within Metro Manila and nearby areas.</p>
          </div>
          <div className="transition-transform duration-500 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Provincial & Long Distance</h3>
            <p>We handle provincial trips with care, including ferry and car transport.</p>
          </div>
          <div className="transition-transform duration-500 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Air Travel for Pets</h3>
            <p>Arranging secure plane transport for your pets nationwide.</p>
          </div>
        </div>
      </section>

      {/* ⭐ Quotation Section */}
      <QuotationSection />

      {/* How It Works */}
      <section id="howitworks" className="bg-gray-50 py-16 px-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#17C0EB]">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="transition-transform duration-500 hover:scale-110">
              <span className="text-4xl font-bold text-[#17C0EB]">{step}</span>
              <p className="mt-2">
                {step === 1 && "Contact Us / Book"}
                {step === 2 && "We Pick Up Your Pet"}
                {step === 3 && "Safe & Comfortable Journey"}
                {step === 4 && "Drop-off at Destination"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-[#17C0EB] mb-4">Get in Touch</h2>
        <p className="mb-2">📞 0912-345-6789</p>
        <p className="mb-4">📩 petlovetravelph@gmail.com</p>
        <a href="https://facebook.com/petlovetravelph" target="_blank" rel="noopener noreferrer" className="btn-brand transition hover:scale-105">
          Message Us on Facebook
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4">© 2025 Pet.Love.Travel | All Rights Reserved</p>
          <div className="space-x-6">
            <Link to="/privacy-policy" className="text-[#17C0EB] hover:underline">
              Privacy Policy
            </Link>
            <a href="#contact" className="text-[#17C0EB] hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
