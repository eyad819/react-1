import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Link } from "react-router-dom";
import Loading from "../comp/loading";
import { auth } from "../firebase/config";
import { Helmet } from "react-helmet-async";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [user, loading] = useAuthState(auth);
  const { t} = useTranslation();

  const navigate = useNavigate();
  const [haserror, sethaserror] = useState(false);
  const [firebase, setfirebase] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setuserName] = useState("");
  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });
  if (loading) {
    return <Loading />;
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>
        <Header />

        <main>
          <form>
            <p  style={ {  fontSize: "23px", marginBottom: "22px" }}>
              {t("create-acc")} 
            </p>
            <input
              onChange={(eo) => {
                setuserName(eo.target.value);
              }}
              required
              type="text"
              placeholder="UserName :"
            />

            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              required
              type="email"
              placeholder="Email :"
            />
            <input
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
              required
              type="password"
              placeholder="Password :"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();
                createUserWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    sendEmailVerification(auth.currentUser).then(() => {
                      console.log("Email verification sent!");
                    });
                    updateProfile(auth.currentUser, {
                      displayName: userName,
                    })
                      .then(() => {
                        navigate("/");
                      })
                      .catch((error) => {
                        // An error occurred
                        // ...
                      });

                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    sethaserror(true);

                    switch (errorCode) {
                      case "auth/invalid-email":
                        setfirebase("Wrong Email");
                        break;

                      case "auth/user-not-found":
                        setfirebase("Wrong Email");
                        break;

                      case "auth/wrong-password":
                        setfirebase("Wrong Password");
                        break;

                      case "auth/too-many-requests":
                        setfirebase(
                          "Too many requests, please try aganin later"
                        );
                        break;

                      default:
                        setfirebase("Please check your email & password");
                        break;
                    }
                    // ..
                  });
              }}
            >
              {t("signup")}
            </button>
            <p className="account">
              {t("have-acc")} <Link to="/signin">{t("signin")}</Link>
            </p>
            {haserror && <h2>{firebase}</h2>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
