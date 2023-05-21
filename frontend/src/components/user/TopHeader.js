import React from "react";
import { Container, Nav, Navbar} from "react-bootstrap";

function TopHeader() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor:"white"}}>
      <Container>
        <Navbar.Brand href="/">Prime<span style={{color:"#ff6922"}}>SolutionMarket</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/shop">Shops</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopHeader;