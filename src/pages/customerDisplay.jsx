import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/customerDisplay.css"; // Import the CSS file
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import axios from "axios";


function CustomerDisplay({ customerListUpdated }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState(""); // Search state
  const navigate = useNavigate();
  const printRef = useRef(); // Reference for printing
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/customers");
      const data = await response.json();
      console.log("Fetched Customers:", data); // Debugging
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.error("Expected array but got:", typeof data, data);
        setCustomers([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]); // Handle error by setting an empty array
    }
  };
  useEffect(() => {
    const fetchCustomers = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const res = await axios.get("http://localhost:5003/api/customers", {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setCustomers(res.data); 
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    fetchCustomers();
}, []);


  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    `${customer.customer_id} ${customer.first_name} ${customer.last_name} ${customer.email} ${customer.company_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const deleteCustomer = async (id) => {
    console.log(id)
    alert(id);
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:5003/api/customers/${id}`, { method: "DELETE" });

      if (response.ok) {
        alert("Customer deleted successfully");
        fetchCustomers();
      } else {
        alert("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEdit = (customer) => {
    alert(JSON.stringify(customer));
    // navigate(`/edit/${customer.id}`, { state: { customer } });
  };

  return (
    <div className="gop">
      <Sidebar />
      <div className="header-topper gopal">
        <h1 className="gopa">Customer Management</h1>
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <a href="/home">
        <button className="add-customer-button">Add Customer</button>
        </a>
      </div>

        <table className="customer-table gopal">
        <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Contact</th>  {/* Corrected "contact" to "Contact" */}
    <th>Company</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {filteredCustomers.length > 0 ? (
    filteredCustomers.map((customer) => {
      console.log(customer); // Debugging step
      return (
        <tr key={customer.customer_id}>
          <td>{customer.customer_id}</td>
          <td>{customer.first_name} {customer.last_name}</td>
          <td>{customer.email}</td>
          <td>{customer.phone || "N/A"}</td> {/* Handle missing values */}
          <td>{customer.company_name}</td>
          <td>
            <button id="btn" onClick={() => handleEdit(customer)}>Edit</button>
            <button id="buton" onClick={() => deleteCustomer(customer.customer_id)}>Delete</button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center", display: filteredCustomers.length === 0 ? "table-cell" : "none" }}>
        No customers found
      </td>
    </tr>
  )}
</tbody>


        </table>
      </div>
  );
}

export default CustomerDisplay;  