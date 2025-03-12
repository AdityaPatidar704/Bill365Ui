// Frontend: LoginRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { ButtonComponent } from "../components/ButtonComponent/btn";
const LoginRegister = ({ setAuth }) => {
    const [formType, setFormType] = useState("login");
    const [email, setEmail] = useState("");
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:5003/api/login", { email, password });
            localStorage.setItem("token", res.data.token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token; // Set token globally ye bhi
            setAuth(true);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again!");
        }
    };

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     setError(""); // Clear previous errors ye add kiya h
    //     try {
    //         const res = await axios.post("http://localhost:5001/api/signup", { username, email, password });
    //         alert(res.data.message);
    //         navigate("/dashboard");

    //         setFormType("login");
    //     } catch (err) {
    //         setError(err.response?.data?.message || "Registration failed!");
    //     }
    // };
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const res = await axios.post("http://localhost:5003/api/signup", { username, email, password });
            alert(res.data.message);
            
            // ✅ Auto-login after registration
            const loginRes = await axios.post("http://localhost:5003/api/login", { email, password });
            localStorage.setItem("token", loginRes.data.token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + loginRes.data.token;
            setAuth(true);
            
            // ✅ Redirect to Dashboard
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed!");
        }
    };
    

    return (
        <div className="bk-set">
        <div className="container-fluid">
            <h2 className="text-sky-950 text-center m-3"><span className="text-red-500">W</span>elcome to <span className="text-red-500">Bill 365</span></h2>
            <div className="d-flex justify-content-center align-me">
                <div className="align-me1">
            <div className="btn-group">
                <button onClick={() => setFormType("login")} className={formType === "login" ? "active btn btn-primary" : ""}>Login</button>
                <span className="m-2"></span>
                <button onClick={() => setFormType("register")} className={formType === "register" ? "active btn btn-warning" : ""}>Register</button>
            </div>
            {error && <p className="error">{error}</p>}
            {formType === "login" ? (
                <form onSubmit={handleLogin} className="mt-4">
                    <input className="form-control m-2" size="40" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="form-control m-2" size="40" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {/* <button className="btn btn-success w-100 m-2" type="submit">Login</button> */}
                    <ButtonComponent className="btn btn-success w-100 m-2" value="login" label="Login"></ButtonComponent>
                </form>
            ) : (
                <form onSubmit={handleRegister} className="mt-3">
                    <input className="form-control m-2" size="40" type="text" placeholder="Enter your Name" value={username} onChange={(e) => setName(e.target.value)} required />
                    <input className="form-control m-2" size="40"  type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="form-control m-2" size="40" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {/* <button className="btn btn-warning w-100 m-2" type="submit">Register</button> */}
                    <ButtonComponent className="btn btn-warning w-100 m-2" value="register" label="Register"></ButtonComponent>
                </form>
            )}
            </div>
            </div>
        </div>
        </div>
    );
};
export default LoginRegister;
