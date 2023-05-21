import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppHeader from "./AppHeader";
import "./admin.css";



const Tabs = Object.freeze([
  { label: "Dashboard", link: "admin/" },
  { label: "Categories", link: "admin/categories" },
  { label: "Register Shops", link: "admin/shops" },
  { label: "Contact Us", link: "admin/contacts" },
  { label: "Settings", link: "admin/settings" },
]);


export default function AdLanding() {
  let navigate = useNavigate();
  const [toggle, setToggle] = useState("");
 
  const location = useLocation();
  const handleClick = (value) => {
    setToggle(value);
  };
  
  return (
    <div
      className={
        toggle
          ? "sb-nav-fixed bg-light sb-sidenav-toggled"
          : "sb-nav-fixed bg-light"
      }
    >
      <AppHeader handleClick={handleClick} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu notranslate" id="sb-sidenav-menu">
              <div className="nav mt-4">
                {Tabs.map(({ label, link }) => {
                  const isActive = location.pathname.split("/")[1] === link;
                  return (
                    <a
                      className={`nav-link ${isActive ? "active" : ""}`}
                      key={link}
                      onClick={() => navigate(`/${link}`)}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        <div id="layoutSidenav_content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
