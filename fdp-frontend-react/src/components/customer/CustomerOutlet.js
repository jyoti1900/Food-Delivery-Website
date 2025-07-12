import {
    Button,
    Container,
    Form,
    Nav,
    Navbar,
    InputGroup,
    Dropdown,
    ButtonGroup,
    Row,
    Col,
} from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import logo7 from "../../img/logo7.png";


const CustomerOutlet = () => {
    const navigate = useNavigate();
    // const [searchTerm, setSearchTerm] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_details");
        setTimeout(() => {
            navigate("/login");
            window.location.reload();
        }, 1000);
    };
    
    // const handleSearch = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await fetch(`/api/v1/customer/all-item?q=${searchTerm}`);
    //         const data = await response.json();
    //         setSearchResults(data); // Assuming the API returns an array of search results
    //     } catch (error) {
    //         console.error("Error fetching search results:", error);
    //     }
    // };

    return (
        <>
            <Navbar
                style={{ backgroundColor: "#e3f2fd" }}
                variant="light"
                expand="lg"
            >
                <Container
                    fluid
                    style={{ marginLeft: "14%", marginRight: "14%" }}
                >
                    <Navbar.Brand href="/">
                        <img
                            src={logo7}
                            width="120"
                            height="44"
                            className="d-inline-block align-top"
                        />{" "}
                        EngineerFoodies.in
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="header-menu">
                        <Nav
                            className="m-auto my-2 my-lg-0 justify-content-center"
                            style={{ maxHeight: "100px", width: "70%" }}
                            navbarScroll
                        >
                            {/* <Form className="d-flex w-100" >
                                <InputGroup className="m-2">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button variant="light" size="sm">
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </Form> */}
                        </Nav>

                        <div className="d-flex">
                            <Button
                                variant="light"
                                className="me-2"
                                onClick={() => navigate("/cart")}
                            >
                                <i class="bi bi-cart" />
                            </Button>
                            <Dropdown as={ButtonGroup}>
                                <Button variant="light" onClick={signOut}>
                                    Sign out
                                </Button>

                                <Dropdown.Toggle
                                    split
                                    variant="light"
                                    id="dropdown-split-basic"
                                />

                                <Dropdown.Menu>
                                    <Dropdown.Item href="orders">
                                        My orders
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />

            <Container>
                <Row>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                        <Outlet />
                    </Col>
                    <Col sm={1}></Col>
                </Row>
            </Container>
        </>
    );
};

export default CustomerOutlet;
