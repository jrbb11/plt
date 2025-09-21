import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-[#17C0EB] mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Pet.Love.Travel ("we," "our," or "us"). We are committed to protecting your privacy and the privacy of your pets. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our pet transport services and website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Name, email address, phone number, and mailing address</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Account credentials and profile information</li>
                <li>Emergency contact information</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.2 Pet Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Pet's name, breed, age, and weight</li>
                <li>Medical records and vaccination certificates</li>
                <li>Special care instructions and dietary requirements</li>
                <li>Photographs of your pet (for identification purposes)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.3 Service Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Pickup and delivery locations</li>
                <li>Travel dates and times</li>
                <li>Service preferences and special requests</li>
                <li>Communication records and service feedback</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">2.4 Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address, browser type, and device information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and manage pet transport services</li>
                <li>Process bookings and payments</li>
                <li>Communicate with you about your pet's journey</li>
                <li>Ensure the safety and well-being of your pets</li>
                <li>Improve our services and customer experience</li>
                <li>Send important updates and notifications</li>
                <li>Comply with legal obligations and regulations</li>
                <li>Prevent fraud and ensure service security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Service Providers</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Transportation partners and drivers</li>
                <li>Payment processors</li>
                <li>Veterinary services (when required)</li>
                <li>Technology service providers</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.2 Legal Requirements</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>When required by law or legal process</li>
                <li>To protect our rights and prevent fraud</li>
                <li>In emergency situations involving pet safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                <li>Encryption of sensitive data</li>
                <li>Secure data storage and transmission</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to improve your experience on our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party services. This Privacy Policy does not apply to those services. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Pet transport records may be kept for safety and regulatory purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
