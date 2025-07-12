import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Image,
} from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const categoryAddAPI = "/api/v1/admin/add-category";
const categoryEditApi = "/api/v1/admin/update-category";

const CategoryAdd = () => {
    const { cId, cName, cImg } = useParams();

    const [catName, setCatName] = useState(cName || "");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("catName", catName);
        formData.append("file", file);
        if (!cId) {
            axios
                .post(categoryAddAPI, formData)
                .then((res) => {
                    toast(res?.data?.message);
                    if (res?.data?.success === true)
                        setTimeout(() => {
                            navigate("/category-list", { replace: true });
                        }, 2000);
                })
                .catch((err) => toast("API Error"));
        } else {
            axios
                .put(categoryEditApi + "/" + cId, formData)
                .then((res) => {
                    toast(res?.data?.message);
                    if (res?.data?.success === true)
                        setTimeout(() => {
                            navigate("/category-list", { replace: true });
                        }, 2000);
                })
                .catch((err) => toast("API Error"));
        }
    };

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
                                        <Form.Control
                                            id="catNameInput"
                                            type="text"
                                            placeholder="Enter Category Name"
                                            // ref={userRef}
                                            onChange={(e) =>
                                                setCatName(e.target.value)
                                            }
                                            value={catName}
                                            autoComplete="off"
                                            controlId="formBasicEmail"
                                        />
                                    </Form.Group>

                                    {cId ? (
                                        <Image
                                            src={
                                                process.env
                                                    .REACT_APP_FILE_BASE_URL +
                                                cImg
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
                                        <Form.Label>{cId? 'Change Image' : 'Category Image'}</Form.Label>
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

export default CategoryAdd;
