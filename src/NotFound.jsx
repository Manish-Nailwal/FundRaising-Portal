import { Link } from "react-router-dom";

function Notfound() {
  return (
    <>
      <div className="container-fluid p-5">
        <h1>404, Page Not Found</h1>
        <p>
        Oops! The page you are trying to access is not available. For
          redirects to home page you can {" "}
          <Link to="/">
            Click here
          </Link>
        </p>
      </div>
    </>
  );
}

export default Notfound;
