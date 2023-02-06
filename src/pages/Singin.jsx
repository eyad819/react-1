import Header from "../comp/header";
import Footer from "../comp/Footer";
import Model from "../Shared/Model";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const { t, i18n } = useTranslation();


  const signInBTN = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;

        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/user-not-found":
            setfirebaseError("Wrong Email");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong Password");
            break;

          case "auth/too-many-requests":
            setfirebaseError("Too many requests, please try aganin later");
            break;

          default:
            setfirebaseError("Please check your email & password");
            break;
        }
      });
  };


  const closeModel = () => {
    setshowModel(false);
  }
  const [showSendEmail, setshowSendEmail] = useState(false);
const [resetPass, setresetPass] = useState("");
  const [showModel, setshowModel] = useState(false);
  const forgotPassword = () => {
    setshowModel(true);
  };
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showModel && (
        <Model colseModel={closeModel}>
              <input
        onChange={(eo) => {
          setresetPass(eo.target.value);
        }}
        required
        placeholder=" E-mail : "
        type="email"
      />
      <button
        onClick={(eo) => {
          eo.preventDefault();

          sendPasswordResetEmail(auth, resetPass)
            .then(() => {
              console.log("send email");
              setshowSendEmail(true);
            })
            .catch((error) => {
              // ..
            });
        }}
      >
        {t("reset-pass")}
      </button>
      {showSendEmail && (
        <p className="check-email">
          {t("please-check")}
        </p>
      )}
        </Model>
        )}

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder = 'email :'
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />

          <button
            onClick={(eo) => {
              signInBTN(eo);
            }}
          >
            {t("signin")}
          </button>
          <p className="account">
            {t("new-acc")} <Link to="/signup"> {t("signup")} </Link>
          </p>

          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass"
          >
            {t("forgot-pass")}
          </p>

          {hasError && <h2>{firebaseError}</h2>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
