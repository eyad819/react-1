import { useDocument } from "react-firebase-hooks/firestore";
import { doc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase/config';
import Moment from 'react-moment';
import { updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SubTashsSection = ({user,id,completedCheckbox,trashIcon}) => {
  const { t } = useTranslation();

  const [value, loading, error] = useDocument(doc(db, user.uid, id));
const [showAddNewTask, setshowAddNewTask] = useState(false);
 const [subTitle, setsubTitle] = useState('');
  if (value) {
    return (
      <section className="sub-task mtt">
      <div className="parent-time">
        <p className="time">
        Created:  <Moment fromNow date={value.data().id} />

        </p>
        <div>
          <input onChange={async(eo) => {
        completedCheckbox(eo)
          }}  checked={value.data().completed} id="checkbox" type="checkbox" />
          <label htmlFor="checkbox">{t("completed")} </label>
        </div>
      </div>
  
      <ul>
    {value.data().detatils.map((item) => {
      return(
        <li key={item} className="card-task flex">
        <p> {item} </p>
        <i onClick={async() => {
      trashIcon(item)
        }} className="fa-solid fa-trash"></i>
      </li>
      )
    })}
      </ul>
      {showAddNewTask && (
          <form style={{flexDirection: "row"}} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                // @ts-ignore
                setsubTitle(eo.target.value);
              }}
              className="add-task"
              type="text"
            />
            <button
              onClick={async (eo) => {
                eo.preventDefault()
                
                setsubTitle("");
                await updateDoc(doc(db, user.uid, id), {
                  detatils: arrayUnion(subTitle),
                });

              }}
              className="add"
            >
              {t("add")}
            </button>

            <button
              onClick={(eo) => {
                eo.preventDefault()

                setshowAddNewTask(false);
              }}
              className="cancel"
            >
            {t("cencel")}
            </button>
          </form>
        )}

        <div className="center deletee mttt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn "
          >
            <div style={{display:"flex",    alignItems: "center"}}>
               {t("add-more")} <i className="fa-solid fa-plus"></i>
            </div>
          </button>
        </div>
    </section>
  
    );
  }
}

export default SubTashsSection;
