import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar() {
  const backendDomain =
    import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [currUser, setCurrUser] = useState({
    name: "User",
    role: "",
    id: "",
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        setIsLogin(false);
      }
      const { data } = await axios.post(
        `${backendDomain}/auth`,
        {token},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? (setIsLogin(true), setCurrUser({ name: user.name, id: user._id, role: user.role }))
        : (localStorage.removeItem("token"));
    };
    verifyCookie();
  }, [navigate]);

  const Logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    window.location.replace("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid pe-5 ">
          <Link className="" to="/">
            <img src="/media/textLogo.png" alt="" height={'23px'}/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link " aria-current="page" to="/">
                Dashboard
              </Link>
              {isLogin && (
                <Link className="nav-link" to={`/transactions/${currUser.id}`}>
                  Transactions
                </Link>
              )}
              <Link className="nav-link" to="/allFunds">
                All Funds
              </Link>
              {isLogin && currUser.role === "Fund Raiser" && (
                <Link className="nav-link" to={`newFundRaise/${currUser.id}`}>
                  New Fund Raise
                </Link>
              )}
            </div>
            <div className="navbar-nav ms-auto">
              {isLogin ? (
                <button className="nav-link" onClick={Logout}>
                  LogOut
                </button>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                  <Link className="nav-link" to="/signup">
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
