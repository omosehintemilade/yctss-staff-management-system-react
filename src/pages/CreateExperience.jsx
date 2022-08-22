import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Logo } from "../components";
import { Context } from "../context";
import { createExperienceFn } from "../utils/services";
import { showToast } from "../utils";
import { UPDATE_EXPERIENCE } from "../context/type";

export default () => {
  const [values, setValues] = useState({
    name: "",
    started: "",
    ended: "",
    position: "",
    subject: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    state: { experiences },
    dispatch
  } = useContext(Context);

  const handleChange = ({ target }) => {
    values[target.name] = target.value;
    setValues(values);
    const err = document.querySelector(`.${target.name}_error`);
    err.style.display = "none";
  };

  return (
    <section className="_section">
      <Logo />

      <h4 className="_section__text">Edit Experience</h4>
      <div className="">
        <label htmlFor="name">Name of Workplace</label>
        <input
          type="text"
          name="name"
          placeholder="Yaba College Of Technology"
          onChange={(e) => handleChange(e)}
        />
        <small className="name_error">Workplace cannot be empty</small>

        <label htmlFor="started">Year Started</label>
        <input
          type="text"
          name="started"
          placeholder="2000"
          maxLength="4"
          onChange={(e) => handleChange(e)}
        />
        <small className="started_error">Year Started cannot be empty</small>

        <label htmlFor="ended">Year Ended</label>
        <input
          type="text"
          name="ended"
          placeholder="2005"
          maxLength="4"
          onChange={(e) => handleChange(e)}
        />
        <small className="ended_error">Year Ended cannot be empty</small>

        <label htmlFor="position">Position Held</label>
        <input
          type="text"
          name="position"
          placeholder="Lecturer"
          onChange={(e) => handleChange(e)}
        />
        <small className="position_error">Position Held cannot be empty</small>

        <label htmlFor="subject">Subject Taught</label>
        <input
          type="text"
          name="subject"
          placeholder="Chemistry"
          onChange={(e) => handleChange(e)}
        />
        <small className="subject_error">Subject Taught cannot be empty</small>
      </div>
      <Button
        text={loading ? "Loading..." : "Add Experience"}
        onClick={async () => {
          for (const [key] of Object.entries(values)) {
            if (!values[key]) {
              const err = document.querySelector(`.${key}_error`);
              err.style.display = "block";
              document.querySelector(`input[name="${key}"]`).focus();
              return;
            }
          }

          try {
            setLoading(true);
            const res = await createExperienceFn(values);
            setLoading(false);
            showToast(res);

            // Dspatch context
            dispatch({
              type: UPDATE_EXPERIENCE,
              payload: [...experiences, res.data]
            });
            navigate("/user/experience");
          } catch (error) {
            setLoading(false);
            showToast(error);
          }
        }}
      />
    </section>
  );
};
