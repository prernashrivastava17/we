import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authentication";
import { showAlert } from "../utils/showAlert";
import { setCookie, AUTH_TOKEN } from "../utils/cookie";
import InputField from "./InputField";

function Login() {
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();
  const [btnLoading, setBtnLoading] = useState();

  const navigate = useNavigate();

  const disable = !userName || !password || btnLoading;

  const login = async () => {
    try {
      setBtnLoading(true);
      const response = await loginUser( userName, password);
      showAlert("Logged in.", "success");
      setCookie(AUTH_TOKEN,response.data.data.jwtToken);
      const userId = response.data.data.userId
      sessionStorage.setItem('userId', userId);
      localStorage.setItem('userId', userId);
      
      navigate("/redirect")
    } catch (error) {
      showAlert("Please enter valid credentials.", "error");
      showAlert(error.data.massage)
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={3}></Col>
        <Col
          lg={6}
          style={{
            backgroundColor: "#e9ecf3",
            marginTop: "10vh",
            padding: "10vh 15vh 15vh 15vh",
            borderRadius: "10px",
          }}
        >
          <h5 style={{ textAlign: "center" }}>
            <span style={{ color: "#ff6922" }}>Prime</span>SolutionsMarket
          </h5>
          <Form style={{ backgroundColor: "#e9ecf3" }}>
            <InputField
              id=" userName"
              type="text"
              label="Username"
              mendetory
              value={{ userName }}
              handleChange={(e) => setuserName(e.target.value)}
            />
            <InputField
              id="password"
              type="password"
              label="Password"
              mendetory
              value={{ password }}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <a
              onClick={() => navigate("/forgetpassword")}
              style={{ cursor: "pointer" }}
            >
              Forget Password?
            </a>
            <hr />
            <Button
              disabled={disable}
              style={{
                backgroundColor: "#ff6922",
                border: "none",
                width: "100%",
              }}
              onClick={() => login()}
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
}

export default Login;
