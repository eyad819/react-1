import React from "react";
import ReactLoading from "react-loading";

import Model from "../../Shared/Model";
const HomeModel = ({
  closeModel,
  titleInput,
  detailsInput,
  submitBtnt,
  AddBtn,
  title,
  subTask,
  array,
  showLoading,
}) => (
  <Model colseModel={closeModel}>
    <div className="model-content">
      <input
        value={title}
        onChange={(eo) => {
          titleInput(eo);
        }}
        required
        placeholder=" Add title : "
        type="text"
      />

      <div>
        <input
          onChange={(eo) => {
            detailsInput(eo);
          }}
          placeholder=" Details : "
          type="email"
          value={subTask}
        />
        <button
          onClick={(eo) => {
            AddBtn(eo);
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {array.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <button
      style={{marginBottom:"20px"}}
        onClick={async (eo) => {
          submitBtnt(eo);
        }}
      >
        {showLoading ? (
          <ReactLoading type={"spin"} color={"white"} height={20}  width={20} />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  </Model>
);

export default HomeModel;
