import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { getShopsByCategory, imageUrl } from "../utils/category";
import { useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import Footer from "../common/footer/Footer";
import img from "../images/services.jpg";
import Back from "../common/Back"

const CategoryShop = () => {
  const [showData, setShowData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      const response = await getShopsByCategory({
        name: location.pathname.slice(1).toString(),
      });
      console.log("response", response?.data?.data?.shops);
      setShowData(response?.data?.data?.shops);
    };
    getData();
  }, []);
  return (
    <>
      <TopHeader />
      <section className='services mb'>
        <Back name='Shops' title='Shops - Category Wise Shops' cover={img} />
      </section>
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Col lg={12} md={12} sm={12} xs={12}>
            {showData &&
              showData?.map((item, i) => (
                <Card
                  className="my-5"
                  style={{
                    flexDirection: "row",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={
                      item?.img === null
                        ? "/images/default_user.png"
                        : imageUrl(item?.img)
                    }
                    style={{ width: "35%", height: "220px" }}
                  />
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      {item?.name}
                    </Card.Title>
                    <hr />
                    <Row style={{ flexDirection: "row", marginTop: "20px" }}>
                      <Col xs={12} lg={4}>
                        <div style={{ color: "orange", textAlign: "left" }}>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                          <span class="fa fa-star checked"></span>
                        </div>
                        <p className="mt-3">{item?.businessName}</p>
                      </Col>
                      <Col xs={12} lg={4}>
                        <p>5 Reviews</p>
                        <p>
                          <span style={{ color: "#FF6922" }}>Open - </span>Till
                          10 P.M
                        </p>
                      </Col>
                      <Col xs={12} lg={4}>
                        <p>
                          <span style={{ color: "#FF6922" }}>Contact : </span>
                          {item?.number}
                        </p>
                        <p>
                          <span style={{ color: "#FF6922" }}>Address : </span>
                          {item?.area} <span> {item?.city}</span>,{" "}
                          <span>{item?.pincode}</span>
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryShop;
