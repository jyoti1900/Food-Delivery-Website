import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../api/axios";

const customrRegisterApi = "/api/v1/customer/register";

const Register = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast("Confirm password is not matching with your password");
            return;
        }
        setLoading(true);
        const customrData = {
            mobile: phone,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        };
        axios
            .post(customrRegisterApi, customrData)
            .then((res) => {
                if (res.data.success) {
                    toast("Registration successful! Please login to continue");
                    setTimeout(() => {
                        navigate("/");
                        setLoading(false);
                    }, 3000);
                } else {
                    setLoading(false);
                    toast("Failed to register! Please try again.");
                }
            })
            .catch((err) => {
                console.error(err.response);
                setLoading(false);
                if (err.response) {
                    toast(err.response?.data?.message);
                }
            });
    };

    return (
        <>
            <Container
                fluid
                className="justify-content-center"
                style={{
                    backgroundImage:
                        "url('https://assets.vogue.in/photos/61d84b5b9db8964401d2b0e4/16:9/w_4591,h_2582,c_limit/15%20best%20multi-cuisine%20restaurants%20in%20Mumbai,%20New%20Delhi,%20Bengaluru,%20Kolkata%20and%20Goa.jpg')", // Set background image
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Row className="vh-100">
                    <Col sm={4} />

                    <Col
                        sm={4}
                        className="d-flex flex-column justify-content-center"
                    >
                        <Card
                            className="shadow bg-body-tertiary rounded p-3 mb-5"
                            style={{
                                maxWidth: "450px", // Adjust the maximum width of the card
                                marginTop: "30px",
                                marginLeft: "90px",
                                marginRight: "80px", // Center the card horizontally
                            }}
                        >
                            <Card.Body>
                                <h2>Sign Up</h2>
                                <br />

                                <Form
                                    onSubmit={handleSubmit}
                                    validated={validated}
                                    novalidate
                                >
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formPhoneNo"
                                    >
                                        <Form.Label>Phone no</Form.Label>
                                        <Form.Control
                                            id="phoneno"
                                            type="number"
                                            placeholder="Enter Phone no"
                                            controlId="formPhoneNo"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            required
                                            isInvalid={validated && !phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Phone no. field cannot be empty
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicName"
                                    >
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            id="name"
                                            type="name"
                                            placeholder="Enter First Name"
                                            controlId="formBasicName"
                                            value={firstname}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Name field cannot be empty
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicName"
                                    >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            id="name"
                                            type="name"
                                            placeholder="Enter Last Name"
                                            controlId="formBasicName"
                                            value={lastname}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Name field cannot be empty
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            id="username"
                                            type="email"
                                            placeholder="Enter email"
                                            controlId="formBasicEmail"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Email field cannot be empty
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            controlId="formBasicPassword"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password field cannot be empty
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <Form.Label>
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            id="password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            controlId="formBasicPassword"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Confirm password field cannot be
                                            empty
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit "
                                        className="w-100 rounded-pill"
                                        disabled={loading}
                                    >
                                        Submit
                                    </Button>
                                </Form><br/>
                                <div className='d-flex justify-content-center'>
                            <a href="login" className=" text-decoration-none" controlId="formForgotPassword" >
                                        Already Registered? Login Here
                                    </a>
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={4} />
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
};

export default Register;
