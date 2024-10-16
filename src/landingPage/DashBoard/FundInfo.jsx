import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShareBtn from "./ShareBtn";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; 
function FundInfo({}) {
  const [copied, setCopied] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;

  const [data, setData] = useState({
    fundName: "",
    fundRaiser: "",
    goalAchieved: "",
    totalGoal: 0,
    description: "",
    owner:"",
  });

  const fundId = useParams();
  const [cookies, removeCookie] = useCookies([]);
  const [status, setStatus] = useState(false);
  const [currUser, setCurrUser] = useState({
    id: ''
  });
  useEffect( () => {
    const verifyCookies = async ()=>{
      const { data } = await axios
      .post(`${backendDomain}/auth`, {}, { withCredentials: true });
      const { status, user } = data;

      if(status){
        setStatus(status);
      setCurrUser({id: user._id});
      }
      if(!status){
        removeCookie("token");
      }
    }
    verifyCookies();
    axios.get(`${backendDomain}/getfundInfo/${fundId.id}`).then((res) => {
      setData({ ...res.data });
      setTextToCopy(`${domain}/fund/${fundId.id}`);
    });
  }, [cookies, removeCookie]);

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

           {(currUser.id!==data.owner)?  <Link className="btn btn-primary mt-4 me-3" to={`/donate/${fundId.id}`} >
                Donate
              </Link> : <></>}
            <div className="mt-4">
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
