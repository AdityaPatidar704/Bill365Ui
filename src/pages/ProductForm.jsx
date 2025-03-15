
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ProductForm.css";
import { ButtonComponent } from "../components/ButtonComponent/btn";

const ProductForm = () => {
  const navigate = useNavigate(); // useNavigate hook

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_id: "",
      product_code: "",
      hsn_sac_code: "",
      product_description: "",
      product_type: "",
      unit_price: "",
      tax_rate: "",
      currency: "",
      product_image_pdf: null, // Added for file input
    },
    onSubmit: async (values) => {

      alert(JSON.stringify(values));
      

      try {
        const token=localStorage.getItem("token");
        const response = await axios.post("http://localhost:5003/products/add", values, {
          // headers: {
          //   "Content-Type": "multipart/form-data", // Set the content type for file upload
          // },
        });
        alert("Product added successfully!");
        console.log(response.data);

        // Navigate to products page after successful submission
        navigate("/products");

        // Reset form after submission
        formik.resetForm();
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product");
      }
    },
  });

  return (
    <div className="font-sans bg-gray-200">
      <div className="flex justify-center py-8">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">Product Form</h1>
          {/* <button className="btn btn-primary float-end"><NavLink to="/products" className="text-white text-decoration-none">close</NavLink></button> */}
          <NavLink to="/products">
          <ButtonComponent className="btn btn-primary float-end" value="close" label="close"></ButtonComponent>
          </NavLink>
          <form id="product_Form" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="product_name" className="block mb-2 font-semibold text-gray-700">Product Name:</label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formik.values.product_name}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <label htmlFor="product_id" className="block mb-2 font-semibold text-gray-700">Product ID:</label>
                <input
                  type="text"
                  id="product_id"
                  name="product_id"
                  value={formik.values.product_id}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product ID"
                />
              </div>
              <div>
                <label htmlFor="product_code" className="block mb-2 font-semibold text-gray-700">Product Code:</label>
                <input
                  type="number"
                  id="product_code"
                  name="product_code"
                  value={formik.values.product_code}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product Code"
                />
              </div>
              <div>
                <label htmlFor="hsn_sac_code" className="block mb-2 font-semibold text-gray-700">Product HSN/SAC Code:</label>
                <input
                  type="number"
                  id="hsn_sac_code"
                  name="hsn_sac_code"
                  value={formik.values.hsn_sac_code}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product HSN/SAC Code"
                />
              </div>
              <div>
                <label htmlFor="product_description" className="block font-semibold text-gray-700 mb- 2">Product Description:</label>
                <input
                  type="text"
                  id="product_description"
                  name="product_description"
                  value={formik.values.product_description}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product Description"
                />
              </div>
              <div>
                <label htmlFor="product_type" className="block mb-2 font-semibold text-gray-700">Product Type:</label>
                <input
                  type="text"
                  id="product_type"
                  name="product_type"
                  value={formik.values.product_type}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Product Type"
                />
              </div>
              <div>
                <label htmlFor="unit_price" className="block mb-2 font-semibold text-gray-700">Unit Price:</label>
                <input
                  type="number"
                  id="unit_price"
                  name="unit_price"
                  value={formik.values.unit_price}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Unit Price"
                />
              </div>
              <div>
                <label htmlFor="tax_rate" className="block mb-2 font-semibold text-gray-700">Tax Rate (%):</label>
                <input
                  type="number"
                  id="tax_rate"
                  name="tax_rate"
                  value={formik.values.tax_rate}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Tax Rate (%)"
                />
              </div>
              <div>
                <label htmlFor="currency" className="block mb-2 font-semibold text-gray-700">Currency:</label>
                <input
                  type="text"
                  id="currency"
                  name="currency"
                  value={formik.values.currency}
                  onChange={formik.handleChange}
                  required
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Currency"
                />
              </div>
              <div>
                <label htmlFor="product_image_pdf" className="block mb-2 font-semibold text-gray-700">Product Image (PDF):</label>
                <input
                  type="file"
                  id="product_image_pdf"
                  name="product_image_pdf"
                  accept="application/pdf"
                  onChange={(e) => {
                    formik.setFieldValue("product_image_pdf", e.currentTarget.files[0]);
                  }}
                  className="w-full p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              {/* <button className="w-1/3 py-2 text-white transition-transform transform bg-blue-600 rounded-md hover:bg-blue-700 hover:scale-105" type="submit">Submit</button> */}
              {/* <button className="w-1/3 py-2 text-white transition-transform transform bg-gray-600 rounded-md hover:bg-gray-700 hover:scale-105" type="button">Product List</button> */}
              <ButtonComponent type="submit" className="w-1/3 py-2 text-white transition-transform transform bg-blue-600 rounded-md hover:bg-blue-700 hover:scale-105" value="submit" label="Submit"></ButtonComponent>
              <ButtonComponent type="button" className="w-1/3 py-2 text-white transition-transform transform bg-gray-600 rounded-md hover:bg-gray-700 hover:scale-105" value="productList" label="Product List"></ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;