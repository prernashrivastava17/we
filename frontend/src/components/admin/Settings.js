import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { changePassword } from "../utils/authentication";
import "./settings.css";

function Settings({ clientside }) {
  const [errorMsg, seterrorMsg] = useState("");
  const Token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  const [data, setData] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
  });
  const { confirmPassword, oldPassword, newPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const eye = <EyeOutlined />;

  const [OldPasswordShown, setOldPasswordShown] = useState(false);
  const toggleOldPasswordVisiblity = () => {
    setOldPasswordShown(OldPasswordShown ? false : true);
  };
  // New Password Field
  const [NewPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(NewPasswordShown ? false : true);
  };
  // Confirm New Password Field
  const [ConfNewPasswordShown, setConfNewPasswordShown] = useState(false);
  const toggleConfNewPasswordVisiblity = () => {
    setConfNewPasswordShown(ConfNewPasswordShown ? false : true);
  };

  const reset = async () => {
    const payload = {
      email: email,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      password: newPassword,
      token: Token,
    };
    if (confirmPassword !== newPassword) {
      seterrorMsg("Password doesn't match");
    } else {
      try {
        const response = await changePassword(payload);
        setData(" ");
        seterrorMsg("");
        alert("Password Updated Successfully...");
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
  };

  React.useEffect(() => {
    console.log("window.localStorage.getItem", window.localStorage);
  }, []);

  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        {clientside ? (
          <h3 className="modal_heading">
            <span className="primary-color">Hello,</span> Change Your Password Below.
          </h3>
        ) : (
          <h3 className="mt-4 mb-4">Settings</h3>
        )}
        <div
          style={{
            width: "330px",
            marginTop: "40px",
            marginLeft: "20px",
          }}
        >
          <div className="pass-wrapper">
            <label className="required" htmlFor="oldpass">
              Old Password
            </label>
            <input
              id="pass"
              placeholder="Enter Old Password"
              name="oldPassword"
              value={oldPassword}
              type={OldPasswordShown ? "text" : "password"}
              onChange={handleChange}
              required="required"
            />
            <i onClick={toggleOldPasswordVisiblity}>{eye}</i>
          </div>
          <div className="pass-wrapper">
            <label className="required" htmlFor="newpass">
              New Password
            </label>
            <input
              id="pass"
              placeholder="Enter New Password"
              name="newPassword"
              value={newPassword}
              type={NewPasswordShown ? "text" : "password"}
              onChange={handleChange}
            />
            <i onClick={toggleNewPasswordVisiblity}>{eye}</i>
          </div>
          <div className="pass-wrapper">
            <label className="required" htmlFor="confpass">
              Confirm New Password
            </label>
            <input
              id="pass"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={confirmPassword}
              type={ConfNewPasswordShown ? "text" : "password"}
              onChange={handleChange}
            />
            <i className="eye" onClick={toggleConfNewPasswordVisiblity}>
              {eye}
            </i>
          </div>
          <label style={{ color: "red", justifyContent: "center" }}>
            {errorMsg}
          </label>

          <div
            className="bttn d-flex"
            style={{ borderRadius: "10px" }}
          >
            <button
              type="button"
              className="btn btn-lg"
              style={{backgroundColor:"#ff6922", color:"white"}}
              onClick={() => {
                reset();
              }}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
