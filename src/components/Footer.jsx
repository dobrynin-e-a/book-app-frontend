import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import footerLogo from "../assets/footer-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img alt="Logo" className="mb-5 w-36" src={footerLogo} />
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <a className="hover:text-primary" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#about">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and
            offers!
          </p>
          <div className="flex">
            <input
              className="w-full px-4 py-2 rounded-l-md text-black bg-white"
              placeholder="Enter your email"
              type="email"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark text-black cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a className="hover:text-primary" href="#privacy">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="hover:text-primary" href="#terms">
              Terms of Service
            </a>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            className="hover:text-primary"
            href="https://facebook.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFacebook size={24} />
          </a>
          <a
            className="hover:text-primary"
            href="https://twitter.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTwitter size={24} />
          </a>
          <a
            className="hover:text-primary"
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
