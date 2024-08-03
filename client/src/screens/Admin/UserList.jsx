import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Table, Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import BackButton from "../../components/BackButton";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => { // getting all users
    try {
      const response = await axios.get("http://localhost:4000/new-users");
      const { data } = response;
      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = (e, userId, email) => {
    // setSelectedRoles({});
    const { value } = e.target;
    setSelectedEmail(email);
    setSelectedRole(value);
    setSelectedUser(userId);

    
  };

 



  const saveRoles = async () => {
    try {
      const data = {
        role: selectedRole,
        userId: selectedUser,
        userEmail: selectedEmail
      };
      console.log(data)
  
      await axios.post("http://localhost:4000/approve-user", data);
      // Reset the selectedRoles state
      // setSelectedRoles({});
      // Fetch users again to get updated data
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    console.log("delete called" + userId)
    try {
      console.log("starting")
      await axios.delete(`http://localhost:4000/delete-user/${userId}`);

      console.log('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const goUserView = async (userId) => {
    console.log("call")
    console.log("userId : " + userId)
    navigate(`/user-view/${userId}`);
  }
  
  

  return (
    

    <Container className="vh-100" style={{ backgroundColor: 'lightblue' }}>
      <BackButton />
      <Row>
        <Col xs={12} md={12}>
        <div>
      <h1>Users</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Set Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'Admin' ? (
                  <Button variant="success" size="sm">{user.role}</Button>
                ) : user.role === 'admin' ? (
                  <Button variant="info" size="sm">{user.role}</Button>
                ) : user.role === 'buyer' ? (
                  <Button variant="danger" size="sm">{user.role}</Button>
                ) : user.role === 'seller' ? (
                  <Button variant="primary" size="sm">{user.role}</Button>
                ) : (
                  <Button variant="warning" size="sm">Not defined</Button>
                )}
              </td>
              
              <td>
  <select
    value={selectedUser === user._id ? selectedRole : ""}
    // value={selectedRoles}
    onChange={(e) => handleRoleChange(e, user._id, user.email)}
  >
    <option value="">Select Role</option>
   
        <option value="admin">Admin</option>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
  </select>
</td>


                <td><Button variant="danger" size="sm" onClick={() => deleteUser(user._id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="position-fixed top-0 end-50 m-3 p-2">
          <Row>
            <Col><Button size="sm" onClick={() => saveRoles()}>Save Roles</Button></Col>
          </Row>
                
                
      </div>
      
    </div>
        </Col>
      </Row>

    </Container>
  );
};

export default UserList;
