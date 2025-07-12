import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const addressListApi = "/api/v1/customer/address";
const addressSaveApi = "/api/v1/customer/address";

const AddressAdd = () => {
    const navigate = useNavigate();
    const [addressData, setAddressData] = useState([]);
    useEffect(() => {
        axios.get(addressListApi).then((response) => {
            setAddressData(response?.data?.data);
            console.log(addressData);
        });
    }, []);

    const [validated, setValidated] = useState(false);

    const [housename, setHouseName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phone, setPhone] = useState("");
    const [pincode, setPinCode] = useState("");
    const [addressType, setAddressType] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const indiaStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.stopPropagation();
        //     console.log(">>>>>>>")
        //   }
        const addressData = {
            housename: housename,
            city: city,
            state: state,
            phone: phone,
            pincode: pincode,
            address_type: addressType,
            default: isDefault,
        };
        axios
            .post(addressSaveApi, addressData)
            .then((res) => {
                toast(res?.data?.message);
                if (res?.data?.success === true)
                    setTimeout(() => {
                        navigate("/address-list", { replace: true });
                    }, 1000);
            })
            .catch((err) => toast("API Error"));
    };

    return (
        <>
            <Card style={{ width: "45rem" }}>
                <Card.Body>
                    <Form onSubmit={handleSubmit} noValidate validated={validated}>
                        <Form.Group className="mb-3" controlId="controlHouse">
                            <Row>
                                <Col>
                                    <Form.Label>House Name/No.</Form.Label>
                                    <Form.Control
                                        placeholder="Enter House Name/No."
                                        onChange={(e) =>
                                            setHouseName(e.target.value)
                                        }
                                        value={housename}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        placeholder="Enter City"
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        value={city}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Row>
                                <Col>
                                    <Form.Label>State</Form.Label>
                                    <Form.Select
                                        onChange={(e) =>
                                            setState(e.target.value)
                                        }
                                        value={state}
                                        aria-label="Default select example"
                                        required
                                    >
                                        <option selected>
                                            Select the Address type
                                        </option>
                                        {indiaStates.map((stateName) => (
                                            <option value={stateName}>
                                                {stateName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control
                                        placeholder="Enter Pin Code"
                                        onChange={(e) =>
                                            setPinCode(e.target.value)
                                        }
                                        value={pincode}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Row>
                                <Col>
                                    <Form.Label>Phone no.</Form.Label>
                                    <Form.Control
                                        placeholder="Phone no."
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        value={phone}
                                        required
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Address type</Form.Label>
                                    <Form.Select
                                        onChange={(e) =>
                                            setAddressType(e.target.value)
                                        }
                                        value={addressType}
                                        aria-label="Default select address type"
                                        required
                                    >
                                        <option selected>
                                            Select the Address type
                                        </option>
                                        <option value="Home">Home</option>
                                        <option value="Office">Office</option>
                                        <option value="Others">Others</option>
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
                                label="Make this address default"
                                onChange={(e) => setIsDefault(e.target.value)}
                                value={isDefault}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddressAdd;
