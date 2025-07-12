import { Link } from "react-router-dom";
import { ListGroup, Accordion } from "react-bootstrap";

const sidebarLinkStyle = {
    color: "black",
    fontWeight: 500,
    textDecoration: "none",
};
const Sidebar = () => {
    return (
        <>
            <ListGroup className="list-unstyled">
                <ListGroup.Item>
                    <Link to="/dashboard" style={sidebarLinkStyle}>
                        Dashboard
                    </Link>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                    <Link to="/editor" style={sidebarLinkStyle}>Editors Page</Link>
                </ListGroup.Item> */}
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Category</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup.Item>
                                <Link to="/category-list" style={sidebarLinkStyle}>
                                    Category List
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link to="/category-add" style={sidebarLinkStyle}>
                                    Category Add
                                </Link>
                            </ListGroup.Item>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Item</Accordion.Header>
                        <Accordion.Body>
                            <ListGroup.Item>
                                <Link to="/item-list" style={sidebarLinkStyle}>
                                    Item List
                                </Link>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link to="/item-add" style={sidebarLinkStyle}>
                                    Item Add
                                </Link>
                            </ListGroup.Item>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/* <ListGroup.Item>
                    <Link to="/lounge" style={sidebarLinkStyle}>
                        Item
                    </Link>
                </ListGroup.Item> */}
            </ListGroup>
            {/* <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/editor">Editors Page</Link>
            <Link to="/admin">Admin Page</Link>
        </section> */}
        </>
    );
};

export default Sidebar;
