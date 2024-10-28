import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const backendDomain = import.meta.env.VITE_BACK_END || `http://localhost:3001`;
    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    mail: "",
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
    const handleSuccess = (msg, token) =>{
      localStorage.setItem('token', token)
      toast.success(msg, {
        position: "bottom-left",
      });
    }
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const { data } = await axios.post(
            `${backendDomain}/login`,
            {
              inputValue,
            },
            { withCredentials: true }
          );
          const { success, message, token } = data;
          if (success) {
            handleSuccess(message, token);
            setTimeout(() => {
              window.location.replace("/");
            }, 1000);
          } else {
            handleError(message);
            setIsSubmitting(false);
          }
        } catch (error) {
          console.log(error);
          setIsSubmitting(false);
        }
        setInputValue({
          email: "",
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
              value={inputValue.mail}
              onChange={updateData}
            />
            <TextField
              className="col-sm-7 col-md-5  mt-4 ms-lg-5 me-sm-5 me-lg-1"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={inputValue.password}
              onChange={updateData}
            /> 
            <Button variant="contained" className="col-2 mt-4" type="Submit" disabled={isSubmitting}>
            {isSubmitting ? 'Letting you in...' : 'Login'}
            </Button>
            <p className="mt-4" style={{padding: '0', margin: '0'}}>Create new account <Link to={"/signup"}>Signup</Link></p>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default Login;
