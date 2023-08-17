"use client";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ZubTbb</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <NavDropdown title="Social network" id="basic-nav-dropdown">
              <NavDropdown.Item href="/facebook">Facebook</NavDropdown.Item>
              <NavDropdown.Item href="/tiki">Tiki</NavDropdown.Item>
              <NavDropdown.Item href="/admin">Admins</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/youtube">Youtube</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
