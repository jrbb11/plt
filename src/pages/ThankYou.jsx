// src/pages/ThankYou.jsx
import React from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Pet.Love.Travel logo

export default function ThankYou() {
  const voucherCode = localStorage.getItem("voucherCode");

  const socials = [
    { name: "Facebook",  url: "https://www.facebook.com/PetLoveTravel/" },
    { name: "Instagram", url: "https://www.instagram.com/pet.love.travel/" },
    { name: "TikTok",    url: "https://www.tiktok.com/@pet.love.travel" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#17C0EB] p-6">
      <h1 className="text-4xl font-bold mb-4 text-white">Thank you for registering!</h1>

      {voucherCode && (
        <p className="mb-6 text-2xl text-white">
          Your voucher code is <span className="font-mono text-white bg-black bg-opacity-20 px-2 rounded">{voucherCode}</span>
        </p>
      )}

      <p className="mb-8 text-center max-w-lg text-white text-lg">
        We’ve sent a confirmation link to your email. Meanwhile, follow us:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-8">
        {socials.map(s => (
          <div key={s.name} className="flex flex-col items-center">
            <div className="relative bg-white p-6 rounded-xl">
              {/* Larger QR code with embedded logo */}
              <QRCode value={s.url} size={200} />
              <img
                src={logo}
                alt="logo"
                className="absolute top-1/2 left-1/2 w-16 h-16 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <p className="mt-4 font-medium text-white text-lg">{s.name}</p>
          </div>
        ))}
      </div>

      {/* Register new button */}
      <Link
        to="/event-register"
        className="btn-brand mt-6 px-8 py-4 rounded-lg text-xl"
      >
        Register New
      </Link>
    </div>
  );
}
