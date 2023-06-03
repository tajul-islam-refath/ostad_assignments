import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "./axiosInterceptors";

import "./App.css";

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Email is required");
    } else if (!password) {
      toast.warn("Password is required");
    } else {
      try {
        let { data } = await axiosInstance.post("/user/login", {
          email,
          password,
        });

        console.log(data);
        if (data.success) {
          toast.success("User login success");
          localStorage.setItem("token", JSON.stringify(data.token));
          return navigate("/profile");
        } else {
          toast.error("User login error");
        }
      } catch (e) {
        console.log("err", e.message);
        toast.error("User login error");
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="card col-md-6 p-3 offset-md-3 mt-5">
          <form onSubmit={onSubmit}>
            <h2>Login Form</h2>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2 w-100">
              Submit
            </button>
            <Link to="/register">Don't have an account?</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
