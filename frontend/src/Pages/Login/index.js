import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import signupimg from "../../Images/signupimg2.jpg";
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // ********* user login **********
  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    console.log("login data is --->", data);
    const res = await postApihandler("/userLogin", data);

    localStorage.setItem("userData", JSON.stringify(res.data));
    localStorage.setItem("check", "user");
    if (res.status === 200) {
      swal(" Login Successfully");
      navigate("/home");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
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

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("check", "chef");

      swal(" Login Successfully");
      navigate("/chefavailablity");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="">
          <Col xs={12} md={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    variant="fullWidth"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="User" value="1" />
                    <Tab label="Chef" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box
                    sx={{
                      minHeight: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundImage: `url(${signupimg})`, // Ensure correct path
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Container maxWidth="sm">
                      <Paper
                        elevation={5}
                        sx={{
                          padding: 4,
                          borderRadius: 3,
                          textAlign: "center",
                          maxWidth: 400,
                          margin: "auto",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          User Login
                        </Typography>

                        <form onSubmit={userLogin}>
                          <TextField
                            fullWidth
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                          />

                          <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                          />

                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography variant="body2">
                                I agree to the{" "}
                                <a
                                  href="#"
                                  style={{ color: "#03a9f4", fontWeight: 600 }}
                                >
                                  Terms & Conditions
                                </a>
                              </Typography>
                            }
                          />

                          <Button
                            type="submit"
                            fullWidth
                            sx={{
                              mt: 2,
                              py: 1.5,
                              fontWeight: "bold",
                              background:
                                "linear-gradient(to right, #6dd5ed, #2193b0)",
                              color: "white",
                              "&:hover": {
                                background:
                                  "linear-gradient(to right, #2193b0, #6dd5ed)",
                              },
                            }}
                          >
                            Login
                          </Button>
                        </form>

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
                      </Paper>
                    </Container>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box
                    sx={{
                      minHeight: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundImage: `url(${signupimg})`, // Ensure correct path
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <Container maxWidth="sm">
                      <Paper
                        elevation={5}
                        sx={{
                          padding: 4,
                          borderRadius: 3,
                          textAlign: "center",
                          maxWidth: 400,
                          margin: "auto",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                          Chef Login
                        </Typography>

                        <form onSubmit={chefLogin}>
                          <TextField
                            fullWidth
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            value={chefemail}
                            onChange={(e) => setChefEmail(e.target.value)}
                            margin="normal"
                            required
                          />

                          <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={chefpassword}
                            onChange={(e) => setChefPassword(e.target.value)}
                            margin="normal"
                            required
                          />

                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography variant="body2">
                                I agree to the{" "}
                                <a
                                  href="#"
                                  style={{ color: "#03a9f4", fontWeight: 600 }}
                                >
                                  Terms & Conditions
                                </a>
                              </Typography>
                            }
                          />

                          <Button
                            type="submit"
                            fullWidth
                            sx={{
                              mt: 2,
                              py: 1.5,
                              fontWeight: "bold",
                              background:
                                "linear-gradient(to right, #6dd5ed, #2193b0)",
                              color: "white",
                              "&:hover": {
                                background:
                                  "linear-gradient(to right, #2193b0, #6dd5ed)",
                              },
                            }}
                          >
                            Login
                          </Button>
                        </form>

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
                      </Paper>
                    </Container>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
}
