import React from "react";
import { useTranslation } from "react-i18next";

export const Translate = () => {
  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button className="btn btn-ghost" onClick={() => handleClick("en")}>
        ENG
      </button>
      <button className="btn btn-ghost" onClick={() => handleClick("ge")}>
        GEO
      </button>
    </div>
  );
};
