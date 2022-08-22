import { Logo } from "../components";
import "../styles/adminView.css";
import User from "../assets/user.jpg";
import { useEffect, useState } from "react";
import {
  adminEditUser,
  adminFetchUser,
  updateDocumentStatus
} from "../utils/services";
import { useParams } from "react-router-dom";
import { showToast, status } from "../utils";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default () => {
  const { userId } = useParams();

  const [data, setData] = useState({
    user: {},
    documents: [],
    experiences: []
  });
  const [values, setValues] = useState({});

  const { user, experiences, documents } = data;
  useEffect(() => {
    (async () => {
      const res = await adminFetchUser(userId);
      setData(res.data);
    })();
  }, []);

  console.log({ data });

  const handleChange = ({ target }) => {
    values[target.name] = target.value;
    setValues(values);
  };

  const updateFileStatus = async (status, fileId) => {
    try {
      const res = await updateDocumentStatus(userId, {
        status,
        fileId
      });
      showToast(res);
      setData((p) => ({ ...p, documents: res.documents }));
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <section className="section__admin view_section">
      <div className="logo-wrapper">
        <Logo />
      </div>

      <h2 className="header_title">User Profile</h2>

      <div className="biodata">
        <h4>User Data</h4>

        <div className="bio_pp">
          <div className="biodata_items">
            <div className="profile__item">
              <h6>Title</h6>
              <p className="title">{user.title || "--" || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Surname</h6>
              <p className="surname">{user.surname || "--"}</p>
            </div>
            <div className="profile__item">
              <h6>First Name</h6>
              <p className="firstname">{user.firstname || "--"}</p>
            </div>
            <div className="profile__item">
              <h6>Last Name</h6>
              <p className="lastname">{user.lastname || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Email Address</h6>
              <p className="email">{user.email || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Phone Number</h6>
              <p className="phonenumber">{user.phonenumber || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>House Address</h6>
              <p className="address">{user.address || "--"}</p>
            </div>
            <div className="profile__item">
              <h6>DOB</h6>
              <p className="dob">{user.dob || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Place Of Birth</h6>
              <p className="pob">{user.pob || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Local Government</h6>
              <p className="lga">{user.lga || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Genotype</h6>
              <p className="genotype">{user.genotype || "--"}</p>
            </div>

            <div className="profile__item">
              <h6>Blood Group</h6>
              <p className="bloodgroup">{user.bloodgroup || "--"}</p>
            </div>

            <div className="">
              <h6>Subject</h6>
              <p className="bloodgroup">{user.subject || "--"}</p>
            </div>

            <div className="">
              <h6>Department</h6>
              <p>{user.department || "--"}</p>
            </div>

            <div className="">
              <h6>StaffId</h6>
              <p>{user.staffId || "--"}</p>
            </div>

            <div className="">
              <h6>Nationality</h6>
              <p>{user.nationality == 0 ? "Nigeria" : "Foreigner" || "--"}</p>
            </div>
          </div>

          <div className="user_profile_img">
            <img
              className="pp"
              src={`${API_BASE_URL}${user.profile_pics}` || User}
              alt="profile pics"
            />
          </div>
        </div>
      </div>

      <div className="qualifications">
        <h4>Educational Qualifications</h4>

        <div className="qq">
          {documents.map((e) => (
            <div className="card" key={e.id}>
              <img
                className="doc_img"
                src={`${API_BASE_URL}${e.url}`}
                alt="preview.jpg"
              />
              <h6>Document Name: {e.name}</h6>
              <h6>Status: {status(e.status)}</h6>

              <h4 className="actions">
                <button
                  className="btn view_btn"
                  onClick={async () => await updateFileStatus(1, e.fileId)}
                >
                  Approve
                </button>
                <button
                  className="btn del_btn"
                  onClick={async () => await updateFileStatus(2, e.fileId)}
                >
                  Decline
                </button>
              </h4>
            </div>
          ))}
        </div>
      </div>

      <div className="experience">
        <h4>Experiences</h4>

        <div className="ex_wp">
          {experiences.map((d) => (
            <div className="card" key={d.id}>
              <h4>{d.name}</h4>
              <p>
                Year: {d.started} - {d.ended}
              </p>
              <h4>Position Held: {d.position}</h4>
              <h4>Subject Taught: {d.subject}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="modify">
        <h2>Edit User</h2>

        <div className="md_wp">
          <div className="md_item">
            <label htmlFor="department">Department</label>
            <select
              name="department"
              defaultValue={values.department}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Department</option>
              <option value="Art">Art</option>
              <option value="Commercial">Commercial</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div className="md_item">
            <label htmlFor="subject">Subject</label>
            <select
              name="subject"
              defaultValue={values.subject}
              onChange={(e) => handleChange(e)}
            >
              <option value="">Select Subject</option>
              <option value="English">English</option>
              <option value="Maths">Maths</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#e5e5e5",
          paddingTop: "10px",
          marginTop: "-31px"
        }}
      >
        <button
          className="_button"
          style={{ width: "300px", marginBottom: "30px" }}
          onClick={async () => {
            try {
              const res = await adminEditUser(userId, values);
              showToast(res);
              setData((p) => ({ ...p, user: res.user }));
            } catch (error) {
              showToast(error);
            }
          }}
        >
          Edit
        </button>
      </div>
    </section>
  );
};
