import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { resetPassword } from "../utils/authentication";

function ResetPassword() {
  const [btnLoading, setBtnLoading] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { state } = useLocation();
  const { email, otp } = state;
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const buttonEnabled = password && confirmPassword;

  const reset = async () => {
    setConfirmPasswordError("");
    if (password == confirmPassword) {
      try {
        setBtnLoading(true);
        await resetPassword({ email, otp, password });
        navigate("/admin");
        showAlert("password Changed Successfully.", "success");
        alert("password Changed Successfully.", "success");
      } catch (error) {
        showAlert(error.data.message, "error");
      } finally {
        setBtnLoading(false);
      }
    } else {
      setBtnLoading(false);
      setConfirmPasswordError("Password is not matching");
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                id=""
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                id=""
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {confirmPasswordError && <p className="errorText">{confirmPasswordError}</p>}
            <Button
              type="submit"
              style={{
                backgroundColor: "#ff6922",
                border: "none",
                width: "100%",
              }}
              disabled={btnLoading || !buttonEnabled}
              onClick={reset}
            >
              {btnLoading ? "Resetting...." : "Reset Password"}
            </Button>
          </Form>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
