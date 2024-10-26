import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Common() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [currUser, setCurrUser] = useState({
    name: "User",
    mail: "",
    role: "",
    state: "",
    country: "",
    password: "",
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        setStatus(false);
        return
      }
      const { data } = await axios.post(
        `${backendDomain}/auth`,
        {token},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? (setStatus(status), setCurrUser({...user}))
        : (localStorage.removeItem("token"), setCurrUser({
          name: "User",
          mail: "",
          role: "",
          state: "",
          country: "",
          password: "",
        }));
    };
    verifyCookie();
  });
  return (
    <>
      <div>
        <div className="py-3 px-5" style={{ backgroundColor: "lightgrey" }}>
          <h1 className="fs-3">Dashboard</h1>
          <div className="dashboard-div">
            <img
              src="media\Dashboard\Background.jpg"
              className="dashboard-img"
              alt=""
            />
            <div className="innerdiv d-flex align-items-md-center flex-column justify-content-md-center">
              <div
                className="mx-md-auto overflow px-5 py-md-3"
              >
                <h4 style={{ color: "red", marginBottom: "3px" }}>
                  Hello {currUser.name},
                </h4>{" "}
                <br />
                <p>
                  <i>
                    <b>
                      Your generous support can help us bring hope and change to
                      those in need. Every donation, big or small, creates a
                      ripple effect of kindness and empowerment. Join us in our
                      mission to uplift lives and build a brighter future for
                      our community.
                    </b>
                  </i>
                </p>
              </div>
              {status ? (
                <Link className="btn btn-primary mt-3" to="/allFunds">
                  Start Donation!
                </Link>
              ) : (
                <Link className="btn btn-primary mt-3" to="/login">
                  Join Us Now!
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Common;
