import {
    Table,
    Image,
    ButtonGroup,
    Button,
    Form,
    Modal,
} from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const itemListApi = "/api/v1/admin/list-items";
const itemDeleteAPI = "/api/v1/admin/delete-item/";
const categoryDropdownAPI = "/api/v1/admin/catgory-dropdown";

const ItemList = () => {
    const [deleteItem, setDeleteItem] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleDelete = () => {
        axios
            .delete(itemDeleteAPI + deleteItem?._id)
            .then((res) => {
                toast(res?.data?.message);
                setShow(false);
                axios
                    .get(itemListApi, { params: { catId: catId } })
                    .then((response) => {
                        setItemData(response?.data?.data);
                    });
            })
            .catch((err) => toast("API Error"));
    };

    const handleShow = (item) => {
        setShow(true);
        setDeleteItem(item);
    };

    const [catData, setCatData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [catId, setCatId] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(itemListApi, { params: { catId: catId } })
            .then((response) => {
                setItemData(response?.data?.data);
            });
    }, []);

    useEffect(() => {
        axios.get(categoryDropdownAPI).then((response) => {
            setCatData(response?.data?.data);
        });
    }, []);

    const onChangeCategory = async (catId) => {
        axios
            .get(itemListApi, { params: { catId: catId } })
            .then((response) => {
                setItemData(response?.data?.data);
            });
    };

    return (
        <>
            <Form.Label>Category Name</Form.Label>
            <Form.Select
                aria-label="Select Category"
                size="sm"
                onChange={(e) => onChangeCategory(e.target.value)}
                value={catId}
            >
                <option>Open this item menu</option>
                {catData.map((item) => 
                    <option value={item._id}>{item.cat_name}</option>
                )}
            </Form.Select>

            <br />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{" "}
                    <b>{deleteItem?.item_name}</b>?
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
                        <th>Item Name</th>
                        <th>Category Name</th>
                        <th>Item Image</th>
                        <th>Item Price</th>
                        <th>Deleted</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!itemData?.length ? (
                        <tr style={{ textAlign: "center" }}>
                            <td colSpan={5}>No data found</td>
                        </tr>
                    ) : (
                        <></>
                    )}
                    {itemData.map((item) => (
                        <tr className={item.deleted ? "deleted-row-bg" : ""}>
                            <td>{item.item_name}</td>
                            <td>{item.cat_name}</td>
                            <td>
                                {item.img_url ? (
                                    <Image
                                        src={
                                            item.img_url
                                        }
                                        width={100}
                                        height={100}
                                    />
                                ) : null}
                            </td>
                            <td>{item.price}</td>
                            <td>{item.deleted ? "Yes" : "No"}</td>
                            <td>
                                <ButtonGroup className="mb-2">
                                    <Button
                                        variant="outline-primary"
                                        disabled={item.deleted}
                                        onClick={() => {
                                            navigate(
                                                "/item-edit/" +
                                                    item._id +
                                                    "/" +
                                                    item.category_id +
                                                    "/" +
                                                    item.item_name +
                                                    "/" +
                                                    item.price
                                            );
                                        }}
                                    >
                                        <i class="bi bi-pencil-square" />
                                    </Button>
                                    <Button
                                        onClick={() => handleShow(item)}
                                        disabled={item.deleted}
                                        variant="outline-danger"
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

export default ItemList;
