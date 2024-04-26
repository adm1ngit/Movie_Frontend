import React from "react";

function CodeWriter() {
  return  <p id="copyright-year">.CodeWriter@{new Date().getFullYear()}. Developed By:Adiljonov </p>;
}

const Footer = () => {
  return (
    <div className=" itmes-center justify-center text-gray-400 my-6 hidden md:flex">
      <CodeWriter/>
    </div>
  );
};

export default Footer;
