import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Col, Row, Button, Alert } from "react-bootstrap";
import { Snackbar } from "@mui/material";

const Signup = ({ oldValues }) => {
  const navigate = useNavigate();
  const [oldValue, setOldValue] = useState('');
  const [inputValue, setInputValue] = useState({
    email: oldValue.email || "",
    name: oldValue.name || "",
    nic: oldValue.nic || "",
    phone: oldValue.phone || "",
    address: oldValue.address || "",
    password: oldValue.password || "",
    confirmPassword: oldValue.confirmPassword || "",
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    nic: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const { email, name, nic, phone, address, password, confirmPassword } = inputValue;

  const [passwordError, setPasswordError] = useState('');
  const [ConfirmpasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [nicError, setNicError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleOnChange = (e) => {
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneNumberError("");
    setNicError("");
    setNameError("");
    setEmailError("");

    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  function goLogin() {
    navigate("/login");
  }

  const handleError = (err) => {
    setSignupError(err);
  };

  const handleSuccess = (msg) => {
    alert("success");
  };

  const handleCloseSnackbar = () => {
    setSignupSuccess(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Email format is invalid");
      return;
    }

    if (!validateName(name)) {
      setNameError("Name should contain Characters and Space only");
      return;
    }

    if (!validateNIC(nic)) {
      setNicError("NIC format is invalid");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setPhoneNumberError('Phone Number format is invalid');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should contain at least 8 digits and a mix of numbers, letters, and special characters');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and confirm password do not match");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message, oldData } = data;
      if (success) {
        // handleSuccess(message);
        setSignupSuccess(true);
        setInputValue({
          email: "",
          name: "",
          nic: "",
          phone: "",
          address: "",
          password: "",
          confirmPassword: "",
        });

        // navigate("/login");
      } else {
        handleError(message);
        setOldValue(oldData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(0\d{9}|\+94\d{9})$/;
    return phoneRegex.test(number);
  };

  const validateNIC = (nic) => {
    const oldNICPattern = /^[0-9]{9}[VvXx]$/;
    const newNICPattern = /^[0-9]{12}$/;
    return oldNICPattern.test(nic) || newNICPattern.test(nic);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-Za-z0-9]+(\.[A-Za-z0-9]+)?@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/;
    return emailPattern.test(email);
  };

  return (
    <Container style={{ backgroundColor: '#f9ffea', padding: '20px', minHeight: '100vh' }}>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4}>
          <Card style={{ borderRadius: '15px', border: '1px solid #b8e994' }}>
            <Card.Body>
              <h2 className="text-center" style={{ color: '#2c3e50' }}>Sign Up</h2>
              {signupError && <Alert variant="danger">{signupError}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={email} onChange={handleOnChange} placeholder="name@example.com" required />
                  <p className="text-danger">{emailError}</p>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" value={name} onChange={handleOnChange} placeholder="Full Name" required />
                  <p className="text-danger">{nameError}</p>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>NIC Number</Form.Label>
                  <Form.Control type="text" name="nic" value={nic} onChange={handleOnChange} placeholder="NIC" required />
                  <p className="text-danger">{nicError}</p>
                </Form.Group>
                <Form.Group className="t-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" name="phone" value={phone} onChange={handleOnChange} placeholder="Phone Number" required />
                  <p className="text-danger">{phoneNumberError}</p>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={address} onChange={handleOnChange} placeholder="Address" required />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={password} onChange={handleOnChange} placeholder="Password" required />
                  <p className="text-danger">{passwordError}</p>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={confirmPassword} onChange={handleOnChange} placeholder="Re-enter Password" required />
                  <p className="text-danger">{ConfirmpasswordError}</p>
                </Form.Group>
                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit" style={{ width: '100%', borderRadius: '5px' }}>Sign Up</Button>
                </Form.Group>
              </Form>
              <hr className="mb-4" />
              <p className="text-center" style={{ color: '#34495e' }}>Already have an account?</p>
              <Button variant="outline-success" onClick={goLogin} style={{ width: '100%', borderRadius: '5px' }}>Login</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Snackbar */}
      <Snackbar
          open={signupSuccess}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            <strong>Registration successfull!</strong>
          </Alert>
        </Snackbar>
    </Container>
  );
};

export default Signup;
