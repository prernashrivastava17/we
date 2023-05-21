import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <section className="footerContact">
        <div className="container">
          <div className="send flex">
            <div className="text">
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your business online.</p>
            </div>
            <button className="btn5"> <a href="/contact" style={{color:"#ff6922"}}>Contact Us Today</a> </button>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "#1d2636", color: "white" }}>
        <Container>
          <Row>
            <Col lg={6}>
              <div className="box mt-4">
                <div className="logo">
                  Prime<span style={{ color: "#ff6922" }}>SolutionsMarket</span>
                  <h3>Do You Need Help With Anything?</h3>
                  <p>
                    Receive updates, hot deals, tutorials, discounts sent
                    straignt in your inbox every month
                  </p>
                  <div className="input flex">
                    <input
                      type="text"
                      placeholder="Email Address"
                      style={{ backgroundColor: "white" }}
                    />
                    <button>Subscribe</button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={2}>
              <div className="box mt-4">
                <h6>FOLLOW US</h6><br />
                &nbsp;&nbsp;<a href="/"><i class="fa-brands fa-facebook fa-xl"></i></a><br /><br />
                &nbsp;&nbsp;<a href="/about"><i class="fa-brands fa-instagram fa-xl"></i></a><br /><br />
                &nbsp;&nbsp;<a href="/services"><i class="fa-brands fa-linkedin fa-xl"></i></a><br /><br />
                &nbsp;&nbsp;<a href="/contact"><i class="fa-brands fa-pinterest fa-xl"></i></a>
              </div>
            </Col>
            <Col lg={2}>
              <div className="box mt-4">
                <h6>ALL SECTIONS</h6>
                <a href="/">Home</a><br />
                <a href="/about">About</a><br />
                <a href="/services">Service</a><br />
                <a href="/contact">Contact</a>
              </div>
            </Col>
            <Col lg={2}>
              <div className="box mt-4">
                <h6>COMPANY</h6>
                <p>
                  Prime<span style={{ color: "#ff6922" }}>SolutionsMarket</span>&nbsp;
                   is a business information portal where local businesses can
                  list themselves so that the people of their city can locate
                  the right business for their needs conveniently and quickly.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="legal">
        <span>© 2022 Prime<span style={{ color: "#ff6922" }}>SolutionsMarket</span> || All rights reserved.</span>
      </div>
    </>
  );
};

export default Footer;
