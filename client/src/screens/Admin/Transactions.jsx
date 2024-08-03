import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Transactions = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

const [email, setEmail] = useState("");
const [product, setProduct] = useState("");
const [amount, setAmount] = useState("");
const [dueDate, setDueDate] = useState("");
const [paymentStatus, setPaymentStatus] = useState("");
const [buyerId, setBuyerId] = useState("");
const [buyerName, setBuyerName] = useState("");
const [userType, setUserType] = useState("");

useEffect(() => {
    fetchUsers();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setInputValue({
    //   ...inputValue,
    //   [name]: value,
    // });
  };

  const fetchUsers = async () => { // getting all users
    try {
      const response = await axios.get("http://localhost:4000/users");
      const { data } = response;
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleError = (err) => {
    alert("fail")
  };
  const handleSuccess = (msg) =>{
    alert("success")
  }


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {

        const inputValue = {
            // email: email,
            product: product,
            amount: amount,
            dueDate: dueDate,
            paymentStatus: paymentStatus,
            buyerId: buyerId,
            type: userType
            // buyerName: buyerName,
          };
        console.log(inputValue)
      const { data } = await axios.post(
        "http://localhost:4000/tn/selling",
        {
          inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        console.log("user details saved")
        
      } else {
        handleError(message);
        console.log("not saved")
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="form_container">
      <h2>Add your Tranactions</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div> */}

<div>
          <label htmlFor="email">buyerId : </label>
          {/* <input
            type="text"
            name="buyerId"
            value={buyerId}
            placeholder="Enter your username"
            onChange={(e) => setBuyerId(e.target.value)}
          /> */}
          <select onChange={(e) => setBuyerId(e.target.value)} >
          <option value="">Select Buyer : </option>
                      {users.map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.username}
                        </option>
                    ))}
          </select>
        </div>

        <div>
        <label htmlFor="email">Business type : </label>
          <select onChange={(e) => setUserType(e.target.value)} >
            <option value="">Buyer or Seller</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="email">Product Name : </label>
          <input
            type="text"
            name="product"
            value={product}
            placeholder="Enter your username"
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">amount : </label>
          <input
            type="number"
            name="amount"
            value={amount}
            placeholder="Enter your username"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">dueDate : </label>
          <input
            type="date"
            name="dueDate"
            value={dueDate}
            placeholder="Enter your username"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">paymentStatus : </label>
          <select onChange={(e) => setPaymentStatus(e.target.value)} >
            <option value="">Select payment method</option>
            <option value="unpaid">Unpaid</option>
            <option value="partially paid">Partially paid</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        

        {/* <div>
          <label htmlFor="email">buyerName</label>
          <input
            type="text"
            name="buyerName"
            value={buyerName}
            placeholder="Enter your username"
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div> */}
        
        <button type="submit">Submit</button>
        
      </form>
    </div>
  );
};

export default Transactions;
