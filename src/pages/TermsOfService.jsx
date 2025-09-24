import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Pet.Love.Travel" className="h-10 rounded-full" />
              <span className="text-xl font-bold text-[#17C0EB]">Pet.Love.Travel</span>
            </Link>
            <Link to="/" className="text-[#17C0EB] hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-[#17C0EB] mb-8">Terms of Service</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Pet.Love.Travel ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Pet.Love.Travel provides pet transportation services across Metro Manila and surrounding areas. Our services include safe and reliable transport for pets, including dogs, cats, and other small animals, with proper care and attention throughout the journey.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Pet Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate and complete information about your pet</li>
                <li>Ensure your pet is healthy and fit for travel</li>
                <li>Provide current vaccination records and health certificates</li>
                <li>Inform us of any special needs, medications, or behavioral issues</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">3.2 Booking and Payment</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Book services in advance with accurate pickup and delivery information</li>
                <li>Make payments according to the agreed schedule</li>
                <li>Notify us immediately of any changes or cancellations</li>
                <li>Be available for pickup and delivery at the scheduled times</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Service Limitations</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We reserve the right to refuse service to aggressive or dangerous animals</li>
                <li>Pets must be properly contained in appropriate carriers or restraints</li>
                <li>We may require additional documentation for certain breeds or destinations</li>
                <li>Service availability may be limited during extreme weather conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Liability and Insurance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we take every precaution to ensure the safety of your pets, please note:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We maintain appropriate insurance coverage for pet transportation</li>
                <li>Our liability is limited to the cost of veterinary care for injuries sustained during transport</li>
                <li>We are not responsible for pre-existing conditions or stress-related issues</li>
                <li>Clients are responsible for ensuring their pets are fit for travel</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cancellation and Refund Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Cancellation by Client</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Free cancellation up to 24 hours before scheduled pickup</li>
                <li>50% refund for cancellations within 24 hours</li>
                <li>No refund for no-shows or same-day cancellations</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">6.2 Cancellation by Pet.Love.Travel</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Full refund if we cancel due to weather or safety concerns</li>
                <li>Alternative arrangements will be offered when possible</li>
                <li>No additional charges for rescheduling due to our cancellation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Pet.Love.Travel and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the Philippines. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of Metro Manila, Philippines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> petlovetravelph@gmail.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 0912-345-6789</p>
                <p className="text-gray-700"><strong>Address:</strong> Metro Manila, Philippines</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2025 Pet.Love.Travel | All Rights Reserved
          </p>
          <div className="mt-4 space-x-6">
            <Link to="/privacy-policy" className="text-[#17C0EB] hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-[#17C0EB] hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
