import { Button, Logo } from "../components";
import "../styles/adminView.css";

export default () => {
  const user = {
    uuid: "b09d9cab-3631-4e30-b20c-ef811dd7f25c",
    name: null,
    email: "johnsmith@example.com",
    password: "1234",
    phonenumber: "08103826574",
    staffId: "78757",
    address: "22",
    title: "Mr",
    surname: "ddd",
    pob: "222",
    lga: "222",
    lastname: "dddddd",
    genotype: "222",
    firstname: "ddddd",
    dob: "22-01-2022",
    bloodgroup: "222",
    profile_pics: null,
    createdAt: "2022-08-21T20:24:02.768Z",
    updatedAt: "2022-08-21T20:24:19.079Z"
  };

  return (
    <section className="section__admin">
      <div className="logo-wrapper">
        <Logo />
      </div>
      <h2 className="header_title">User Profile</h2>=
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="_button"
          style={{ width: "300px", marginTop: "-10px", marginBottom: "30px" }}
        >
          Edit
        </button>
      </div>
    </section>
  );
};
