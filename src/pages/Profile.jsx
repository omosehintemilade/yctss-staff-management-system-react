import "../styles/profile.css";

import { Logo, ProfileSnippet } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import User from "../assets/user.jpg";

export default () => {
  const navigate = useNavigate();
  const {
    state: { user }
  } = useContext(Context);

  useEffect(() => {
    //   User is yet to provide their detailss
    if (!user.surname) {
      navigate("/user/biodata/edit");
    }
  }, []);

  const mentItems = [
    {
      title: "Bio Data",
      excerpt: "View and edit your biodata",
      link: "/user/biodata"
    },
    {
      title: "Educational Qualifications",
      excerpt: "View and modify all document uploads",
      link: "/user/document_uploads"
    },
    {
      title: "Work Experience",
      excerpt: "View and modify your work experience",
      link: "/user/experience"
    }
  ];

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">My Profile</h4>

      <div className="profile__wrapper">
        <ProfileSnippet />

        <div className="profile">
          {mentItems.map((i, index) => (
            <div key={index} className="data_card border">
              <div className="icon_wrapper">
                <img className="icon" src={User} alt="icon" />
              </div>
              <Link to={i.link} style={{ color: "black" }}>
                <div className="data">
                  <h6>{i.title}</h6>
                  <p>{i.excerpt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
