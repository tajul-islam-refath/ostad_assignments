import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosInterceptors";
const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.warn("Name is required");
    } else if (!email) {
      toast.warn("Email is required");
    } else if (!password) {
      toast.warn("Password is required");
    } else if (password != confirmPassword) {
      toast.warn("Password does not match");
    } else {
      try {
        console.log(name);
        let { data } = await axiosInstance.post("/user/registration", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("User registation success");
          return navigate("/");
        }
      } catch (e) {
        console.log("err", e.message);
      }
    }
  };

  return (
    <div>
      {" "}
      <div className="container">
        <div className="card col-md-6 p-3 offset-md-3 mt-5">
          <form onSubmit={onSubmit}>
            <h2>Register Form</h2>
            <div className="form-group">
              <label for="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                name="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-100">
              Submit
            </button>
            <Link to="/">Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
