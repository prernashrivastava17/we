import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import {
  getAllCategories,
  getAddCategory,
  getDeleteCategory,
  getEditCategory,
  imageUrl,
} from "../utils/category";
import { showAlert } from "../utils/showAlert";

function Categories() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [DeleteShow, setDeleteShow] = useState(false);
  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [categoryList, setcategoryList] = useState("");
  const [tableData, setTableData] = useState("");
  const [image, setImage] = useState("");

  const [data2, setData2] = useState({
    id: "",
    name: "",
    description: "",
    slug: "",
  });
  const { id, name, slug, description, link } = data2;

  const handleChange = (e) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    var reader = new FileReader();
    reader.onload = function () {
      var output = document.getElementById("image");
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

  const handleDeleteShop = async () => {
    const data = {
      id: deleteRecord?.id,
    };
    try {
      await getDeleteCategory(data);
      showAlert("Category Deleted Successfully", "success");
      setDeleteShow(false);
      handleAllCategories();
    } catch (error) {
      showAlert("Something Went Wrong", "error");
    }
  };

  // Add Category APIs

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("image", file[x]);
      data.append("name", name);
    }

    if (name === "" || file === "") {
      setErrorMsg("Fill the Mandatory Fields");
    } else
      try {
        setButtonDisabled(true);
        await getAddCategory(data);
        showAlert("Added Category.", "success");
        setShow(false);
        setFile("");
        handleAllCategories();
      } catch (error) {
        showAlert(error.data.message, "error");
      } finally {
        setShow(false);
      }
  };

  //  edit API

  const handleEditShow = (item) => {
    setImage(item.image);
    setData2({
      id: item.id,
      name: item.name,
    });
    setShowEditModal(true);
  };
  const handleEditShop = async () => {
    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("image", file[x]);
    }
    data.append("name", name);
    data.append("id", id);

    try {
      await getEditCategory(data);
      showAlert("Category Edited Successfully", "success");
      setShowEditModal(false);
      setData2(" ");
      setFile("");
      handleAllCategories();
    } catch (error) {
      showAlert("Something Went Wrong", "error");
    }
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setData2(" ");
    setFile("");
  };

  //Get All Category Api

  const handleAllCategories = async () => {
    try {
      let tableDataArr = [];
      const resp = await getAllCategories();
      setcategoryList(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id: data.id,
            name: data.name,
            description: data.description,
            file: data.image,
          };
          tableDataArr.push(value);
        });
    } catch (error) {
      showAlert("something went Wrong", "error");
    }
  };

  useEffect(() => {
    handleAllCategories();
  }, []);

  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-lg-6 col-md-6 text-left">
            <h3 className="mt-4 mb-4">Categories</h3>
          </div>
          <div className="col-lg-6 col-md-6 text-right">
            <div className="header justify-content-end">
              <button
                type="button"
                className="btn btn-primary btn-sm my-3"
                style={{
                  backgroundColor: "#ff6922",
                  border: "1px solid #ff6922",
                  marginTop: "30px !important",
                }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add New Category
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
                    Add New Category
                  </Modal.Title>
                  <div className="container">
                    <Form.Group>
                      <Form.Label>Category Name</Form.Label>
                      <span style={{ color: "red" }}> * </span>
                      <Form.Control
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Upload Image</Form.Label>{" "}
                      <span style={{ color: "red" }}> * </span>
                      <div className="form-group text-center img_uploads">
                        <img
                          id="image"
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
                            id="file"
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
                    // variant="primary"
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
          <thead
            className="admintable"
            style={{ backgroundColor: "#ff6922", color: "white" }}
          >
            <tr>
              <th>Sr.No.</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList &&
              categoryList?.map((item, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{item?.name}</td>
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
          <h4 style={{ color: "#ff6922" }}>Delete Category</h4>
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
          <p>Are you sure want to delete this Category ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handlecloseDelete()}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#ff6922", border: "none" }}
            onClick={() => handleDeleteShop(deleteRecord)}
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
              <h4 style={{ color: "#ff6922" }}>Edit Category</h4>
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
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    name="name"
                    onChange={handleChange}
                  ></Form.Control>
                  <Form.Label>Upload Icon</Form.Label>{" "}
                  <div className="form-group text-center img_uploads">
                    <img
                      id="image"
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
                        id="file"
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
                onClick={handleEditShop}
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

export default Categories;
