// Home.js
import React, { useRef, useEffect, useState } from "react";
import "..//App.js"; // Ensure you import your CSS

function Home() {
  // Refs for elements
  const navbarRef = useRef(null);
  const overlayRef = useRef(null);
  const headerRef = useRef(null);
  const backTopBtnRef = useRef(null);

  // State for active classes
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle Navbar visibility
  const toggleNavbar = () => {
    setIsNavbarActive((prev) => !prev);
  };

  // Close Navbar function
  const closeNavbar = () => {
    setIsNavbarActive(false);
  };

  // Active element function based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Set up event listeners
  useEffect(() => {
    // Scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup event listeners on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <header
        ref={headerRef}
        data-header
        className={isScrolled ? "header active" : "header"}
      >
        {/* Navbar */}
        <nav
          ref={navbarRef}
          data-navbar
          className={isNavbarActive ? "navbar active" : "navbar"}
        >
          <ul>
            <li>
              <a data-nav-link href="#home" onClick={closeNavbar}>Home</a>
            </li>
            <li>
              <a data-nav-link href="#about" onClick={closeNavbar}>About</a>
            </li>
            <li>
              <a data-nav-link href="#contact" onClick={closeNavbar}>Contact</a>
            </li>
          </ul>
        </nav>

        {/* Navbar Toggler */}
        <button data-nav-toggler onClick={toggleNavbar}>
          Toggle Navbar
        </button>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        data-overlay
        className={isNavbarActive ? "overlay active" : "overlay"}
        onClick={closeNavbar}
      />

      {/* Back to Top Button */}
      <button
        ref={backTopBtnRef}
        data-back-top-btn
        className={isScrolled ? "back-top-btn active" : "back-top-btn"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Back to Top
      </button>
    </div>
  );
}

export default Home;
