import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavBar() {
  const backendDomain =
    import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [currUser, setCurrUser] = useState({
    name: "User",
    role: "",
    id: "",
  });
  useEffect(() => {
    const verifyCookies = async () => {
      if (cookies.token) {
        const { data } = await axios.post(
          `${backendDomain}/auth`,
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        if (status) {
          setIsLogin(true);
          setStatus(status);
          setCurrUser({ name: user.name, id: user._id, role: user.role });
        } else {
          removeCookie("token");
        }
      }
    };
    verifyCookies();
  }, [cookies, navigate, removeCookie]);

  const Logout = async() => {
    setStatus(false);
    setIsLogin(false);
    await removeCookie("token");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            LoGO
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
              <Link className="nav-link active" aria-current="page" to="/">
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
