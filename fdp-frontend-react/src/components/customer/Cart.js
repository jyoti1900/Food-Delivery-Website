import { Button, ButtonGroup, Table } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
    const cartListApi = "/api/v1/customer/cart";
    const cartDeleteApi = "/api/v1/customer/cart/";
    const cartIncrementApi = "/api/v1/customer/cart-inc/";
    const cartDecrementApi = "/api/v1/customer/cart-dec/";

    const increaseQuantity = (item) => {
        axios
            .put(cartIncrementApi + item._id)
            .then((res) => {
                // toast(res?.data?.message);
                if (res?.data?.success === true) {
                    axios.get(cartListApi).then((response) => {
                        setCartData(response?.data?.data);
                        console.log(cartData);
                    });
                }
            })
            .catch((err) => toast("API Error"));
    };

    const decreaseQuantity = (item) => {
        axios
            .put(cartDecrementApi + item._id)
            .then((res) => {
                // toast(res?.data?.message);
                if (res?.data?.success === true) {
                    axios.get(cartListApi).then((response) => {
                        setCartData(response?.data?.data);
                        console.log(cartData);
                    });
                }
            })
            .catch((err) => toast("API Error"));
    };

    const navigate = useNavigate();

    const [cartData, setCartData] = useState([]);

    const handleDelete = (item) => {
        axios
            .delete(cartDeleteApi + item._id)
            .then((res) => {
                toast(res?.data?.message);
                axios.get(cartListApi).then((response) => {
                    setCartData(response?.data?.data);
                });
            })
            .catch((err) => toast("API Error"));
    };

    useEffect(() => {
        axios.get(cartListApi).then((response) => {
            setCartData(response?.data?.data);
        });
    }, []);

    // useEffect(() => {
    //     console.log(cartData);
    // }, [cartData]);
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {!cartData.length ? 
                    <>
                    <tr><td colSpan={5}>No items in cart!</td></tr>
                    </>: ''}
                    {cartData.map((item) => (
                        <tr>
                            <td>{item.item_name}</td>
                            <td>{item.price}</td>
                            <td>
                                <div>
                                    <ButtonGroup>
                                        <Button
                                            variant="light"
                                            onClick={() =>
                                                decreaseQuantity(item)
                                            }
                                            disabled={item.quantity == 1}
                                        >
                                            -
                                        </Button>
                                        <Button variant="light" disabled>
                                            {item.quantity}
                                        </Button>
                                        <Button
                                            variant="light"
                                            onClick={() =>
                                                increaseQuantity(item)
                                            }
                                        >
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </td>
                            <td>{item.total}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(item)}
                                >
                                    <i class="bi bi-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="danger" onClick={() => navigate("/address-list")} disabled={!cartData.length}>
                Select Address
            </Button>

            <ToastContainer />
        </>
    );
};

export default Cart;
