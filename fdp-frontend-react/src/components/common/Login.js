import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const LOGIN_URL = '/api/v1/common/login';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );
            
            if (response?.data?.errCode === 2) {
                throw response?.data;
            }
            const accessToken = response?.data?.token;
            localStorage.setItem('user_details', JSON.stringify(response?.data?.data));
            localStorage.setItem('token', accessToken);
            // set token in axios //
            axios.interceptors.request.use((config) => {
                config.headers.Authorization = 'Bearer ' + accessToken;
                return config;
            });

            const userType=response?.data?.data?.user_type;
            setAuth({ 
                user_type: userType, 
                user_details: response?.data?.data,
                token: response?.data?.token 
            });
            setUser('');
            setPwd('');

            if(userType==="admin")
                navigate('/dashboard', { replace: true });
            else
                navigate('/', { replace: true });

        } catch (err) {
            if (err?.errCode) {
                toast(err?.message);
            } else if (!err?.response) {
                toast("No Server Response!");
            } else if (err?.response?.status === 400) {
                toast("Missing Username or Password!");
            } else if (err?.response?.status === 401) {
                toast("Unauthorized!");
            } else {
                toast("Login Failed!");
            }
            errRef?.current?.focus();
        }
    }

    return (
        <>
        
        <Container
        fluid
        className="justify-content-center"
            style={{
                backgroundImage:
                    "url('https://wallpaperswide.com/download/good_food-wallpaper-3840x2400.jpg')", // Set background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                backgroundRepeat: "no-repeat",
                
            }}
        >
            <Row className="vh-100">
                <Col sm={4}/>

                <Col sm={4} className="d-flex flex-column justify-content-center">
                    <Card className='shadow bg-body-tertiary rounded p-3 mb-5'
                    style={{
                        maxWidth: "400px", // Adjust the maximum width of the card
                        marginTop: "50px", 
                        marginLeft: "90px",
                        marginRight: "80px"// Center the card horizontally
                    }}
                    >
                        <Card.Body>
                            <h2>Sign in</h2><br/>
                            

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        id="username"
                                        type="email" 
                                        placeholder="Enter email"
                                        ref={userRef}
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        autoComplete="off"
                                        controlId="formBasicEmail" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        id="password"
                                        type="password" 
                                        placeholder="Password"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        controlId="formBasicPassword"  />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formForgotPassword">
                                    <a href="#" className=" text-decoration-none" controlId="formForgotPassword">
                                        Forgot password?
                                    </a>
                                </Form.Group>
                                <Button variant="primary" type="submit " className='w-100 rounded-pill'>
                                    Submit
                                </Button>
                            </Form><br/>
                            <div className='d-flex justify-content-center'>
                            <a href="registration" className=" text-decoration-none" controlId="formForgotPassword" >
                                        New User? Register Here
                                    </a>
                                    </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={4}/>
            </Row>
        </Container>

        <ToastContainer />
        {/* <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section> */}
        </>
    )
}

export default Login
