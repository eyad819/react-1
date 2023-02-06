import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection,  orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AllTasks = ({ user }) => {
  const { i18n } = useTranslation();

  const [opacity, setopacity] = useState(false);
  const [initiaData, setinitiaData] = useState(
    query(collection(db, user.uid), orderBy("id", "asc"))
  );
  const [value, loading, error] = useCollection(
    // @ts-ignore
    initiaData
  );

  const [selectValue, setselectValue] = useState("aaa");
  if (error) {
    return <h1>errorrrrrrrrr</h1>;
  }
  if (loading) {
    return (
      <section style={{marginBottom:"50px"}}>
        <ReactLoading  type={"spin"} color={"white"} height={77} width={77} />
      </section>
    );
  }
  if (value) {
    return (
      <div>
        {/* OPIONS (filtered data) */}
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mtt"
        >
          {selectValue === "aaa" && (
            <div>
              <button
                style={{ opacity: opacity ? "1" : "0.3" }}
                onClick={() => {
                  // @ts-ignore
                  setopacity(true);
                  setinitiaData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus récent"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
              </button>

              <button
                style={{ opacity: opacity ? "0.3" : "1" }}
                onClick={() => {
                  setopacity(false);

                  setinitiaData(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                }}
              >
                {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
                {i18n.language === "fr" && "Le plus ancien"}
              </button>
            </div>
          )}

          <select
            style={{ alignSelf: "flex-end" }}
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setopacity(false);

                setselectValue("aaa");

                setinitiaData(
                  query(collection(db, user.uid), orderBy("id", "asc"))
                );
              } else if (eo.target.value === "bbb") {
                setselectValue("bbb");
                setinitiaData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", true)
                  )
                );
              } else if (eo.target.value === "ccc") {
                setselectValue("ccc");

                setinitiaData(
                  query(
                    collection(db, user.uid),
                    where("completed", "==", false)
                  )
                );
              }
            }}
          >
            <option value="aaa">
              {" "}
              {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "en" && "All Tasks "}
              {i18n.language === "fr" && "Toutes les tâches"}{" "}
            </option>
            <option value="bbb">
              {" "}
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"}
              {i18n.language === "fr" && "Tâches terminées"}{" "}
            </option>
            <option value="ccc">
              {" "}
              {i18n.language === "en" && "Not Completed Tasks"}
              {i18n.language === "ar" && "المهام غير المكتملة"}
              {i18n.language === "fr" && "Tâches non terminées"}{" "}
            </option>
          </select>
        </section>
        <section  className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1 style={{marginBottom:"50px",marginTop:"50px"}}>Coungratulation You have completed your tasks </h1>
          )}
          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().detatils.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}>{item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasks;
