
import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import InvoiceForm from "./InvoiceForm";
import axios from "axios";
import "../styles/Invoices.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/ButtonComponent/btn";

const Invoices = () => {
  const [invoicesData, setInvoicesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/invoices/submit");
      setInvoicesData(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/invoices/${id}`);
      setInvoicesData(invoicesData.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleInvoiceAdded = (newInvoice) => {
    setInvoicesData([...invoicesData, newInvoice]);
    setShowForm(false); // Hide form after adding invoice
  };

  return (
    <div className="gop gopal">
      <Sidebar />
      <div className="mt-2 header-topper gopal">
        <h1 className="gopa">Invoices</h1>
        <input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {/* <button className="add-customer-button">
          <NavLink to="/add-invoice" className="text-white text-decoration-none">Invoices</NavLink>
        </button> */}
        <NavLink to="/add-invoice" className="text-white text-decoration-none">
        <ButtonComponent className="add-customer-button" label="Invoices" value="invoices"></ButtonComponent>
        </NavLink>
      </div>
      <table className="customer-table gopal">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoicesData
            .filter((invoice) => invoice.id.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>
                <button onClick={() => navigate("/add-invoice")}>Add Invoice</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
