import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import AdLanding from "../admin/AdLanding";
import Dashboard from "../admin/Dashboard";
import Categories from "../admin/Categories";
import Shops from "../admin/Shops";
import Settings from "../admin/Settings";
import ContactUs from "../admin/ContactUs";
import Login from "../admin/Login";
import ForgetPassword from "../admin/ForgetPassword";
import ResetPassword from "../admin/ResetPassword";
import { RedirectComponent } from "../utils/RedirectPage";
import VerifyEmail from "../admin/VerifyEmail";
import CategoryShop from "../user/CategoryShop";

const Pages = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/redirect" element={<RedirectComponent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Services />} />
          <Route path="/*" element={<CategoryShop />} />
          <Route path="/admin" element={<AdLanding />}>
            <Route path="" element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="shops" element={<Shops />} />
            <Route path="contacts" element={<ContactUs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Pages;
