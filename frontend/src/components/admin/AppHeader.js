import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import { AUTH_TOKEN, deleteCookie, getCookie } from "../utils/cookie";
import { getUserDetailsByToken } from "../utils/authentication";
import { showAlert } from "../utils/showAlert";
import { Dropdown } from "react-bootstrap";
import { ROLE } from "../utils/authconstant"

export default function AppHeader(props) {
  const navigate = useNavigate();
  const [navState, setNavState] = useState(false);
  const [username, setUsername] = useState("");
  const isAuthenticated = getCookie(AUTH_TOKEN);

  const getDataByToken = async () => {
    if (isAuthenticated) {
      const result = await getUserDetailsByToken();
      if (
        result?.data?.data?.role == ROLE.USER ||
        result?.data?.data?.role == ROLE.VENDOR
      ) {
        showAlert("Unauthorized", "error");
        navigate("/");
      } else {
        setUsername(result?.data?.data?.name);
      }
    } else {
      navigate("/");
      showAlert("Unauthorized", "error");
    }
  };

  React.useEffect(() => {
    getDataByToken();
  }, []);

  const handleSideNav = () => {
    setNavState(!navState);
    props.handleClick(navState);
  };

  return (
    <div className="sb-nav-fixed bg-light">
      <nav className="sb-topnav navbar navbar-expand">
        <a className="navbar-brand">
          <h6><span style={{color:"white"}}>Prime</span>SolutionMarket</h6>
        </a>
        <button
          className="btn btn-link btn-lg order-1 order-lg-0"
          id="sidebarToggle"
          onClick={() => {
            handleSideNav();
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
          <Dropdown
             className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-4 my-2 my-md-0"
            style={{ position: "relative" }}
          >
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{ background: "transparent", border: "none" }}
            >
              <img className="usericon" src="/images/user.png" style={{height:"30px", width:"30px"}} />
              <span className="username">Hey {username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  deleteCookie(AUTH_TOKEN);
                  showAlert("Logged out.", "success");
                  navigate("/login");
                  window.location.reload();
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </nav>
    </div>
  );
}
