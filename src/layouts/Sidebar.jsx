import React from "react";
import { NavLink } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
const Sidebar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <button
            className="btn navbar-toggler"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="text-white offcanvas offcanvas-start"
            style={{ backgroundColor: "rgba(67,120,212,255)", width: "20vw" }}
            id="navbar"
          >
            <div className="offcanvas-header">
              <h5 className="fw-bolder ms-3" id="offcanvasLabel">
                Bill 365
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <ul className="m-3 text-white navbar-nav nav fs-6">
              <li className="nav-item">
                <NavLink
                  to="/Dashboard"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-house-door"></span>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/reports"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-bar-chart"></span>
                  Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/display"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-person"></span>
                  Customer Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-person"></span>
                  Product Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/invoices"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-file-text"></span>
                  Generate Bill
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/challan"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-file-text"></span>
                  Challan
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/payments"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-cash-stack"></span>
                  Payments
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/setting"
                  className={({ isActive }) => {
                    return isActive
                      ? "p-2 pb-3 d-inline-block text-decoration-none bg-white text-blue-500 rounded-lg"
                      : "p-2 pb-3 d-inline-block text-decoration-none text-white hover:text-sky-500 transition-colors duration-200";
                  }}
                  style={{ width: "100%" }} // Ensures the width remains the same
                >
                  <span className="p-2 bi bi-file-person-fill"></span>
                  Profile
                </NavLink>
              </li>
            </ul>
            <button className="px-8 py-1 mx-8 my-64 text-white transition-transform transform bg-white rounded-2 m-3 hover:bg-sky-100 hover:scale-105">
              <NavLink className="text-black text-decoration-none" to="/">
                Logout
              </NavLink>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
