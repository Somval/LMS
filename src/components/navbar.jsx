import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fff8f6] z-50 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-[#11182f]"
        >
          LMS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:ml-8 lg:flex lg:flex-1 lg:items-center lg:gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/programs"
            className="text-sm font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Our Programs
          </Link>

          <Link
            to="/success-stories"
            className="text-sm font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Success Stories
          </Link>

          <Link
            to="/pricing"
            className="text-sm font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Pricing
          </Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Link
            to="/student-auth/login"
            className="text-sm font-semibold text-[#0878b5] transition hover:text-[#065f8f]"
          >
            LOGIN
          </Link>

          <Link
            to="/RegistrationHome"
            className="flex items-center gap-3 rounded-full bg-[#30317f] px-5 py-2 text-sm font-semibold text-[#f5d900] transition hover:bg-[#252665]"
          >
            <span>Get Started</span>
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 lg:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#11182f] transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#11182f] transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#11182f] transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#fff8f6] border-b border-gray-200 px-6 py-6 shadow-md lg:hidden flex flex-col gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-base font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/programs"
            onClick={closeMenu}
            className="text-base font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Our Programs
          </Link>

          <Link
            to="/success-stories"
            onClick={closeMenu}
            className="text-base font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Success Stories
          </Link>

          <Link
            to="/pricing"
            onClick={closeMenu}
            className="text-base font-medium text-[#11182f] transition hover:text-blue-600"
          >
            Pricing
          </Link>

          <div className="pt-4 border-t border-gray-200 flex flex-col gap-4">
            <Link
              to="/student-auth/login"
              onClick={closeMenu}
              className="text-base font-semibold text-[#0878b5] transition hover:text-[#065f8f]"
            >
              LOGIN
            </Link>

            <Link
              to="/RegistrationHome"
              onClick={closeMenu}
              className="flex items-center justify-center gap-3 rounded-full bg-[#30317f] px-6 py-2.5 text-sm font-semibold text-[#f5d900] transition hover:bg-[#252665]"
            >
              <span>Get Started</span>
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}