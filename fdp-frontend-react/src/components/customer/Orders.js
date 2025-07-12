import { Button, Table, Modal } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";

function Order() {
    const orderListAPI = "/api/v1/customer/order-list";

    const [orderData, setOrderData] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [orderItemData, setOrderItemData] = useState([]);
    const handleShow = (orderItems) => {
        setOrderItemData(orderItems);
        setModalShow(true);
    };
    const handleClose = () => setModalShow(false);

    useEffect(() => {
        axios.get(orderListAPI).then((response) => {
            setOrderData(response?.data?.data);
        });
    }, []);

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Price</th>
                        <th>Delivery Fees</th>
                        <th>Items</th>
                        <th>Ordered At</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {!orderData.length ? 
                    <>
                    <tr><td colSpan={6}>No orders found!</td></tr>
                    </>: ''}
                    {orderData.map((order) => (
                        <tr>
                            <td>{order._id}</td>
                            <td>{order.total_incl_tax}</td>
                            <td>{order.delivery_fees}</td>
                            <td>
                                <Button
                                    variant="link"
                                    onClick={() => handleShow(order.items)}
                                >
                                    {order.items?.length}
                                </Button>
                            </td>
                            <td>{order.createdAt}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Order items
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItemData.map((item) => (
                                <tr>
                                    <td>{item.item_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Order;
