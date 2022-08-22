import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../assets/user.jpg";
import { Button, Logo } from "../components";
import { Context } from "../context";
import { POPULATE_USER } from "../context/type";
import "../styles/editBiodata.css";
import { showToast } from "../utils";
import { editBiodataFn, uploadProfilePicsFn } from "../utils/services";
// const change_btn_wrapper = document.querySelector(".change_btn_wrapper");

export default () => {
  const navigate = useNavigate();
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
    dispatch
  } = useContext(Context);

  const [values, setValues] = useState({
    title: user.title || "",
    surname: user.surname || "",
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    dob: user.dob || "",
    pob: user.pob || "",
    lga: user.lga || "",
    email: user.email,
    genotype: user.genotype || "",
    bloodgroup: user.bloodgroup || "",
    phonenumber: user.phonenumber || "",
    address: user.address || "",
    nationality: user.nationality || ""
  });

  const handleChange = ({ target }) => {
    values[target.name] = target.value;
    setValues(values);
    const err = document.querySelector(`.${target.name}_error`);
    err.style.display = "none";
  };

  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">Edit BioData</h4>
      <div className="profile__wrapper">
        <div
          className="img_wrapper"
          onMouseEnter={() => {
            document.querySelector(".change_btn_wrapper").style.display =
              "grid";
          }}
          onMouseLeave={() => {
            document.querySelector(".change_btn_wrapper").style.display =
              "none";
          }}
        >
          <div className="change_btn_wrapper">
            <label htmlFor="file">Change Picture</label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              className="profile-upload"
              onChange={({ target }) => {
                const img_url = URL.createObjectURL(target.files[0]);
                document.querySelector(".profile_img").src = img_url;
                setFile(target.files[0]);
              }}
            />
          </div>
          <img className="profile_img" src={user.profile_pics || User} />
        </div>

        <form className="">
          <label htmlFor="title">Title</label>
          <select
            name="title"
            defaultValue={values.title}
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- --</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
          <small className="title_error">Title must be selected</small>

          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            placeholder="John"
            defaultValue={values.surname}
            onChange={(e) => handleChange(e)}
          />
          <small className="surname_error">Surname cannot be empty</small>

          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="Doe"
            defaultValue={values.firstname}
            onChange={(e) => handleChange(e)}
          />
          <small className="firstname_error">First Name cannot be empty</small>

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Doe"
            defaultValue={values.lastname}
            onChange={(e) => handleChange(e)}
          />
          <small className="lastname_error">Last Name cannot be empty</small>

          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            placeholder="Date of birth"
            defaultValue={values.dob}
            onChange={(e) => handleChange(e)}
          />
          <small className="dob_error"> Date of birth cannot be empty</small>

          <label htmlFor="pob">Place of Birth</label>
          <input
            type="text"
            name="pob"
            placeholder="Place of Birth"
            defaultValue={values.pob}
            onChange={(e) => handleChange(e)}
          />
          <small className="pob_error">Place of Birth cannot be empty</small>

          <label htmlFor="lga">Local Government Area</label>
          <input
            type="text"
            name="lga"
            placeholder="Local Government Area"
            defaultValue={values.lga}
            onChange={(e) => handleChange(e)}
          />
          <small className="lga_error">
            Local government area cannot be empty
          </small>

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@yahoo.com"
            disabled
            value={values.email}
          />

          <label htmlFor="genotype">Genotype</label>
          <select
            name="genotype"
            defaultValue={values.genotype}
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- --</option>
            <option value="AA">AA</option>
            <option value="AS">AS</option>
            <option value="SS">SS</option>
          </select>
          <small className="genotype_error">Genotype must be selected</small>

          <label htmlFor="nationality">Nationality</label>
          <select
            name="nationality"
            defaultValue={values.nationality}
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- --</option>
            <option value="0">Nigeria</option>
            <option value="1">Foreigner</option>
          </select>
          <small className="nationality_error">
            Nationality must be selected
          </small>

          <label htmlFor="bloodgroup">Blood Group</label>
          <select
            name="bloodgroup"
            defaultValue={values.bloodgroup}
            onChange={(e) => handleChange(e)}
          >
            <option value="">-- --</option>
            <option value="AB">AB</option>
            <option value="0">O</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
          <small className="bloodgroup_error">
            Blood group must be selected
          </small>

          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="tel"
            name="phonenumber"
            placeholder="0801 234 5678"
            defaultValue={values.phonenumber}
            onChange={(e) => handleChange(e)}
          />
          <small className="phonenumber_error">
            Phone number cannot be empty
          </small>

          <label htmlFor="address">House Address</label>
          <input
            name="address"
            placeholder="House Address"
            defaultValue={values.address}
            onChange={(e) => handleChange(e)}
          />
          <small className="address_error">House address cannot be empty</small>
        </form>
      </div>
      <Button
        text={loading ? "Loading..." : "Save Data"}
        onClick={async () => {
          for (const [key] of Object.entries(values)) {
            if (!values[key]) {
              const err = document.querySelector(`.${key}_error`);
              err.style.display = "block";

              // try input
              let el = document.querySelector(`input[name="${key}"]`);
              if (el) {
                el.focus();
              } else {
                // its a select el
                el = document.querySelector(`select[name="${key}"]`).focus();
              }
              return;
            }
          }

          try {
            if (file.name) {
              const formData = new FormData();
              formData.append("file", file);
              const res = await uploadProfilePicsFn(formData);
              values.profile_pics = res.url;
              showToast(res);
            }

            const res = await editBiodataFn(values);
            showToast(res);

            // Dspatch context
            dispatch({
              type: POPULATE_USER,
              payload: { ...user, ...values }
            });

            navigate("/user/profile");
          } catch (error) {
            setLoading(false);
            showToast(error);
          }
        }}
      />
    </section>
  );
};
