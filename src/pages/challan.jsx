import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from "../layouts/Sidebar"; // Make sure Sidebar is correctly imported
import InvoiceForm from "./InvoiceForm";
import "../styles/Invoices.css";

import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ButtonComponent } from "../components/ButtonComponent/btn";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { debounce } from "lodash";
export function Challan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [customerId,setCustomerId]=useState("");
  function handleModalClick(){
    setIsClicked(true);
  }
  function closeBtn(){
    setIsClicked(false);
  }
  const debounceCall=debounce((value=>{
    console.log(value);
    setCustomerId(value);
  }),500)
  function customerIdGet(e){
        debounceCall(e.target.value);    
}
const [challan, setChallan] = useState([]);
const [search, setSearch] = useState(""); // Search state
const navigate=useNavigate();
function handleChallanCheck(){
    const fetchChallan=async ()=>{
        try{
            const token=localStorage.getItem("token");
            const res=await axios.get(`http://localhost:5003/api/challandetails/provideing/${customerId}`,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(JSON.stringify(res.data));
            setChallan(res.data);   
            console.log(res.data[0].challan_date);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    fetchChallan();
    setIsClicked(false);
}
const fetchChallanDetail=challan.filter((challan)=>
`${challan.challan_id}`
      .toLowerCase()
      .includes(search.toLowerCase())
)
const handleEdit = (customer) => {
    alert(JSON.stringify(customer));
    // navigate(`/edit/${customer.id}`, { state: { customer } });
  };
  const deleteCustomer = async (id) => {
    console.log(id)
    alert(id);
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const response = await fetch(`http://localhost:5003/api/customers/${id}`, { method: "DELETE" });

      if (response.ok) {
        alert("Customer deleted successfully");
        handleChallanCheck();
      } else {
        alert("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="mt-2 header-topper gopal" >
        <h1 className="gopa">Challan</h1>
        <input
          type="text"
          placeholder="Search Challan by Id.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button
          type="button"
          onClick={handleModalClick}
          className="btn btn-primary"
        >
          Get Challan
        </button>
        <NavLink to="/add-challan">
        <ButtonComponent className="btn btn-primary" label="Add Challan" value="challanAdd"></ButtonComponent>
        </NavLink>
      </div>
      <div>
        <div className="modal" style={{display:isClicked?"inline-block":"none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Enter your Customer number:-</h2>
                            <button className="btn btn-close" onClick={closeBtn}></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" onChange={customerIdGet} className="form-control" placeholder="Enter customer id" />
                        </div>
                        <div className="modal-footer">
                            <ButtonComponent type="button" className="btn btn-primary" label="Search Challan's" value="challan" onClick={handleChallanCheck}></ButtonComponent>
                        </div>
                    </div>
                </div>
        </div>
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
            {fetchChallanDetail.length>0?(
                    fetchChallanDetail.map((challan) => {
                        console.log(challan); // Debugging step
                        return (
                          <tr key={challan.challan_id}>
                            <td>{challan.challan_id}</td>
                            <td>{challan.challan_date}</td>
                            <td>{challan.total_amount}</td>
                            <td></td>
                            <td>
                              <button id="btn" onClick={() => handleEdit(challan)}>Edit</button>
                              <button id="buton" onClick={() => deleteCustomer(challan.challan_id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })
            ):
            <tr>
      <td colSpan="6" style={{ textAlign: "center"}}>
        Please insert cutomer mobile no from get challan button
      </td>
    </tr>
            }
        </tbody>
        
      </table>
    </div>
  );
}
