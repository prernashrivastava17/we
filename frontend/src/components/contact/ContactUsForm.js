import React, { useState } from "react";
import { showAlert } from "../utils/showAlert";
import { getAddContactUs } from "../utils/category";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function ContactUsForm() {
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data2, setData2] = useState({
    name: "",
    email: "",
    city: "",
    subject: "",
    message: "",
  });

  const { name, email, message, country, subject } = data2;
  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  //   Add API

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      country: country,
      email: email,
      subject: subject,
      message: message,
    };

    if (
      (name === "",
      country === "",
      email === "",
      subject === "",
      message === "")
    ) {
      setErrorMsg("Fill the Mandatory Fields");
    } else
      try {
        setButtonDisabled(true);
        await getAddContactUs(data);
        showAlert("Your Query Added Successfully", "success");
        setData2("");
        setButtonDisabled(false);
      } catch (error) {
        showAlert(error.data.message, "error");
      } finally {
        setErrorMsg("");
        setData2({
          name: "",
          country: "",
          email: "",
          subject: "",
          message: "",
        });
        navigate("/");
      }
  };

  return (
    <>
      <Container>
        <div className="detail-box mt-5">
        <h4>Fill out the form</h4>
          <div className="card-body form-custom">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext" className="mb-1">
                    Full Name
                  </label>
                  <span style={{ color: "red" }}> * </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext" className="mb-1">
                    Email Address
                  </label>
                  <span style={{ color: "red" }}> * </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext" className="mb-1">
                    Country/city
                  </label>
                  <span style={{ color: "red" }}> * </span>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={country}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="form-group">
                  <label htmlFor="exampleInputtext" className="mb-1">
                    Subject
                  </label>
                  <span style={{ color: "red" }}> * </span>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={subject}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="form-group">
                  <label htmlFor="exampleInputtext" className="mb-1">
                    Message
                  </label>
                  <span style={{ color: "red" }}> * </span>
                  <textarea
                    type="text"
                    className="form-control"
                    id="message"
                    name="message"
                    value={message}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-8 col-lg-6">
                <div className="form-group">
                  {" "}
                  <button
                    className="btn contactbtn btn-md pull-left"
                    name="submit"
                    type="submit"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    style={{backgroundColor:"#FF6922"}}
                    disabled={buttondisabled}
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                  <label
                    style={{
                      color: "red",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    {errorMsg}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactUsForm;
