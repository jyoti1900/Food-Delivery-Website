import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const categoryDropdownAPI = "/api/v1/admin/catgory-dropdown";
const itemAddAPI = "/api/v1/admin/add-items";
const itemEditAPI = "/api/v1/admin/update-item";


const ItemAdd = () => {
    const { iId, cId, iName, iImg, iPrice } = useParams();
    const [catData, setCatData] = useState([]);

    const [catId, setCatId] = useState(cId || null);
    const [itemName, setItemName] = useState(iName || "");
    const [price, setPrice] = useState(iPrice || null);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("catId", catId);
        formData.append("itemName", itemName);
        formData.append("price", price);
        formData.append("file", file);

        console.log(formData.get("file"));
        if(!iId){
        axios
            .post(itemAddAPI, formData)
            .then((res) => {
                toast(res?.data?.message);
                if (res?.data?.success === true)
                    setTimeout(() => {
                        navigate("/item-list", { replace: true });
                    }, 2000);
            })
            .catch((err) => toast("API Error"));
        }
        else{
            axios
            .put(itemEditAPI + '/'+ iId, formData)
            .then((res) => {
                toast(res?.data?.message);
                if (res?.data?.success === true)
                    setTimeout(() => {
                        navigate("/item-list", { replace: true });
                    }, 2000);
            })
            .catch((err) => toast("API Error"));
        }
    };

    useEffect(() => {
        axios.get(categoryDropdownAPI).then((response) => {
            setCatData(response?.data?.data);
        });
    }, []);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={1} />
                    <Col
                        sm={6}
                        className="d-flex flex-column justify-content-center"
                    >
                        <Card className="shadow bg-body-tertiary rounded p-3 mb-5">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Select 
                                            aria-label="Select Category"
                                            onChange={(e) =>
                                                setCatId(e.target.value)
                                            }
                                            value={catId}
                                        >
                                            <option>Open this item menu</option>
                                            {catData.map((item) => (
                                                <option value={item._id}>
                                                    {item.cat_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control
                                            id="itemnameinput"
                                            type="text"
                                            placeholder="Enter Item Name"
                                            // ref={userRef}
                                            onChange={(e) =>
                                                setItemName(e.target.value)
                                            }
                                            value={itemName}
                                            autoComplete="off"
                                            controlId="formBasicEmail"
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            id="itemPriceinput"
                                            type="number"
                                            placeholder="Enter Item Price"
                                            // ref={userRef}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            value={price}
                                            autoComplete="off"
                                            controlId="formBasicEmail"
                                        />
                                    </Form.Group>
                                    {iId ? (
                                        <Image
                                            src={
                                                process.env
                                                    .REACT_APP_FILE_BASE_URL +
                                                iImg
                                            }
                                            width={200}
                                            height={200}
                                            rounded
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <Form.Label>{iId? 'Change Image' : 'Item Image'}</Form.Label>
                                        <Form.Control
                                            id="formFile"
                                            type="file"
                                            // ref={userRef}
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                            autoComplete="off"
                                            controlId="formBasicEmail"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit ">
                                        Save
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
};

export default ItemAdd;
