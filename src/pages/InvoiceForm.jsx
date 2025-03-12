import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { toWords } from "number-to-words";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
export default function InvoiceForm({ onInvoiceAdded }) {
  const [customers, setCustomers] = useState([]);
  const [dd, setdd] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [datee, setDatee] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [dt, setDt] = useState("");
  const [show, setShow] = useState("");
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([{}]);
  useEffect(() => {
    setdd(dd.getMonth() + 1 + "/" + dd.getFullYear());
    setMonth(month.getMonth() + 1);
    setDatee(datee.getDate());
    setYear(year.getFullYear());
    setDt(datee.getDate()+"/"+(month.getMonth()+1)+"/"+year.getFullYear());
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5003/api/productdetail/productName",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [onInvoiceAdded]);

  const handleKeyUp = (e) => {
    const value = e.target.value;
    console.log(value);
    
    // Allow only digits and dots
    if (!/^[\d.]*$/.test(value)) {
      return;
    }
  
    setDt(value);
  };
  
  const handleDateBlur = () => {
    const parts = dt.split('.');
  
    // Ensure we have the correct number of parts
    if (parts.length === 1 && parts[0].length <= 2) {
      // Format as DD.MM
      setDt(`${parts[0]}/${month}/${year}`);
    } else if (parts.length === 2 && parts[0].length <= 2 && parts[1].length <= 2) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/${year}`);
    } else if (parts.length === 3 && parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length <= 2) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/20${parts[2]}`);
    }
    else if (parts.length === 3 && parts[0].length <= 2 && parts[1].length <= 2 && parts[2].length <= 4) {
      // Format as DD.MM.YYYY
      setDt(`${parts[0]}/${parts[1]}/${parts[2]}`);
    }
  };
  function handleFoucus() {
    setDt("");
  }
  function increaseCount() {
    console.log("count" + count);
    setCount(count + 1);
  }
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [billing, setBilling] = useState("");
  const [productdt, setProductdt] = useState([{}]);
  const [product_hsn, setProduct_hsn] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [gst, setGst_rate] = useState("");
  const [gstRate, setGstRate] = useState(0);
  const [currency, setCurrency] = useState("");
  const handleDebounce=debounce(value=>{
        console.log("i will run");
        const fetchCustomersDetails = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
              `http://localhost:5003/api/invoices/${value}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(res.data);
            const getName = res.data[0].company_name;
            const getEmail = res.data[0].email;
            const getBilling =
              res.data[0].billing_address1 +
              " " +
              res.data[0].billing_city +
              " " +
              res.data[0].billing_state +
              " " +
              res.data[0].billing_zip +
              " " +
              res.data[0].billing_country;
            console.log(getName);
            console.log(getEmail);
            console.log(getBilling);
            setName(getName);
            setemail(getEmail);
            setBilling(getBilling);
            setProducts(res.data);
            handleProductdt();
          } catch (error) {
            console.error("Error fetching customers:", error);
            setemail("");
            setName("");
            setBilling("");
            handleProductdt();
          }
        };
        fetchCustomersDetails();
        
  },900)
  function handleTimer(value){
        handleDebounce(value);
  }
  function handleApiCall(e) {
    handleTimer(e.target.value);
    console.log(e.target.value);
    
  }
  function handleProductdt() {
    const fetchCustomersProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5003/api/productdetail/productName",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomersProduct();
  }

  const [productRows, setProductRows] = useState([
    {
      id: Date.now(),
      productName: "",
      hsnCode: "",
      gstRate: "",
      gstCalculate: "",
      unitPrice: "",
      quantity: "",
      total: "",
    },
  ]);
  const handleProductChange = async (index, productName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5003/api/productdetail/all/${productName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productDetail = res.data[0];
      const updatedRows = [...productRows];
      var rate = 100;
      rate =
        parseInt(res.data[0].tax_rate) * parseFloat(res.data[0].unit_price);
      console.log(rate);
      rate = rate / 100;
      console.log("gstRate" + rate);
      updatedRows[index] = {
        ...updatedRows[index],
        productName: productDetail.product_name,
        hsnCode: productDetail.product_hsn_code,
        gstRate: productDetail.tax_rate,
        gstCalculate: rate + parseFloat(res.data[0].unit_price),
        unitPrice: productDetail.unit_price,
        total: productDetail.unit_price * updatedRows[index].quantity, // Update total based on quantity
      };
      setProductRows(updatedRows);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const [total, setTotal] = useState(0);
  const [addTotal, setAddTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [AmountWords, setAmountWords] = useState("");
  const handleQuantityChange = (index, quantity,getNotify) => {
    var subTotalll = 0;
    if(getNotify=="qtyChange")
    {
    const updatedRows = [...productRows];
    updatedRows[index].quantity = quantity;
    updatedRows[index].total = updatedRows[index].gstCalculate * quantity; // Update total based on quantity
    setProductRows(updatedRows);
    setAddTotal(0);
    setSubTotal(0);
    var totall = 0;
    var subTotall = 0;
    var num=0;
    for (var i of productRows) {
      subTotall = subTotall + parseFloat(i.unitPrice);
      totall = totall + parseFloat(i.total);
      // setAddTotal(addTotal+totall);
      if(productRows.length-2==num)
      {
          subTotalll=subTotall
      }
      console.log(subTotalll);
      num++;
    }
    console.log(totall + "i ");
    setAddTotal(totall.toFixed(2));
    setSubTotal(subTotall);
    // const word=toWords(parseFloat(totall,10));
    // setAmountWords(word.toUpperCase());
    // Handle crores
    let result = ''; // Initialize result as an empty string
const units = ["", " lakh", " crore"];
 // Units for Indian numbering system

if (totall >= 10000000) { // Check if num is 10 million or more
  console.log("working");
  const crores = Math.floor(totall / 10000000); // crores = 1
  result += toWords(crores) + units[2]; // result = "1 crore"
  totall %= 10000000; // num = 5000000
  setAmountWords(result.toUpperCase()+" RUPEES ONLY/-");
  console.log("add"+totall);
}

// Handle lakhs
if (totall >= 100000) { // Check if num is 100,000 or more
  const lakhs = Math.floor(totall / 100000); // lakhs = 5
  result += (result ? ' ' : '') + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  totall %= 100000; // num = 0
  setAmountWords(result.toUpperCase()+" RUPEES ONLY/-");
  console.log("add"+totall);
}
// Handle thousands and below
if(totall>=0) { // Check if num is greater than 0
  console.log("working>0"+totall);
  const word=toWords(parseFloat(totall,10));
    setAmountWords(result.toUpperCase()+" "+word.toUpperCase()+" RUPEES ONLY/-");
}
console.log(result.trim()); // Output: "1 crore 5 lakh"
  }
  else if(getNotify=="remove")
  {
    const updatedRows = [...productRows];
    console.log(productRows[index]);
    updatedRows[index].quantity = 0;
    updatedRows[index].total = updatedRows[index].gstCalculate * 0; // Update total based on quantity
    setProductRows(updatedRows);
    setAddTotal(0);
    setSubTotal(0);
    var totall = 0;
    var subTotall = 0;
      // console.log(i);
      subTotall =subTotal- parseFloat(productRows[index].unitPrice);
      for(var i of productRows)
      {
        totall = totall + parseFloat(i.total);
      }
      // setAddTotal(addTotal+totall);
    console.log(totall + "i ");
    setAddTotal(totall.toFixed(2));
    console.log(subTotall);
    setSubTotal(subTotall);
    let result = ''; // Initialize result as an empty string
const units = ["", " lakh", " crore"]; // Units for Indian numbering system
if (totall >= 10000000) { // Check if num is 10 million or more
  console.log("working");
  const crores = Math.floor(totall / 10000000); // crores = 1
  result += toWords(crores) + units[2]; // result = "1 crore"
  totall %= 10000000; // num = 5000000
  setAmountWords(result.toUpperCase()+" RUPEES ONLY/-");
}

// Handle lakhs
if (totall >= 100000) { // Check if num is 100,000 or more
  const lakhs = Math.floor(totall / 100000); // lakhs = 5
  result += (result ? ' ' : '') + toWords(lakhs) + units[1]; // result = "1 crore 5 lakh"
  totall %= 100000; // num = 0
  setAmountWords(result.toUpperCase()+" RUPEES ONLY/-");
  console.log("totall remaining"+totall);
}
// Handle thousands and below
if(totall>0){ // Check if num is greater than 0
  const word=toWords(parseFloat(totall,10));
    setAmountWords(result.toUpperCase()+" "+word.toUpperCase()+" RUPEES ONLY/-");
}


console.log(result.trim()); // Output: "1 crore 5 lakh"
  }
  };
  const [alter, setAlter] = useState(0);

  const handleAddProductRow = () => {
    setProductRows([
      ...productRows,
      {
        id: Date.now(),
        productName: "",
        hsnCode: "",
        gstRate: "",
        unitPrice: "",
        quantity: "",
        total: "",
      },
    ]);
  };
  const formik = useFormik({
    initialValues: {
      invoiceDate: "",
      customerNumber: "",
      // customerName: "",
      // customerEmail: "",
      billing_address: "",
      references: "",
      shipping_address:"",
      // "sNo": 0,
      // "productName": "",
      // "HSNCode": 0,
      // "GSTRate": 0,
      // "unitPrice": 0,
      // "quantity": 0,
      // "GST": 0,
      // "Discount": 0,
      // "totalPrice": 0,
      subTotal: 0,
      totalAmount: 0,
      // Amountinwords: "",
      invoiceNotes: "",
      signature_box: "",
      productdetail: [{}],
    },
    onSubmit: (values) => {
      values.invoiceDate=dt;
      // values.customerName = name;
      values.billing_address = billing;
      values.sNo = 1;
      values.shipping_address=ship;
      values.productdetail = productRows;
      values.subTotal = subTotal;
      values.totalAmount = addTotal;
      // alert(JSON.stringify(values.productdetail));
      // alert(JSON.stringify(values));
      // values.invoiceDate = dt;
      // alert(values.invoiceDate);
      // console.log(productRows);
      // const handleProductChange = async (index, productName) => {
      //   try {
      //     const token = localStorage.getItem("token");
      //     const res = await axios.get(
      //       `http://localhost:5003/api/productdetail/all/${productName}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
    
      const addInvoiceData=async ()=>{
        try{
          const token=localStorage.getItem("token");
          const res=await axios.post(`http://localhost:5003/api/invoices/submit`,values,{
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
          alert(JSON.stringify(values));
        }
        catch(err){
              console.log(err);
        }
      }
      addInvoiceData();
    },
  });
  const[ship,setShip]=useState("");
  function handleCheck(e){
    if(e.target.checked)
    {
      console.log("checked");
      console.log(billing);
      setShip(billing);
    }
    else{
      setShip("");
    }
  }
  return (
    <div className="flex justify-center" style={{overflow:"scroll",height:"99vh"}}>
      <div className="py-6">
        <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md ">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
            Invoice Form
          </h2>
          <button className="btn btn-primary float-end"><NavLink to="/invoices" className="text-white text-decoration-none" >Close</NavLink></button>
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="invoiceDate"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Invoice Date:
                </label>
                <input
                  onBlur={handleDateBlur}
                  onChange={handleKeyUp}
                 onFocus={handleFoucus}
                  type="text"
                  id="invoiceDate"
                  name="invoiceDateee"
                  placeholder="date.month.year"
                  value={dt}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                />
                
              </div>
              <div>
                <label
                  htmlFor="CustomerNumber"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Customer Contact_Number:
                </label>
                <input
                  type="number"
                  id="customerNumber"
                  name="customerNumber"
                  required
                  onChange={formik.handleChange}
                  onKeyUp={handleApiCall}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter invoice number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="customerName"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Customer Name:
                </label>
                <input
                  type="text"
                  id="customerName"
                  {...(name!=""?{value:name}:{})}
                  name="customerName"
                  onChange={formik.handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Customer Name"
                />
              </div>
              {/* <div>
                <label
                  for="customerEmail"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Customer Email:
                </label>
                <input
                  type="email"
                  value={email}
                  id="customerEmail"
                  onChange={formik.handleChange}
                  name="customerEmail"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Customer Email"
                />
              </div> */}
              <div>
                <label
                  htmlFor="reference"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Reference:
                </label>
                <input
                  type="text"
                  id="reference"
                  onChange={formik.handleChange}
                  name="references"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Reference details"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="billing_address"
                className="block mb-2 font-semibold text-gray-700"
              >
                Additional Information's:
              </label>
              {/* <input
                  type="text"
                  value={billing}
                  onChange={formik.handleChange}
                  id="billing_address"
                  name="billing_address"
                  required
                  className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Billing Address"
                /> */}
              <textarea
                name="billing-address"
                readOnly
                value={
                  "Customer Email:" +
                  email +
                  "\n" +
                  "billing_address:" +
                  billing
                }
                className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                id=""
              ></textarea>
              <div className="">
              <label
                htmlFor="shipping_address"
                className="block mb-2 font-semibold text-gray-700"
              >
                Shipping Address:
              </label>
              <span className="text-primary">What Shipping address to be same? </span><input onChange={handleCheck} type="checkbox" className="mb-3 form-check-input bg-primary"/>
              <textarea name="shipping_add1" onChange={formik.handleChange} required 
              {...(ship!=""?{value:ship}:{})} className="mb-4 form-control" id=""></textarea>
              </div>
            </div>
            <div className="mb-6 overflow-x-auto">
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-10 p-3 text-gray-700">S.No.</th>
                    <th className="p-3 text-left text-gray-700 w-30">
                      Product
                    </th>
                    <th className="w-20 p-3 text-gray-700">HSN Code</th>
                    <th className="w-20 p-3 text-gray-700">GST Rate</th>

                    <th className="w-20 p-3 text-gray-700">Unit Price</th>
                    <th className="w-20 p-3 text-gray-700">Qty</th>
                    <th className="w-20 p-3 text-gray-700">GST</th>
                    <th className="w-20 p-3 text-gray-700">Discount (%)</th>
                    <th className="w-20 p-3 text-gray-700">Total</th>
                    <th className="p-3 text-left text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row, index) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="number"
                          name="sNo"
                          onChange={formik.handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          value={index + 1}
                          readOnly
                        />
                      </td>
                      <td>
                        <select
                          name="productdetail"
                          className="form-select"
                          onChange={(e) =>
                            handleProductChange(index, e.target.value)
                          }
                          value={row.productName}
                        >
                          <option value="">Select</option>
                          {products.map((product) => (
                            <option
                              key={product.product_name}
                              value={product.product_name}
                            >
                              {product.product_name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="HSNCode"
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          value={row.hsnCode}
                          
                          min="0"
                          onChange={formik.handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="GSTRate"
                          onChange={formik.handleChange}
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          value={row.gstCalculate}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="unitPrice"
                          min="0"
                          onChange={formik.handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          value={row.unitPrice}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="quantity"
                          onChange={formik.handleChange}
                          onBlur={(e) =>
                            handleQuantityChange(index, e.target.value,"qtyChange")
                          }
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Quantity"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          onChange={formik.handleChange}
                          name="GST"
                          min="0"
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="GST"
                          value={row.gstRate}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="Discount"
                          onChange={formik.handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          placeholder="Discount"
                          min="0"
                          value="0"
                          // onInput="updateProductTotal(this)"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="totalPrice"
                          onChange={formik.handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                          value={row.total}
                          readOnly
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                          onClick={() => {
                            const updatedRows = productRows.filter(
                              (_, i) => i !== index
                            );
                            console.log(index);
                            const qtyGet=productRows[index].quantity;
                            console.log(qtyGet);
                            handleQuantityChange(index,qtyGet,"remove");
                            setProductRows(updatedRows);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="p-3 mt-4 text-white bg-blue-700 rounded-md hover:bg-blue-800"
                onClick={handleAddProductRow}
              >
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="subTotal"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Subtotal:
                </label>
                <input
                  type="number"
                  id="subTotal"
                  name="subTotal"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Subtotal"
                  readOnly
                  value={subTotal}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="totalAmount"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Total Amount:
                </label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Total Amount"
                  readOnly
                  value={addTotal}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="Amountinwords"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Amount in Words:
                </label>
                <input
                  type="text"
                  id="Amountinwords"
                  name="Amountinwords"
                  value={AmountWords}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Enter Total Amount in words"
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="invoiceNotes"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Notes:
                </label>
                <textarea
                  id="invoiceNotes"
                  name="invoiceNotes"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  placeholder="Any additional notes..."
                  onChange={formik.handleChange}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="signature_box"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Signature Box:
                </label>
                <textarea
                  id="signature_box"
                  name="signature_box"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Generate Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
  );
}
