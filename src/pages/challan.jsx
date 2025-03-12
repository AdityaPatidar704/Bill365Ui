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
  const debounceCall=debounce((value=>{
    console.log(value);
    setCustomerId(value);
  }),500)
  function customerIdGet(e){
        debounceCall(e.target.value);    
}
function handleChallanCheck(){
    alert(JSON.stringify(customerId));
}
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="mt-2 header-topper gopal">
        <h1 className="gopa">Challan</h1>
        <input
          type="text"
          placeholder="Search Challan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div>
        <button
          type="button"
          onClick={handleModalClick}
          className="btn btn-primary"
        >
          Get Challan
        </button>
        <div className="modal" style={{display:isClicked?"inline-block":"none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Enter your Customer id:-</h2>
                        </div>
                        <div className="modal-body">
                            <input type="text" onChange={customerIdGet} className="form-control" placeholder="Enter customer id" />
                        </div>
                        <div className="modal-footer">
                            <ButtonComponent className="btn btn-primary" label="Search Challan's" value="challan" onClick={handleChallanCheck}></ButtonComponent>
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
      </table>
    </div>
  );
}
