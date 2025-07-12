import {
    Button,
    Container,
    Row,
    Col,
    Form,
    Card
} from "react-bootstrap";
import Header from "../Header";

function account() {
    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        <Card style={{ width: "45rem" }}>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Col>
                                                <Form.Label>
                                                    House Name/No.
                                                </Form.Label>
                                                <Form.Control placeholder="Enter House Name/No." />
                                            </Col>
                                            <Col>
                                                <Form.Label>City</Form.Label>
                                                <Form.Control placeholder="Enter City" />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Col>
                                                <Form.Label>State</Form.Label>
                                                <Form.Control placeholder="Enter State" />
                                            </Col>
                                            <Col>
                                                <Form.Label>
                                                    Pin Code
                                                </Form.Label>
                                                <Form.Control placeholder="Enter Pin Code" />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Row>
                                            <Col>
                                                <Form.Label>
                                                    Phone no.
                                                </Form.Label>
                                                <Form.Control placeholder="Phone no." />
                                            </Col>
                                            <Col>
                                                <Form.Label>
                                                    Address type
                                                </Form.Label>
                                                <Form.Select aria-label="Default select example">
                                                    <option selected>
                                                        Select the Address type
                                                    </option>
                                                    <option value="1">
                                                        Home
                                                    </option>
                                                    <option value="2">
                                                        Office
                                                    </option>
                                                    <option value="3">
                                                        Others
                                                    </option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                        <Form.Check
                                            type="checkbox"
                                            label="Check me out"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        </>
    );
}

export default account;
