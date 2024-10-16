import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    mail: "",
    role: "",
    state: "",
    country: "",
    password: "",
  });

  let updateData = (event) => {
    setData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleError = (err) => {
    console.log(err);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      `${backendDomain}/signup`,
      { data },
      { withCredentials: true }
    );
    
    await axios
      .post(`${backendDomain}/login`, { data:{mail: data.mail,password: data.password} }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          handleError(res.data.Buttonmessage);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setData({
      name: "",
      mail: "",
      role: "",
      state: "",
      country: "",
      password: "",
    });
  };

  return (
    <>
      <div className="container-fluid p-5 mt-5">
        <h2 className="text-center">Sign Up</h2>
        <div className="ms-md-5 ms-sm-3">
          <form className="row py-4 px-md-5" onSubmit={handleSubmit}>
            <TextField
              className="col-sm-12 col-md-5 mt-4 me-md-5"
              label="User Name"
              name="name"
              variant="outlined"
              value={data.name}
              onChange={updateData}
            />
            <div
              className="col-sm-12 col-md-5 mt-4 ms-lg-5"
              style={{ padding: "0" }}
            >
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={data.role}
                  label="Role"
                  name="role"
                  onChange={updateData}
                >
                  <MenuItem value={"Donator"}>Donator</MenuItem>
                  <MenuItem value={"Fund Raiser"}>Fund Raiser</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              className="col-sm-12 col-md-5 mt-4 me-md-5"
              label="Mail Id"
              name="mail"
              variant="outlined"
              type="email"
              value={data.mail}
              onChange={updateData}
            />
            <TextField
              className="col-sm-12 col-md-5  mt-4 ms-lg-5"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={data.password}
              onChange={updateData}
            />
            <TextField
              className="col-sm-12 col-md-5 mt-4 me-md-5"
              label="State"
              name="state"
              variant="outlined"
              value={data.state}
              onChange={updateData}
            />
            <TextField
              className="col-sm-12 col-md-5  mt-4 ms-lg-5"
              label="Country"
              variant="outlined"
              name="country"
              value={data.country}
              onChange={updateData}
            />
            <Button variant="contained" className="col-2 mt-4" type="Submit">
              SignUp
            </Button>
            <p className="mt-4" style={{ padding: "0", margin: "0" }}>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
