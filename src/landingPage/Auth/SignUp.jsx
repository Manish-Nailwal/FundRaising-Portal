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
import { ToastContainer, toast } from "react-toastify";
function SignUp() {
  const backendDomain =
    import.meta.env.VITE_BACK_END || `http://localhost:3001`;
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    mail: "",
    role: "",
    state: "",
    country: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  let updateData = (event) => {
    setInputValue((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg, token) => {
    localStorage.setItem("token", token);
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `${backendDomain}/signup`,
        {
          inputValue,
        },
        { withCredentials: true }
      );
      const { success, message, token } = data;
      if (success) {
        handleSuccess(message, token);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        handleError(message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
    setInputValue({
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
              value={inputValue.name}
              onChange={updateData}
              required
            />
            <div
              className="col-sm-12 col-md-5 mt-4 ms-lg-5"
              style={{ padding: "0" }}
            >
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={inputValue.role}
                  label="Role"
                  name="role"
                  onChange={updateData}
                  required
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
              value={inputValue.mail}
              onChange={updateData}
              required
            />
            <TextField
              className="col-sm-12 col-md-5  mt-4 ms-lg-5"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={inputValue.password}
              onChange={updateData}
              required
            />
            <TextField
              className="col-sm-12 col-md-5 mt-4 me-md-5"
              label="State"
              name="state"
              variant="outlined"
              value={inputValue.state}
              onChange={updateData}
              required
            />
            <TextField
              className="col-sm-12 col-md-5  mt-4 ms-lg-5"
              label="Country"
              variant="outlined"
              name="country"
              value={inputValue.country}
              onChange={updateData}
              required
            />
            <Button variant="contained" className="col-2 mt-4  px-2" type="Submit" style={{minWidth: "fit-content"}}>
            {isSubmitting ? 'Getting you set up...' : 'Create Account'}
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
