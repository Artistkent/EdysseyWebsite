// app/components/Footer.tsx
import { FaDiscord, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export default function Footer() {

  

  return (
    <footer className="relative  border-t border-white/50 text-white ">
      <div className=" z-50  py-12 pb-2 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Left: Links */}
        <div>
          <nav className="flex flex-wrap gap-4 text-sm mb-4 md:mb-0">
            {["About", "DAO", "Tokenomics", "Contact", "Legal"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/80 hover:text-white underline-offset-4 hover:underline transition"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} Edyssey. All rights reserved.
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-6">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaXTwitter className="text-white hover:text-yellow-300 text-xl transition" />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FaDiscord className="text-white hover:text-yellow-300 text-xl transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="text-white hover:text-yellow-300 text-xl transition" />
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
}
  