import "./EditTask.css";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { auth } from "../../firebase/config";
import Loading from "../../comp/loading";
import TitleSection from "./1-TitleSection";
import SubTashsSection from "./2-SubTashsSection";
import BtnsSection from "./3-btnsSection";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";

const EditTask = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  let { id } = useParams();
  // 1-Title Section //
  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, id), {
      title: eo.target.value,
    });
  };

  // 2-sub-task section //
  const completedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, id), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, id), {
        completed: false,
      });
    }
  };
  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, id), {
      detatils: arrayRemove(item),
    });
  };
  // 3-Bts section //
  const [showData, setshowData] = useState(false);
  const deleteBtn = async () => {
    setshowData(true);
    await deleteDoc(doc(db, user.uid, id));
    navigate("/", { replace: true });
  };

  if (error) {
    return <h2>error: {error.message}</h2>;
  }

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />

        {showData ? (
          <main >
            {/* <div style={{marginBottom:"700px"}}> */}
                {/* <ReactLoading
                className="loading"
              type={"spin"}
              color={"white"}
              height={77}
              width={77}
               
            /> */}
            {/* </div> */}
          
          </main>
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TitleSection user={user} id={id} titleInput={titleInput} />

            {/* Sub-tasks section */}
            <SubTashsSection
              user={user}
              id={id}
              completedCheckbox={completedCheckbox}
              trashIcon={trashIcon}
            />
            {/* Add-more BTN && Delete BTN */}

            <BtnsSection user={user} id={id} deleteBtn={deleteBtn} />
          </div>
        )}

        <Footer  />
      </div>
    );
  }
};

export default EditTask;
