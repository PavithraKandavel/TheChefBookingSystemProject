import { useState, useEffect } from "react";
import Header from "../../Components/Header";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check) {
      setRole(check);
    }
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    console.log("stored user --->", storedUser);
    if (storedUser) {
      setUserData(storedUser);

    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>
          {role === "user"
            ? "My Profile"
            : role === "chef"
              ? "Chef Profile"
              : "Profile"}
        </h3>
        <div className="profile-details p-3 border rounded">
          {role === "user"
            ? <> <p>
              <strong>Name:</strong> {userData.user_Name}
            </p>
              <p>
                <strong>Email:</strong> {userData.user_Email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.mobile_no}
              </p>
            </>
            : role === "chef"
              ? <>
                <p>
                  <strong>Name:</strong> {userData.chef_Name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.chef_Email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.mobile_no}
                </p>
              </>
              : <p className="text-danger">No user data found. Please log in.</p>}


        </div>

      </div>
    </>
  );
};

export default Profile;
