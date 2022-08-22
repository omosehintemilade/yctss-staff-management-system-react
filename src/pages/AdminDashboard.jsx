import { Logo } from "../components";
import "../styles/adminDashboard.css";
import Search from "../assets/search.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminEditUser, fetchAllUsers } from "../utils/services";
import { showToast, status } from "../utils";
export default () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchAllUsers();
      setUsers(res.users);
    })();
  }, []);

  useEffect(() => {
    setSearchResults(users);
  }, [users]);

  const updateAccountStatus = async (status, userId) => {
    try {
      const res = await adminEditUser(userId, { status });
      const response = await fetchAllUsers();
      setUsers(response.users);
      showToast(res);
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <section className="section__admin">
      <div className="logo-wrapper">
        <Logo />
      </div>

      <div className="filter">
        <div className="search_wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, email or staff ID"
            onChange={({ target }) => {
              const { value } = target;
              const matches = users.filter((u) => {
                const name = `${u.surname} ${u.firstname} ${u.lastname}`;
                const match =
                  name.match(value) ||
                  u.email.match(value) ||
                  u.staffId.match(value);
                if (match) return u;
              });

              setSearchResults(matches);
            }}
          />
          <img src={Search} alt="Search Icon" />
        </div>
        <p>Filter By:</p>{" "}
        <select
          onChange={({ target: { value } }) => {
            if (!value) return;
            const matches = users.filter((u) => u.status == value);
            setSearchResults(matches);
          }}
        >
          <option value="">Account Status</option>
          <option value="0">Pending</option>
          <option value="1">Active</option>
          <option value="2">Suspended</option>
        </select>
        <select
          onChange={({ target: { value } }) => {
            if (!value) return;
            const matches = users.filter((u) => u.status == value);
            setSearchResults(matches);
          }}
        >
          <option value="">Locality</option>
          <option value="0">Indigene</option>
          <option value="1">Foreigner</option>
        </select>
      </div>

      <div className="body">
        <div className="header">
          <h4 className="no">S/N</h4>
          <h4 className="staffId">Staff ID</h4>
          <h4 className="name">Name</h4>
          <h4 className="email">Email Address</h4>
          <h4 className="phone">Phone Number</h4>
          <h4 className="status">Status</h4>
          <h4 className="actions">Actions</h4>
        </div>

        {searchResults.map((u, i) => (
          <div className="header row" key={u.uuid}>
            <h4 className="no">{i + 1}</h4>
            <h4 className="staffId">{u.staffId}</h4>
            <h4 className="name">
              {`${u.surname || "--"} ${u.firstname || "--"} ${
                u.lastname || "--"
              }`}{" "}
            </h4>
            <h4 className="email">{u.email}</h4>
            <h4 className="phone">{u.phonenumber}</h4>
            <h4 className="status">{status(u.status)}</h4>
            <h4 className="actions">
              <Link to={`/admin/view/${u.uuid}`}>
                <button className="btn view_btn">View</button>
              </Link>
              {u.status == 1 ? (
                <button
                  className="btn del_btn"
                  onClick={async () => await updateAccountStatus(2, u.uuid)}
                >
                  Suspend
                </button>
              ) : (
                <button
                  className="btn view_btn"
                  onClick={async () => await updateAccountStatus(1, u.uuid)}
                >
                  Activate
                </button>
              )}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};
