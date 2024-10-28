import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
function DonatePortal() {
  const backendDomain =
    import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const [status, setStatus] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currUser, setCurrUser] = useState({
    name: "",
    senderId: "",
    amount: "",
  });
  const [data, setData] = useState({
    fundName: "",
    fundRaiser: "",
    goalAchieved: "",
    totalGoal: 0,
    description: "",
  });
  const token = localStorage.getItem("token");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        setStatus(false);
      }
      const { data } = await axios.post(
        `${backendDomain}/auth`,
        { token },
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? (setCurrUser({ name: user.name, senderId: user._id }),
          setStatus(status))
        : localStorage.removeItem("token");
    };
    verifyCookie();
    axios.get(`${backendDomain}/getfundInfo/${id}`).then((res) => {
      setData({ ...res.data });
    });
  }, [navigate]);
  let updateData = (event) => {
    setCurrUser((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  const handleError = (err) => {
    console.log(err);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    axios
      .post(
        `${backendDomain}/donate/${id}`,
        { data: currUser },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            navigate(`/transactions/${currUser.senderId}`);
          }, 500);
        } else {
          handleError(res.data.message);
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };
  return (
    <>
      <div className="container-fluid p-5 row">
        <div className="col-sm-12 col-lg-6 p-5">
          <div className="py-lg-5">
            <img
              src="\media\Dashboard\Background.jpg"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-lg-6 p-5">
          <div className="py-lg-5">
            <h3>
              {data.fundName}{" "}
              <p className="d-inline fs-5">({data.fundraiser})</p>
            </h3>
            <h6 style={{ color: "red" }}>
              Remaining Amount:{" "}
              <p
                style={{ color: "black", display: "inline", fontWeight: "400" }}
              >
                &#8377;
                {data.goalAchieved
                  ? data.totalGoal - data.goalAchieved
                  : data.totalGoal}
              </p>
            </h6>
            <form className="row" onSubmit={handleSubmit}>
              <TextField
                className="col-sm-12 col-md-5 mt-4 me-3"
                id="outlined-basic"
                label="Sender Name"
                value={currUser.name}
                name="name"
                onChange={updateData}
                variant="outlined"
                helperText="Enter sender name"
                required
              />
              <TextField
                className="col-sm-12 col-md-5  mt-4 ms-lg-3"
                id="outlined-basic"
                label="Amount"
                value={currUser.amount}
                type="Number"
                name="amount"
                inputProps={{
                  min: 1, // Minimum amount
                  max: data.totalGoal - data.goalAchieved, // Maximum amount
                }}
                helperText={`Amount must be less than remaining amt.`}
                onChange={updateData}
                variant="outlined"
                required
              />
              {status ? (
                <Button
                  variant="contained"
                  className="col-2 mt-4"
                  type="Submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Donating...' : 'Donate'}
                </Button>
              ) : (
                <Link className="btn btn-primary mt-4 me-3 col-2" to={`/login`}>
                  Donate
                </Link>
              )}
            </form>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonatePortal;
