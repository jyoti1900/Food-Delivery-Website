import {
    Button,
    Container,
    Form,
    Nav,
    Navbar,
    InputGroup,
    Dropdown,
    ButtonGroup
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <>
            <Navbar
                style={{ backgroundColor: "#e3f2fd" }}
                variant="light"
                expand="lg"
            >
                <Container fluid style={{ marginLeft: "14%", marginRight: "14%" }}>
                    <Navbar.Brand href="products">EngineerFoodies.in</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="header-menu">
                        <Nav
                            className="m-auto my-2 my-lg-0 justify-content-center"
                            style={{ maxHeight: "100px", width: "70%" }}
                            navbarScroll
                        >
                            <Form className="d-flex w-100">
                                <InputGroup className="m-2">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <Button variant="light" size="sm">
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Nav>

                        <div className="d-flex">
                            <Button variant="light" className="me-2" onClick={() => navigate("/cart")}>
                                <i class="bi bi-cart" />
                            </Button>
                            <Dropdown as={ButtonGroup}>
                                {token ?
                                    <Button variant="light">Sign out</Button>
                                    : <Button variant="light">Sign up</Button>
                                }
                                <Dropdown.Toggle
                                    split
                                    variant="light"
                                    id="dropdown-split-basic"
                                />

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                        Login
                                    </Dropdown.Item>
                                    {token ?
                                        <>
                                            <Dropdown.Item href="#/action-2">
                                                My profile
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">
                                                Sign out
                                            </Dropdown.Item>
                                        </> : ''}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
        </>
    );
}

export default Header;
