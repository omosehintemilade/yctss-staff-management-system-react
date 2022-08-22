import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Logo, ProfileSnippet } from "../components";
import { Context } from "../context";
import { UPDATE_EXPERIENCE } from "../context/type";
import "../styles/experience.css";
import { showToast } from "../utils";
import { deleteExperience, getExperiences } from "../utils/services";

export default () => {
  const {
    state: { experiences },
    dispatch
  } = useContext(Context);

  useEffect(() => {
    (async () => {
      const res = await getExperiences();
      // Dspatch context
      dispatch({
        type: UPDATE_EXPERIENCE,
        payload: res.data
      });
    })();
  }, []);

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Experience</h4>
      <div className="profile__wrapper">
        <ProfileSnippet />
        <div className="ex">
          {!experiences.length ? (
            <p style={{ textAlign: "center" }}>No experience added</p>
          ) : (
            experiences.map((d, index) => (
              <div className="ex_item" key={index}>
                <div className="">
                  <h4>{d.name}</h4>
                  <p>
                    Year: {d.started} - {d.ended}
                  </p>
                  <h4>Position Held: {d.position}</h4>
                  <h4>Subject Taught: {d.subject}</h4>
                </div>

                <Button
                  className="delete_btn"
                  text={"Delete"}
                  onClick={async () => {
                    const res = await deleteExperience(d.id);
                    showToast(res);
                    // Dspatch context
                    dispatch({
                      type: UPDATE_EXPERIENCE,
                      payload: res.data
                    });
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <Link to={"/user/experience/create"} className="_button">
        Edit Experience
      </Link>
    </section>
  );
};
