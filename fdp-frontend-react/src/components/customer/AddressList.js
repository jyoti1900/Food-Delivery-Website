import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddressList = () => {
    const addressListApi = "/api/v1/customer/address";
    const cartListApi = "/api/v1/customer/cart";
    const previewOrderAPI = "/api/v1/customer/order-preview";
    const placeOrdersApi = "/api/v1/customer/orders";

    const navigate = useNavigate();
    const [addressData, setAddressData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [orderSummary, setOrderSummary] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        // get all addresses
        axios.get(addressListApi).then((response) => {
            const addData = response?.data?.data
            setAddressData(addData);
            setSelectedAddress(addData[0]);
        });

        // get cart items
        axios.get(cartListApi).then((response) => {
            setCartData(response?.data?.data);
            axios
                .post(previewOrderAPI, { items: response?.data?.data })
                .then((res) => {
                    setOrderSummary(res?.data?.data);
                });
        });
    }, []);

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };

    const placeOrder = () => {
        axios.post(placeOrdersApi, { 
            items: cartData,
            address_id: selectedAddress._id
        }).then((res)=> {
            toast(res?.data?.message);
            setTimeout(()=> {
                navigate("/");
            }, 1000)
            
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={6}>
                        <h2>Delivery Address</h2> <br />
                        {!addressData.length ? <p>No address found!</p> : ""}
                        {addressData.map((address) => (
                            <>
                                <Card key={address._id} className={`d-flex m-2 ${selectedAddress?._id === address._id ? 'shadow' : ''}`}>
                                    <Card.Header
                                        as="h5"
                                        style={{
                                            background: "skyblue",
                                            color: "white",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleAddressSelection(address)}
                                    >
                                        <input
                                            type="radio"
                                            name="selectedAddress"
                                            checked={selectedAddress === address}
                                            onChange={() => handleAddressSelection(address)}
                                        /> &nbsp;
                                        {address.address_type || "Others"}
                                    </Card.Header>
                                    <Card.Body>
                                        <p>{address.housename}</p>
                                        <p>{address.city}</p>
                                        <p>
                                            {address.state}, {address.pincode}
                                        </p>
                                        <p>{address.phone}</p>
                                        
                                        {/* <Button variant="danger">
                                            Deliver here
                                        </Button> */}
                                    </Card.Body>
                                </Card>{" "}
                                <br />
                            </>
                        ))}
                        <br />
                        <Button
                            variant="primary"
                            onClick={() => navigate("/address-add")}
                        >
                            <i class="bi bi-building-add" />
                            {/* &nbsp is for space */}
                            &nbsp; Add new address
                        </Button>{" "}
                        <br />
                        <br />
                    </Col>

                    <Col sm={6}>
                        <h3>Order Summary</h3>
                        <br />
                        <Card className="mb-4">
                            <Card.Body>
                                <p><strong>Price Details</strong></p>
                                <hr></hr>
                                <Table>
                                    <tbody>
                                        <tr className="border-white">
                                            <td>
                                                Price (
                                                {orderSummary.total_items}{" "}
                                                items)
                                            </td>
                                            <td className="text-end">
                                                &#8377;{" " +orderSummary.total_excl_tax}
                                            </td>
                                        </tr>
                                        <tr className="border-white">
                                            <td>GST</td>
                                            <td className="text-end">
                                                &#8377;{" " + orderSummary.gst}
                                            </td>
                                        </tr>
                                        <tr className="border-white">
                                            <td>Delivery Fees</td>
                                            <td className="text-end">
                                                &#8377; {orderSummary.delivery_fees}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Delivery Fees Discount</td>
                                            <td className="text-end">
                                                - &#8377; {orderSummary.delivery_fees_discount}
                                            </td>
                                        </tr>
                                        <tr className="border-white">
                                            <td><strong>Net Payable</strong></td>
                                            <td className="text-end">
                                                &#8377; {orderSummary.net_payable}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        
                        <Button
                            variant="primary"
                            onClick={placeOrder}
                            disabled={!addressData.length}
                        >
                            Place Order
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </>
    );
};

export default AddressList;
