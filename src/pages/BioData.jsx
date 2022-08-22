import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, ProfileSnippet } from "../components";
import User from "../assets/user.jpg";
import { useContext, useEffect } from "react";
import { Context } from "../context";

export default () => {
  const navigate = useNavigate();

  const {
    state: { user }
  } = useContext(Context);
  console.log({ user });

  useEffect(() => {
    //   User is yet to provide their detailss
    if (!user.surname) {
      navigate("/user/biodata/edit");
    }
  }, []);
  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">My BioData</h4>

      <div className="profile__wrapper">
        <ProfileSnippet />{" "}
        <div className="profile">
          <div className="profile__item">
            <h6>Title</h6>
            <p className="title">{user.title}</p>
          </div>

          <div className="profile__item">
            <h6>Surname</h6>
            <p className="surname">{user.surname}</p>
          </div>
          <div className="profile__item">
            <h6>First Name</h6>
            <p className="firstname">{user.firstname}</p>
          </div>
          <div className="profile__item">
            <h6>Last Name</h6>
            <p className="lastname">{user.lastname}</p>
          </div>

          <div className="profile__item">
            <h6>Email Address</h6>
            <p className="email">{user.email}</p>
          </div>

          <div className="profile__item">
            <h6>Phone Number</h6>
            <p className="phonenumber">{user.phonenumber}</p>
          </div>

          <div className="profile__item">
            <h6>House Address</h6>
            <p className="address">{user.address}</p>
          </div>
          <div className="profile__item">
            <h6>DOB</h6>
            <p className="dob">{user.dob}</p>
          </div>

          <div className="profile__item">
            <h6>Place Of Birth</h6>
            <p className="pob">{user.pob}</p>
          </div>

          <div className="profile__item">
            <h6>Nationality</h6>
            <p>{user.nationality == 0 ? "Nigeria" : "Foreigner"}</p>
          </div>

          <div className="profile__item">
            <h6>Local Government</h6>
            <p className="lga">{user.lga}</p>
          </div>

          <div className="profile__item">
            <h6>Genotype</h6>
            <p className="genotype">{user.genotype}</p>
          </div>

          <div className="profile__item">
            <h6>Blood Group</h6>
            <p className="bloodgroup">{user.bloodgroup}</p>
          </div>
        </div>
      </div>
      <Link to={"/user/biodata/edit"}>
        <Button text={"Edit BioData"} />
      </Link>
    </section>
  );
};
