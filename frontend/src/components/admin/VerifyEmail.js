import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyotp } from "../utils/authentication";
import { showAlert } from "../utils/showAlert";
import InputField from "./InputField";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [btnLoading, setBtnLoading] = useState();
  const { state } = useLocation();
  const { email } = state;

  const navigate = useNavigate();

  const verify = async () => {
    try {
      setBtnLoading(true);
      const data = {
        email,
        otp: otp,
      };
      await verifyotp(data);
      showAlert("Email verification successfull.", "success");
      alert("Email verification successfull.", "success");
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      showAlert(error.data.massage, "error");
    } finally {
      setBtnLoading(false);
    }
  };
  const resend = async () => {
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
                  <div class="panel-body">
                    <Form style={{ backgroundColor: "#e9ecf3" }}>
                      <InputField
                        id="otp"
                        label="Verification code"
                        value={{ otp }}
                        handleChange={(e) => setOtp(e.target.value)}
                      />
                      <p>
                        Didn't receive the code?&nbsp;{" "}
                        <a className="primary-color" onClick={resend}>
                          RESEND
                        </a>
                      </p>
                      <Button
                        disabled={btnLoading || !otp}
                        style={{
                          backgroundColor: "#ff6922",
                          border: "none",
                          width: "100%",
                        }}
                        onClick={verify}
                      >
                        {btnLoading ? "Confirming...." : "Confirm"}
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

export default VerifyEmail;
