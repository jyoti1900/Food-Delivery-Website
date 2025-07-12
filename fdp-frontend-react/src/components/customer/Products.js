import {
    Button,
    Container,
    Dropdown,
    Row,
    Col,
    Card,
    Carousel,
} from "react-bootstrap";
import axios from "../../api/axios";
import { useState, useEffect, createFactory } from "react";

import itemPlaceholder from "../../img/item_placeholder.jpg";
import { ToastContainer, toast } from "react-toastify";


import carosal7 from "../../img/carosal7.jpg";
import carosal5 from "../../img/carosal5.jpg";
import carosal6 from "../../img/carosal6.jpg";


const Product = () => {
    const itemListApi = "/api/v1/customer/items";
    const addTocartApi = "/api/v1/customer/cart";
    const categoryDropdownApi = "/api/v1/customer/catgory-dropdown";

    const [itemData, setItemData] = useState([]);
    const [catData, setCatData] = useState([]);
    useEffect(() => {
        axios.get(itemListApi).then((response) => {
            setItemData(response?.data?.data);
            console.log(itemData);
        });
    }, []);

    const addToCart = (item) => {
        axios.post(addTocartApi, { itemId: item._id }).then((res) => {
            toast(res?.data?.message);
        });
    };
    const handleImageError = (event) => {
        // Handle the image error, e.g., by replacing it with a default image
        event.target.src = '../img/item_placeholder.jpg';
      };
      
      useEffect(() => {
        axios.get(categoryDropdownApi).then((response) => {
            setCatData(response?.data?.data);
            // console.log("///////", response?.data?.data);
        });
    }, []);
    return (
        <>
            <Carousel >
                <Carousel.Item>
                    <img src={carosal6} className="w-100 "/>
                    <Carousel.Caption>
                        <h3></h3>
                        <p>
                            
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carosal7} className="w-100" />
                    <Carousel.Caption>
                        <h3></h3>
                        <p>
                            
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={carosal5} className="w-100" />
                    <Carousel.Caption>
                        <h3></h3>
                        <p>
                            
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <br />

            {itemData.map((category) => (
                <>
                    <h2>{category.category_name}</h2>
                    <div id={category.category_id} className="d-flex justify-content-around">
                        <Container>
                            <Row>
                                {category.items.map((item) => (
                                    <>
                                        <Col sm={4}>
                                            <Card
                                                style={{
                                                    width: "18rem",
                                                    height: "21rem",
                                                }}
                                                className="d-flex m-2"
                                            >
                                                <Card.Img
                                                    variant="top"
                                                    src={item.img_url || itemPlaceholder}
                                                />
                                                <Card.Body>
                                                    <Card.Title>
                                                        {item.item_name}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {item.price}
                                                    </Card.Text>
                                                    <Button
                                                        onClick={() =>
                                                            addToCart(item)
                                                        }
                                                        variant="primary"
                                                    >
                                                        Add to cart
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </>
            ))}
            <br />

            <Dropdown
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "200px",
                    zIndex: "1000",
                    // Ensure the dropdown is above other elements
                }}
            >
                <Dropdown.Toggle variant="danger" id="dropdown-basic" size="lg">
                    Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item> */}
                    {catData.map((category) => 
                    <Dropdown.Item href={"#"+category._id}>{category.cat_name}</Dropdown.Item>
                )}
                </Dropdown.Menu>
            </Dropdown>

            <br />
            <p></p>
            <ToastContainer />
        </>
    );
};

export default Product;
