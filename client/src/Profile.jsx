import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInterceptor from "./axiosInterceptors";
const Profile = () => {
  let [profile, setProfile] = useState({});
  const navigation = useNavigate();
  const getProfile = async () => {
    try {
      let { data } = await axiosInterceptor.get("/user/profileDetails");
      setProfile(data.data[0]);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigation("/");
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 mt-5">
        <div className="card p-2">
          <h1>Name:</h1>
          <h5>{profile?.name}</h5>

          <h1>Email:</h1>
          <h5>{profile?.email}</h5>

          <button className="btn btn-danger" onClick={() => logOut()}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
