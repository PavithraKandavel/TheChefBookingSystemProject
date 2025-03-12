import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import signupimg from "../../Images/signupimg.png";
import signupuserimg from "../../Images/signupuser.jpg";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { postApihandler } from "../../Apihandler";

export default function Login() {
  const [value, setValue] = React.useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
 
  // ********* user login **********
  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    const res = await postApihandler("/userLogin", data);
    localStorage.setItem("userData", JSON.stringify(res.data));
    if (res.status === 200) {
      swal(" Login Successfully");
      navigate("/");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };

  // ********* chef login **********
  const [chefemail, setChefEmail] = useState("");
  const [chefpassword, setChefPassword] = useState("");
  const chefLogin = async (e) => {
    e.preventDefault();
    const data = {
      chef_Email: chefemail,
      password: chefpassword,
    };
    console.log("login data --->", data);
    const res = await postApihandler("/chefLogin", data);
    console.log("login api response is ------->", res);
    localStorage.setItem("userData", JSON.stringify(res.data));
    if (res.status === 200) {
      swal(" Login Successfully");
      navigate("/");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <>
      <Container className="mt-5">
        <Row className="">
          <Col xs={12} md={7}>
            {/* signup image */}
            {
              value === "1" ?
                <div>
                  <img src={signupuserimg} className="mt-5" style={{ width: "100%" }} />
                </div>
                :
                <div>
                  <img src={signupimg} className="mt-5" />
                </div>
            }

          </Col>
          <Col xs={12} md={5}>
            {/* <h2 className="text-center">Chef Booking - Signup</h2> */}
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="User" value="1" />
                    <Tab label="Chef" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <h6>User</h6>
                  <form
                    component="form"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                      padding: "30px",
                      borderRadius: "10px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    onSubmit={userLogin}
                  >
                    {/* <div className="text-center">
                <img src={cheflogo} height="100px" width="100px"  style={{objectFit:"cover"}}/>
              </div> */}
                    <div className="mt-4">
                      <input
                        type="email"
                        label=""
                        placeholder="email"
                        fullWidth
                        style={{
                          border: "1px solid #000",
                          width: "100%",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        label=""
                        placeholder="Password"
                        fullWidth
                        style={{
                          border: "1px solid #000",
                          width: "100%",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-end">
                      <a
                        href="/resetpassword"
                        style={{
                          textDecoration: "none",
                          color: "#E3641B",
                          fontWeight: "600",
                        }}
                      >
                        <h6>Forgot Password ?</h6>
                      </a>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#E3641B", color: "white" }}
                      >
                        Log In
                      </Button>
                    </div>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{
                        fontFamily: "Inter;",
                        fontSize: "14px;",
                        fontWeight: "500",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        style={{
                          textDecoration: "none",
                          color: "#E3641B",
                          fontWeight: "700",
                        }}
                      >
                        Sign Up
                      </a>
                    </Typography>
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  <h6>Chef</h6>
                  <form
                    component="form"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      textAlign: "center",
                      padding: "30px",
                      borderRadius: "10px",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    onSubmit={chefLogin}
                  >
                    {/* <div className="text-center">
                <img src={cheflogo} height="100px" width="100px"  style={{objectFit:"cover"}}/>
              </div> */}
                    <div className="mt-4">
                      <input
                        type="email"
                        label=""
                        placeholder="Chef Email"
                        fullWidth
                        style={{
                          border: "1px solid #000",
                          width: "100%",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setChefEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        label=""
                        placeholder="Password"
                        fullWidth
                        style={{
                          border: "1px solid #000",
                          width: "100%",
                          height: "40px",
                          borderRadius: "10px",
                          padding: "10px",
                          fontSize: "14px",
                          fontWeight: "500",
                          marginBottom: "20px",
                        }}
                        onChange={(e) => setChefPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-end">
                      <a
                        href="/resetpassword"
                        style={{
                          textDecoration: "none",
                          color: "#E3641B",
                          fontWeight: "600",
                        }}
                      >
                        <h6>Forgot Password ?</h6>
                      </a>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        style={{ backgroundColor: "#E3641B", color: "white" }}
                      >
                        Log In
                      </Button>
                    </div>
                    <Typography
                      variant="body2"
                      textAlign="center"
                      sx={{
                        fontFamily: "Inter;",
                        fontSize: "14px;",
                        fontWeight: "500",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        style={{
                          textDecoration: "none",
                          color: "#E3641B",
                          fontWeight: "700",
                        }}
                      >
                        Sign Up
                      </a>
                    </Typography>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
}
