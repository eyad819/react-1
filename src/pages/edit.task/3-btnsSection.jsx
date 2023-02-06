
import { useTranslation } from "react-i18next";

function BtnsSection({ user, id, deleteBtn }) {

  const { t } = useTranslation();

  return (
    <section className=" deletee mtt">
      <div>
        <button
          onClick={(params) => {
            deleteBtn();
          }}
          className="delete"
        >
          {t("delete-task")}
        </button>
      </div>
    </section>
  );
}

export default BtnsSection;
