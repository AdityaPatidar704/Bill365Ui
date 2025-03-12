import React, { useState, useEffect } from "react";
// import Sidebar from "../container/Sidebar";
import Sidebar from '../layouts/Sidebar'; // Make sure Sidebar is correctly imported
import "../styles/Products.css"; // Import the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  // Fetch products from backend
  // useEffect(() => {
  //   fetch("http://localhost:5003/api/products", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setProductList(data))
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, []);
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchProduct= async()=>{
      try{
        const res= await axios.get("http://localhost:5003/api/products",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res.data);
      setProductList(res.data);
    }
    catch(err){
          console.log(err);
    }
  }
   fetchProduct();
  },[])

  // Filter products based on search input
  const filteredProducts = productList.filter((product) =>
    ` ${product.product_name} ${product.product_id} ${product.product_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Delete product function
  const deleteProduct = async (id) => {
    alert(id);
    try {
      const response = await fetch(`http://localhost:5003/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        alert("Product deleted successfully");
        setProductList(productList.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleEdit = (product) => {
    alert(JSON.stringify(product))
    // navigate(`/edit/${product.id}`, { state: { product } });
  };
  return (
    <div className="gop">
      <Sidebar />
      <div className="header-topper">
        <h1 className="gopa">Products</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <a href="/add-product">
          <button className="add-customer-button">Add Product</button>
        </a>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product ID</th>
            <th>Product Code</th>
            <th>HSN/SAC Code</th>
            <th>Description</th>
            <th>Type</th>
            <th>Unit Price</th>
            <th>Tax Rate</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>{product.product_id}</td>
                <td>{product.hsn_sac_code}</td>
                <td>{product.product_code}</td>
                <td>{product.product_description}</td>
                <td>{product.product_type}</td>
                <td>{product.unit_price}</td>
                <td>{product.tax_rate}</td>
                <td>{product.currency}</td>
                <td>
                  <button id="btn" onClick={()=>handleEdit(product)}>Edit</button>
                  <button id="buton" onClick={() => deleteProduct(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

// import React, { useState } from "react";
// import Sidebar from "../container/Sidebar";
// import "./Products.css"; // Import the CSS file

// const Products = () => {
//   const [search, setSearch] = useState("");

//   // Static product data
//   const productList = [
//     {
//       id: 1,
//       product_name: "Laptop",
//       product_id: "P001",
//       product_code: "LP100",
//       hsn_sac_code: "84713010",
//       product_description: "High-performance laptop",
//       product_type: "Electronics",
//       unit_price: "$1000",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 2,
//       product_name: "Smartphone",
//       product_id: "P002",
//       product_code: "SP200",
//       hsn_sac_code: "85171290",
//       product_description: "Latest 5G smartphone",
//       product_type: "Electronics",
//       unit_price: "$700",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//     {
//       id: 3,
//       product_name: "Office Chair",
//       product_id: "P003",
//       product_code: "OC300",
//       hsn_sac_code: "94013000",
//       product_description: "Ergonomic office chair",
//       product_type: "Furniture",
//       unit_price: "$150",
//       tax_rate: "12%",
//       currency: "USD",
//     },
//     {
//       id: 4,
//       product_name: "Bluetooth Speaker",
//       product_id: "P004",
//       product_code: "BS400",
//       hsn_sac_code: "85182200",
//       product_description: "Portable wireless speaker",
//       product_type: "Electronics",
//       unit_price: "$50",
//       tax_rate: "18%",
//       currency: "USD",
//     },
//   ];

//   // Filter products based on search input
//   const filteredProducts = productList.filter((product) =>
//     `${product.product_name} ${product.product_id} ${product.product_code} ${product.product_description}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="gop">
//       <Sidebar />
//       <div className="header-topper">
//         <h1 className="gopa">Products</h1>
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-bar"
//         />
//         <a href="/add-product">
//           <button className="add-customer-button">Add Product</button>
//         </a>
//       </div>

//       <table className="customer-table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Product ID</th>
//             <th>Product Code</th>
//             <th>HSN/SAC Code</th>
//             <th>Description</th>
//             <th>Type</th>
//             <th>Unit Price</th>
//             <th>Tax Rate</th>
//             <th>Currency</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.product_name}</td>
//                 <td>{product.product_id}</td>
//                 <td>{product.product_code}</td>
//                 <td>{product.hsn_sac_code}</td>
//                 <td>{product.product_description}</td>
//                 <td>{product.product_type}</td>
//                 <td>{product.unit_price}</td>
//                 <td>{product.tax_rate}</td>
//                 <td>{product.currency}</td>
//                 <td>
//                   <button id="btn">Edit</button>
//                   <button id="buton">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10">No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Products;
