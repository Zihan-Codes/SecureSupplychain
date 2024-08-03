import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Col, Row, Button, Container, Alert, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/userActions";

import "./Signup.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const { email, password } = inputValue;
  const [loginError, setLoginError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");

  const handleOnChange = (e) => {
    setLoginError("");
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, userType, userData } = data;
      if (success) {
        const userId = userData._id;
        const username = userData.name;
        dispatch(setUser(userId, username));
        if (userType === "Admin") {
          navigate("/home");
        } else {
          navigate("/user-home");
        }
      } else {
        setLoginError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotPasswordError("");
    setForgotPasswordSuccess("");
    try {
      const { data } = await axios.post(
        "http://localhost:4000/forgot-password",
        { email: forgotPasswordEmail },
        { withCredentials: true }
      );
      if (data.success) {
        setForgotPasswordSuccess(data.message);
      } else {
        setForgotPasswordError(data.message);
      }
    } catch (error) {
      console.log(error);
      setForgotPasswordError("An error occurred. Please try again.");
    }
  };

  const handleCloseForgotPassword = () => setShowForgotPassword(false);
  const handleShowForgotPassword = () => setShowForgotPassword(true);

  return (
    <Container className="vh-100" style={{ backgroundColor: "lightblue" }}>
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} md={4}>
          <Card>
            <Card.Body className="login-card-body">
              <h1 className="text-center">Welcome</h1>
              <Card.Title className="text-center">Sign into your account</Card.Title>
              <Form onSubmit={handleSubmit}>
                {loginError && <Alert variant="danger">{loginError}</Alert>}
                <Form.Group className="mt-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Form.Group className="text-center mt-3">
                  <Button variant="primary" type="submit" className="login-button w-50">
                    Login
                  </Button>
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-between mt-3">
                <Form.Check type="checkbox" label="Remember me" />
                <Card.Link href="#" onClick={handleShowForgotPassword}>
                  Forgot password?
                </Card.Link>
              </div>
              <hr />
              <Form.Group className="text-center">
                <Button variant="success" onClick={() => navigate("/signup")}>
                  Create new Account
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showForgotPassword} onHide={handleCloseForgotPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotPasswordSubmit}>
            {forgotPasswordError && <Alert variant="danger">{forgotPasswordError}</Alert>}
            {forgotPasswordSuccess && <Alert variant="success">{forgotPasswordSuccess}</Alert>}
            <Form.Group className="mt-3" controlId="forgotPasswordEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="text-center mt-3">
              <Button variant="primary" type="submit" className="w-50">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Login;
