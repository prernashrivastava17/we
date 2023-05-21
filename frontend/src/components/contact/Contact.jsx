import React from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";
import TopHeader from "../user/TopHeader";
import Footer from "../common/footer/Footer";
import ContactUsForm from "./ContactUsForm";

const Contact = () => {
  return (
    <>
      <TopHeader />
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <ContactUsForm />
      </section>
      <Footer />
    </>
  );
};

export default Contact;
