import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginRegister from "../pages/loginRegister";
import CustomerForm from "../pages/customerForm";
import CustomerProfile from "../pages/customerProfile";
import CustomerDisplay from "../pages/customerDisplay";
import EditCustomer from "../pages/editCustomer";
import Dashboard from "../pages/Dashboard";
import Invoices from "../pages/Invoices";
import Payments from "../pages/Payments";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProductForm from "../pages/ProductForm";
import Sidebar from "../layouts/Sidebar";
import InvoiceForm from "../pages/InvoiceForm";  // InvoiceForm import karo
import "../styles/index.css"
// Protected Route Component

function PublicRouteComponent() {
    // Load authentication state from localStorage
    // const [isAuthenticated, setIsAuthenticated] = useState(
    //     localStorage.getItem("isAuthenticated") === "true"
    // );

    // Update localStorage when authentication state changes
    // useEffect(() => {
    //     localStorage.setItem("isAuthenticated", isAuthenticated);
    // }, [isAuthenticated]);

    return (
        <Router>
            <Routes>
                {/* Default route: Login Page */}
                <Route path="/" element={<LoginRegister />} />
                {/* 
                Above is public Routes
                */}
                <Route path="/dashboard" element={<Dashboard></Dashboard>}/>
                <Route path="/sidebar" element={<Sidebar></Sidebar>}/>
                <Route path="/home" element={<CustomerForm></CustomerForm>}/>
                <Route path="/add-product" element={<ProductForm></ProductForm>}/>
                <Route path="/display" element={<CustomerDisplay></CustomerDisplay>}/>
                <Route path="/profile/:id" element={<CustomerProfile></CustomerProfile>}/>
                <Route path="/edit/:id" element={<EditCustomer></EditCustomer>}/>
                <Route path="/invoices" element={<Invoices></Invoices>}/>
                <Route path="/add-invoice" element={<InvoiceForm></InvoiceForm>}/>
                <Route path="/payments" element={<Payments></Payments>}/>
                <Route path="/products" element={<Products></Products>}/>
                <Route path="/reports" element={<Reports></Reports>}/>
                <Route path="/settings" element={<Settings></Settings>}/>
               
            </Routes>
        </Router>
    );
}

export default PublicRouteComponent;


