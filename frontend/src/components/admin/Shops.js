import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import {
  getAllShops,
  getAddShop,
  getEditShop,
  getDeleteShop,
  getAllCategories,
  imageUrl,
} from "../utils/category";
import { showAlert } from "../utils/showAlert";

function Shops() {
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setErrorMsg("");
  };
  const [show, setShow] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [DeleteShow, setDeleteShow] = useState(false);
  const [file, setFile] = useState("");
  const [Image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [servicesList, setServicesList] = useState("");
  const [shopList, setShopList] = useState("");

  const [data2, setData2] = useState({
    id: "",
    name: "",
    city: "",
    contact: "",
    area: "",
    category: "",
  });
  const { id, name, city, contact, area, category } = data2;

  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };
  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("proimage");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    setFile(event.target.files);
  };

  const handleDeleteshow = (item) => {
    setDeleteShow(true);
    setDeleteRecord(item);
  };

  const handlecloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteService = async () => {
    const data = {
      id: deleteRecord.id,
    };
    try {
      await getDeleteShop(data);
      showAlert("Shop Deleted Successfully", "success");
      setDeleteShow(false);
      handleAllShops();
    } catch (error) {
      showAlert("Something Went Wrong", "error");
    }
  };

  // Add APIs

  const handleSubmit = async (event) => {
    event.preventDefault();
    let ServiceId = "";
    {
      servicesList &&
        servicesList.map((item) => {
          if (item.name === category) {
            ServiceId = item.id;
          }
        });
    }
    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("image", file[x]);
    }
    data.append("area", area);
    data.append("name", name);
    data.append("category", category);
    data.append("contact", contact);
    data.append("city", city);
    data.append("service_id", ServiceId);

    if (
      (name === "" ||
        area === "" ||
        category === "" ||
        file === "" ||
        contact === "",
      city === "")
    ) {
      setErrorMsg("Fill the Mandatory Fields");
    } else {
      try {
        setButtonDisabled(true);
        await getAddShop(data);
        showAlert("Added  Services Succesfully.", "success");
        setErrorMsg("");
        setData2(" ");
        setButtonDisabled(false);
        setShow(false);
        handleAllShops();
      } catch (error) {
        showAlert(error.data.message, "error");
        setButtonDisabled(false);
      } finally {
        setShow(false);
      }
    }
  };

  //  edit API

  const handleEditShow = (item) => {
    setImage(item.img);
    setData2({
      id: item.id,
      name: item.name,
      city: item.city,
      area: item.area,
      category: item.name,
      contact: item.contact,
    });
    setShowEditModal(true);
  };

  const handleEditServices = async () => {
    let EditServiceId = "";
    {
      servicesList &&
        servicesList.map((item) => {
          if (item.name === category) {
            EditServiceId = item.id;
          }
        });
    }
    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("image", file[x]);
    }
    data.append("city", city);
    data.append("name", name);
    data.append("area", area);
    data.append("category", category);
    data.append("serviceId", EditServiceId);
    data.append("contact", contact);
    data.append("id", id);

    try {
      await getEditShop(data);
      showAlert("Service Product Edited Successfully", "success");
      setData2("");
      setFile("");
      setShowEditModal(false);
      handleAllShops();
    } catch (error) {
      showAlert("Something Went Wrong", "error");
    }
  };

  const handleEditClose = () => {
    setData2("");
    setFile("");
    setShowEditModal(false);
  };

  // Get All Category Api

  const handleAllShops = async () => {
    try {
      const resp = await getAllShops();
      setShopList(resp && resp.data);
    } catch (error) {
      showAlert("something went Wrong");
    }
  };

  useEffect(() => {
    handleAllShops();
  }, []);

  const handleAllServices = async () => {
    try {
      const resp = await getAllCategories();
      setServicesList(resp && resp.data);
    } catch (error) {
      showAlert("something went Wrong", "error");
    }
  };

  useEffect(() => {
    handleAllServices();
  }, []);

  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-lg-6 col-md-6 text-left">
            <h3 className="mt-4 mb-4">Shops</h3>
          </div>
          <div className="col-lg-6 col-md-6 text-right">
            <div className="header justify-content-end">
              <button
                type="button"
                className="btn btn-primary btn-sm my-3"
                style={{
                  // marginRight: "15px",
                  backgroundColor: "#ff6922",
                  border: "none",
                  marginTop: "30px !important",
                }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add New Shop
              </button>
              <Modal show={show} onHide={handleClose} className="add_cat_modal">
                <Modal.Body>
                  <button
                    type="button"
                    className="close"
                    onClick={handleClose}
                    style={{ position: "absolute", top: "5px", right: "10px" }}
                  >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                  </button>
                  <Modal.Title style={{ color: "#ff6922", marginLeft: "25px" }}>
                    Add New Shop
                  </Modal.Title>
                  <div className="container">
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>City</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="text"
                        value={city}
                        name="city"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Area</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="text"
                        value={area}
                        name="area"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Upload</Form.Label>{" "}
                      <div className="form-group text-center img_uploads">
                        <img
                          id="proimage"
                          style={{
                            maxwidth: "100%",
                            borderRadius: "50%",
                            height: "120px",
                          }}
                          src={
                            Image
                              ? `${imageUrl(Image)}`
                              : "/images/default_user.png"
                          }
                          className="img-fluid"
                        />
                        <label
                          className=""
                          style={{ marginTop: "15px", cursor: "pointer" }}
                        >
                          <i
                            className="fas fa-camera bg-info p-2 rounded-circle text-white"
                            style={{ bottom: "32%" }}
                          ></i>
                          <input
                            id="proimage"
                            type="file"
                            name="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleFileChange}
                            className="form-control"
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                      <Form.Label>Service Category</Form.Label>
                      <span style={{ color: "red" }}>*</span> <br />
                      <Form.Select
                        value={category}
                        name="category"
                        onChange={handleChange}
                        size="default"
                        style={{
                          height: "35px",
                          color: "grey",
                          borderColor: "beige",
                        }}
                      >
                        <option> Please select the Category </option>
                        {servicesList &&
                          servicesList.map((item) => (
                            <option value={item.name ? item.name : ""}>
                              {item ? item.name : ""}
                            </option>
                          ))}
                      </Form.Select>
                      <br />
                      <Form.Label>Contact</Form.Label>
                      <span style={{ color: "red" }}>*</span>
                      <Form.Control
                        type="number"
                        min="0"
                        value={contact}
                        name="contact"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    size="lg"
                    disabled={buttondisabled}
                    onClick={handleSubmit}
                    style={{
                      width: "200%",
                      backgroundColor: "#ff6922",
                      border: "none",
                    }}
                  >
                    Submit
                  </Button>

                  <label style={{ color: "red", justifyContent: "center" }}>
                    {errorMsg}
                  </label>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <Table striped bordered hover size="md" responsive>
          <thead style={{ backgroundColor: "#ff6922", color: "white" }}>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shopList &&
              shopList?.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.area}</td>
                  <td>
                    <img
                      src={
                        item?.img === null
                          ? "/images/default_user.png"
                          : imageUrl(item?.img)
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>
                    <a
                      className="nav-link"
                      onClick={() => {
                        handleDeleteshow(item);
                      }}
                    >
                      {" "}
                      <i class="fa-solid fa-trash"></i>
                    </a>
                    <a
                      className="nav-link"
                      onClick={() => {
                        handleEditShow(item);
                      }}
                    >
                      <i className="fa fa-edit" />
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* Delete Modal */}

      <Modal show={DeleteShow} onHide={handlecloseDelete}>
        <Modal.Body>
          <h4 style={{ color: "#ff6922" }}>Delete Shop</h4>
          <button
            type="button"
            className="close"
            onClick={handlecloseDelete}
            style={{ position: "absolute", top: "5px", right: "10px" }}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <hr />
          <p>Are you sure want to delete this Shop ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handlecloseDelete()}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#ff6922", border:"none" }}
            onClick={() => handleDeleteService(deleteRecord)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
        <div className="header">
          <Modal show={ShowEditModal} onHide={handleEditClose} size="md">
            <Modal.Body>
            <h4 style={{ color: "#ff6922" }}>Edit Shop</h4>
            <button
              type="button"
              className="close"
              onClick={handleEditClose}
              style={{ position: "absolute", top: "5px", right: "10px" }}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
            <hr />
              <div className="container">
                <Form.Group>
                  <Form.Label>Services Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    name="city"
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label>Area</Form.Label>
                  <span style={{ color: "red" }}>*</span>
                  <Form.Control
                    type="text"
                    value={area}
                    name="area"
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label>Service Category</Form.Label> <br />
                  <Form.Select
                    value={category}
                    name="category"
                    onChange={handleChange}
                    size="default"
                    style={{
                      height: "35px",
                      color: "grey",
                      borderColor: "beige",
                    }}
                  >
                    <option> Please select the Category </option>
                    {servicesList &&
                      servicesList.map((item) => (
                        <option value={item.name ? item.name : ""}>
                          {item ? item.name : ""}
                        </option>
                      ))}
                  </Form.Select>
                  <br />
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="number"
                    value={contact}
                    min="0"
                    name="contact"
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label>Upload</Form.Label>{" "}
                  <div className="form-group text-center img_uploads">
                    <img
                      id="proimage"
                      style={{
                        maxwidth: "100%",
                        borderRadius: "50%",
                        height: "120px",
                      }}
                      src={
                        Image
                          ? `${imageUrl(Image)}`
                          : "/images/default_user.png"
                      }
                      className="img-fluid"
                    />
                    <label
                      className=""
                      style={{ marginTop: "15px", cursor: "pointer" }}
                    >
                      <i className="fas fa-camera bg-info p-2 rounded-circle text-white"></i>
                      <input
                        id="image"
                        type="file"
                        name="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={handleFileChange}
                        className="form-control"
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ backgroundColor: "#ff6922", border:"none", width:"200%" }}
                size="lg"
                onClick={handleEditServices}
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Shops;
