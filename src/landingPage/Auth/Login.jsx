import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
    const navigate = useNavigate();
  const [data, setData] = useState({
    mail: "",
    password: "",
  });
  let handleClick = ()=>{
    console.log(test);
  }

  let updateData = (event) => {
    setData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };
  const handleError = (err) =>{
    console.log(err);
  }
  let handleSubmit = (event) => {
    event.preventDefault(); 
    axios.post(`${backendDomain}/login`, { data },
      { withCredentials: true }).then((res)=>{
      if (res.data.success) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(res.data.message);
      }
    }).catch(err=>{
      console.log(err)
    })
    setData({
        mail: "",
        password: "",
    });

  };

  return (
    <>
      <div className="container-fluid p-5 mt-5">
        <h2 className="text-center">Login</h2>
        <div className="ms-5">
          <form className="row py-4 px-md-5" onSubmit={handleSubmit}>
            <TextField
              className="col-sm-7 col-md-5 mt-4 me-5"
              
              label="Mail Id"
              name="mail"
              variant="outlined"
              type="email"
              value={data.mail}
              onChange={updateData}
            />
            <TextField
              className="col-sm-7 col-md-5  mt-4 ms-lg-5 me-sm-5 me-lg-1"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={data.password}
              onChange={updateData}
            /> 
            <Button variant="contained" className="col-2 mt-4" type="Submit">
              Login
            </Button>
            <p className="mt-4" style={{padding: '0', margin: '0'}}>Create new account <Link to={"/signup"}>Signup</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
