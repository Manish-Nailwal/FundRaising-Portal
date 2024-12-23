import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShareBtn from "./ShareBtn";
import { Link } from "react-router-dom";
function FundInfo({}) {
  const domain = import.meta.env.VITE_DOMAIN|| `http://localhost:5173`;
  const [copied, setCopied] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const [status, setStatus] = useState(true);
  const [data, setData] = useState({
    fundName: "",
    fundRaiser: "",
    goalAchieved: "",
    totalGoal: 0,
    description: "",
    owner:"",
  });

  const fundId = useParams();
  const [currUser, setCurrUser] = useState({
    id: ''
  });
  const token = localStorage.getItem('token');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!token) {
        setStatus(false);
      }
      const { data } = await axios.post(
        `${backendDomain}/auth`,
        {token},
        { withCredentials: true }
      );
      const { status, user } = data;
      return status
        ? (setCurrUser({id: user._id.toString()}), setStatus(status))
        : (localStorage.removeItem("token"));
    };
    verifyCookie();
    axios.get(`${backendDomain}/getfundInfo/${fundId.id}`).then((res) => {
      setData({ ...res.data });
      setTextToCopy(`${domain}/fund/${fundId.id}`);
    });
  });

  let handleCopy = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(!copied);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.log("Failed To Copy", err);
      });
  };
  return (
    <>
      <div
        className="container-fluid p-5 row"
        style={{ backgroundColor: "lightgray", minHeight: "90vh" }}
      >
        <div className="col-sm-12 col-lg-6 p-5">
          <div className="py-lg-5">
            <h3>{data.fundName} <p className="d-inline fs-5">({data.fundraiser})</p></h3>
            <p>{data.description}</p>

            <h6 style={{ color: "red" }}>
              Goal Achieved:{" "}
              <p
                style={{ color: "black", display: "inline", fontWeight: "400" }}
              >
                &#8377;
                {data.goalAchieved ? data.goalAchieved : 0}
              </p>
            </h6>
            <h6 style={{ color: "red" }}>
              Total Goal:{" "}
              <p
                style={{ color: "black", display: "inline", fontWeight: "400" }}
              >
                &#8377;
                {data.totalGoal}
              </p>
            </h6>

           {(status) ? ((currUser.id!==data.owner)?  <Link className="btn btn-primary mt-4 me-3" to={`/donate/${fundId.id}`} >
                Donate
              </Link> : <></>):<Link className="btn btn-primary mt-4 me-3" to={`/login`} >
                Donate
              </Link>}
            <div>
              <button className="btn btn-secondary me-3 my-4" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy Donation Link"}
              </button>
              <button className="btn btn-success ">
                <ShareBtn el={data} text="Share On Whatsapp" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 p-md-5">
          <div className="py-lg-5">
          <img
            src="\media\Dashboard\Background.jpg"
            style={{ width: "100%" }}
          />
          </div>
        </div>
      </div>
    </>
  );
}

export default FundInfo;
