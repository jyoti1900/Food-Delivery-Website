import { Table, Image, ButtonGroup, Button, Modal } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const categoryFetchAPI = "/api/v1/admin/list-category";
const categoryDeleteAPI = "/api/v1/admin/delete-category/";

const CategoryList = () => {
    const [catData, setCatData] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (item) => {
        setShow(true);
        setDeleteCategory(item);
    };

    const handleDelete = () => {
        axios
            .delete(categoryDeleteAPI + deleteCategory?._id)
            .then((res) => {
                toast(res?.data?.message);
                setShow(false);
                axios.get(categoryFetchAPI).then((response) => {
                    setCatData(response?.data?.data);
                });
            })
            .catch((err) => toast("API Error"));
    };

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(categoryFetchAPI).then((response) => {
            setCatData(response?.data?.data);
        });
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{" "}
                    <b>{deleteCategory?.cat_name}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Category Image</th>
                        <th>Deleted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {catData.map((item) => (
                        <tr>
                            <td>{item.cat_name}</td>
                            <td>
                                {item.img_url ? (
                                    <Image
                                        src={item.img_url}
                                        width={100}
                                        height={100}
                                    />
                                ) : null}
                            </td>
                            <td>{item.deleted ? "Yes" : "No"}</td>
                            <td>
                                <ButtonGroup className="mb-2">
                                    <Button
                                        variant="outline-primary"
                                        disabled={item.deleted}
                                        onClick={() => {
                                            navigate(
                                                "/category-edit/" +
                                                    item._id +
                                                    "/" +
                                                    item.cat_name +
                                                    "/" 
                                            );
                                        }}
                                    >
                                        <i class="bi bi-pencil-square" />
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => handleShow(item)}
                                        disabled={item.deleted}
                                    >
                                        <i class="bi bi-trash3" />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />
        </>
    );
};

export default CategoryList;
