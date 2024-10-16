import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Common() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [currUser, setCurrUser] = useState({
    name: "User",
    mail: "",
    role: "",
    state: "",
    country: "",
    password: "",
  });
  useEffect( () => {
    const verifyCookies = async ()=>{
      const { data } = await axios
      .post(`${backendDomain}/auth`, {}, { withCredentials: true });
      const { status, user } = data;

      if(status){
        setStatus(status);
      setCurrUser({...user});
      }
      if(!status){
        removeCookie("token");
      }
    }
    verifyCookies();
  }, [cookies, navigate, removeCookie]);
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
