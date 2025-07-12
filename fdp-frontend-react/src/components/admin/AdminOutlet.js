import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
    Container,
    Navbar,
    Nav,
    Row,
    Col,
    Collapse,
    Button,
} from "react-bootstrap";
import logo7 from "../../img/logo7.png";
import { useNavigate, Outlet } from "react-router-dom";

const AdminOutlet = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_details");
        setTimeout(() => {
            navigate("/login");
            window.location.reload();
        }, 1000);
        
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <Navbar expand="lg" className="mb-2 bg-body-tertiary">
                            <Container>
                                <Navbar.Brand href="/dashboard">
                                    <img
                                        src={logo7} 
                                        width="120"
                                        height="44"
                                        className="d-inline-block align-top"
                                    />{" "}
                                    Engineer Foodies
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        {/* <Nav.Link href="#home">About</Nav.Link>
                                        <Nav.Link href="#link">
                                            Contact
                                        </Nav.Link> */}
                                    </Nav>
                                    <Nav>
                                        <Button
                                            onClick={signOut}
                                            variant="secondary"
                                            style={{ float: "right" }}
                                            className="float-right"
                                        >
                                            Sign out
                                        </Button>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </Col>
                    <Col sm={2} className="bg-light sidebar">
                        {/* Sidebar toggle button */}
                        <Button
                            className={`d-md-none toggle-button ${
                                isOpen ? " open" : ""
                            }`}
                            variant="light"
                            onClick={toggleSidebar}
                        >
                            <i class="bi bi-list"></i>
                        </Button>
                        {/* Sidebar content */}
                        <Collapse in={isOpen}>
                            <Sidebar />
                        </Collapse>
                    </Col>
                    <Col sm={10}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminOutlet;
