import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { getAllContactUs, getDeleteContactUs } from "../utils/category";
import { showAlert } from "../utils/showAlert";

function ContactUs() {
  const [contactUs, setContactUs] = useState("");
  const [DeleteShow, setDeleteShow] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState("");

  const handleAllContactUs = async () => {
    try {
      const resp = await getAllContactUs();
      setContactUs(resp && resp.data);
    } catch (error) {
      showAlert("something went Wrong");
    }
  };

  useEffect(() => {
    handleAllContactUs();
  }, []);

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
      await getDeleteContactUs(data);
      showAlert("Service Deleted Successfully", "success");
      setDeleteShow(false);
      handleAllContactUs();
    } catch (error) {
      showAlert("Something Went Wrong", "error");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h3 className="mt-3 mb-3">ContactUs</h3>
          <Table striped bordered hover size="md" responsive>
            <thead style={{ backgroundColor: "#ff6922", color: "white" }}>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Query</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactUs &&
                contactUs?.map((item, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.message}</td>
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {/* Delete Modal */}

        <Modal show={DeleteShow} onHide={handlecloseDelete}>
          <Modal.Body>
            <h4 style={{ color: "#ff6922" }}>Delete ContactUs</h4>
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
            <p>Are you sure want to delete this ContactUs ?</p>
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
      </div>
    </>
  );
}

export default ContactUs;
