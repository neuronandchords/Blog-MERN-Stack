import React from "react";
import Style from "./Footer.module.css";

const Footer = () => (
  <footer className={Style.footer}>
    <ul>
      <li>
        <a
          href="https://www.instagram.com/amaya_srivastava99"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/neuronandchords"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </li>
      <li>
        <a
          href="https://github.com/neuronandchords"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </li>
    </ul>
    <p>Created by Amaya Srivastava</p>
  </footer>
);

export default Footer;
