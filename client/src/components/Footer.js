import React from "react";

const Footer = ({ ref }) => {
  return (
    <footer className="bg-blue-200 footer" ref={ref}>
      <div className=" mx-auto text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className={`link `}
          href="https://kjh311.github.io/new_portfolio/"
          target="_blank"
          rel="noreferrer"
        >
          Kevin Huelsmann
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
