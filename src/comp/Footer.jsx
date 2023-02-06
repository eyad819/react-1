import React from "react";
import    './Footer.css';
import '../theme.css';

import { useTranslation } from "react-i18next";
const Footer = () => {
  const { i18n } = useTranslation();

  return (
<div  className="myfooter">

    <footer  className="header">
    {i18n.language === "en" && 'Designed and developed by Eyad'}
    {i18n.language === "ar" && 'تم التصميم والبرمجه بواسطه اياد'}
    {i18n.language   === "fr" && 'Conçu et développé par Eyad'}
      {/* <span>🧡</span> */}
    </footer>



    
</div>
  );
};

export default Footer;
