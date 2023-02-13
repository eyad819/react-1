
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
const Header = () => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);
  const { theme, toggelTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">
      <header className="hide-when-mobile header ">
        <h1>
          <NavLink className="logo" to="/">
            My Tasks
          </NavLink>
        </h1>

        <i
          onClick={() => {
            toggelTheme(theme === "light" ? "dark" : "light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggelTheme(theme === "light" ? "dark" : "light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul style={{justifyContent: "center"}}   className="flex ul">
          <li className="main-list lang">
            <p>{t("language")}</p>

            <ul className="lang-box">
              <li onClick={() => {
                i18n.changeLanguage('ar')
              }} dir="rtl">
                <p>العربية</p>
                {i18n.language ==='ar' && <i className="fa-solid fa-check"></i>}
              </li>
              <li onClick={() => {
                i18n.changeLanguage('en')
              }}>
                <p>English </p>
                {i18n.language ==='en' && <i className="fa-solid fa-check"></i>}
              </li>
              <li onClick={() => {
                i18n.changeLanguage('fr')
              }}>
                <p>French </p>
                {i18n.language ==='fr' && <i className="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("signup")}
              </NavLink>
            </li>
          )}
          {user && (
            <li className="main-list ">
              <button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                }}
                className="main-link signout"
              >
                {t("signout")}
              </button>
            </li>
          )}
          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
              {t("support")}
              </NavLink>
            </li>
          )}
    
          {user && (
            <li className="main-list profile">
              <NavLink className="main-link" to="/profile">
              {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
