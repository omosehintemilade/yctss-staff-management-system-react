import { Link } from "react-router-dom";
import { Logo } from "../components";

export default () => {
  return (
    <section className="_section">
      <Logo />
      <h4 className="_section__text">
        Sorry, We can't find the page you requested for
      </h4>

      <Link to={"/"} style={{ color: "#09519d" }}>
        <p>Back to HomePage</p>
      </Link>
    </section>
  );
};
