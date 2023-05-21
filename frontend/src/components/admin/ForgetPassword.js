import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { isValidEmail } from "../utils/validators";
import { forgotPassword } from "../utils/authentication";
import InputField from "./InputField";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [btnLoading, setBtnLoading] = useState();

  const navigate = useNavigate();
  const formValue = {
    email,
    validation: { email: emailError },
  };

  const sendOTP = async () => {
    setEmailError("");
    if (!isValidEmail(email)) {
      setEmailError("Please enter valid email.");
      return;
    }
    try {
      setBtnLoading(true);
      await forgotPassword(email);
      showAlert("Recovery link sent to your mail, Please check..", "success");
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      showAlert(error.data.message, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
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
            <div class="panel panel-default">
              <div class="panel-body">
                <div class="text-center">
                  <h5 style={{ textAlign: "center", marginBottom: "7vh" }}>
                    <span style={{ color: "#ff6922" }}>Prime</span>
                    SolutionsMarket
                  </h5>
                  <h3>
                    <i class="fa fa-lock fa-2x"></i>
                  </h3>
                  <h3 class="text-center">Forgot Password?</h3>
                  <p>Please Enter your Email Address Below.</p>
                  <div class="panel-body">
                    <Form style={{ backgroundColor: "#e9ecf3" }}>
                      <InputField
                        id="email"
                        placeholder="Enter email here"
                        type="email"
                        value={formValue}
                        handleChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && <p className="errorText">{emailError}</p>}
                      <Button
                      style={{
                        backgroundColor: "#ff6922",
                        border: "none",
                        width: "100%",
                      }}
                        disabled={btnLoading || !email}
                        onClick={sendOTP}
                      >
                        {btnLoading ? "Sending...." : "Send"}
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default ForgetPassword;
