import Header from "../../comp/header";
import "./Home.css";
import AllTasks from "./AllTasks";
import HomeModel from "./model";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Footer from "../../comp/Footer";
import Loading from "../../comp/loading";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { useTranslation } from "react-i18next";


const Home = () => {
  const { t, i18n } = useTranslation();
  const [title, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [showLoading, setshowLoading] = useState(false);
  const [showMessage, setshowMessage] = useState(false);
  const [showModel, setshowModel] = useState(false);
  const forgotPassword = () => {
    setshowModel(true);
  };

  const [user, loading, error] = useAuthState(auth);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // ...
    });
  };
  // function of model //
  const closeModel = () => {
    setshowModel(false);
    setsubTask("");
    setarray([]);
    settitle('')
  };
  const AddBtn = (eo) => {
if (!array.includes(subTask)) {
  array.push(subTask);
  
}
    setsubTask("");
    eo.preventDefault();
  };

  const titleInput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsInput = (eo) => {
    setsubTask(eo.target.value);
  };

  const submitBtnt = async (eo) => {
if (title) {
  eo.preventDefault();
  setshowLoading(true);
  const taskId = new Date().getTime();
  await setDoc(doc(db, user.uid, `${taskId}`), {
    title: title,
    detatils: array,
    id: taskId,
    completed: false
  });
  setshowLoading(false);

  setarray([]);
  settitle("");
  setshowModel(false);
  setshowMessage(true);
  setTimeout(() => {
    setshowMessage(false);
  }, 4000);

}
  };

  if (error) {
    return <h2>error: {error.message}</h2>;
  }

  if (loading) {
    return <Loading  />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>
        <Header />
        <main>
          <p className="pls">
            {t("Please")} {" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              {t("signin")}
            </Link>{" "}
            {t("to-continue")}{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>
        <Footer />
      </>
    );
  }
  // unVerified email
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          <main>
            <p>
              {" "}
              {t("welcome")}: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>
            <p>{t("verify")} ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              {t("send-email")}
            </button>
          </main>
          <Footer />
        </>
      );
    }
    // Verified email
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>
          <Header />
          <main style={{height:"40%"}} className="home">
            {/* SHOW all tasks */}
          <AllTasks user={user} />
            {/* Add new task BTN */}
            <section className="mt">
              <button
              dir="auto"
                onClick={() => {
                  forgotPassword();
                }}
                className="add-task-btn"
              >
              {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche"}<i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {showModel && (
              <HomeModel
                closeModel={closeModel}
                detailsInput={detailsInput}
                titleInput={titleInput}
                AddBtn={AddBtn}
                submitBtnt={submitBtnt}
                title={title}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}
            <p
              style={{
                right: showMessage ? "20px" : "-100vw",
              }}
              className="show-message"
            >
              Task added successfully
              <i className="fa-regular fa-circle-check"></i>
            </p>
          </main>
          <Footer />
        </>
      );
    }
  }
};
export default Home;
