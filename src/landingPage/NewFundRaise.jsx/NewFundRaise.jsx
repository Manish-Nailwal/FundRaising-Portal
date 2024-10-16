import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewFundRaise() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    fundName: "",
    fundRaiser: "",
    totalGoal: 0,
    description: "",
  });

  let updateData = (event) => {
    setData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  let handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`${backendDomain}/listFund/${id}`, { data });
    setTimeout(()=>{
      navigate('/allFunds')
    },500);
    setData({
      fundName: "",
      fundraiser: "",
      totalGoal: 0,
      description: "",
    });
  };

  return (
    <>
      <div className="container-fluid p-5 row mt-5">
        <div className="col-md-6 col-sm-12">
          <img src="\media\Dashboard\Background.jpg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-6">
          <form className="row py-4 px-5" onSubmit={handleSubmit}>
            <TextField
              className="col-sm-12 col-md-5 mt-4 me-5"
              id="outlined-basic"
              label="Fund Name"
              name="fundName"
              variant="outlined"
              value={data.fundName}
              onChange={updateData}
              required
            />
            <TextField
              className="col-sm-12 col-md-5  mt-4"
              id="outlined-basic"
              label="Organisation"
              variant="outlined"
              name="fundraiser"
              value={data.fundraiser}
              onChange={updateData}
              required
            />
            <TextField
              className="col-sm-12 col-md-6 me-5 mt-4"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={data.description}
              required
              onChange={updateData}
            />
            <TextField
              className="col-sm-12 col-md-4  mt-4"
              id="outlined-basic"
              label="Total Amount"
              variant="outlined"
              name="totalGoal"
              type="number"
              value={data.totalGoal}
              onChange={updateData}
              required
            />
            <Button variant="contained" className="col-3 mt-4" type="Submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewFundRaise;
