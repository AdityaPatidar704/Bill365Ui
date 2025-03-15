import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/ProductForm.css"; // Using the same CSS as ProductForm
import { useFormik } from "formik";
import axios from "axios";
import { debounce } from "lodash";
import { ButtonComponent } from "../components/ButtonComponent/btn";
export default function CustomerForm({
  onCustomerAdded,
  editCustomer,
  onCancelEdit,
}) {
  const [country, setCountry] = useState([{}]);
  const [iso2Country, setIso2Country] = useState("");
  const [iso2State, setIso2State] = useState("");
  const [style1, setStyle1] = useState({ display: "none" });
  const [style2, setStyle2] = useState({ display: "inline-block" });
  useEffect(() => {
    const getCountry = async () => {
      var config = {
        //// NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==
        method: "get",
        url: "https://api.countrystatecity.in/v1/countries",
        headers: {
          "X-CSCAPI-KEY":
            "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
        },
      };

      await axios(config)
        .then(function (response) {
          console.log(response.data);
          setCountry(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getCountry();
  }, []);
  const navigate = useNavigate();
  const [names, setNames] = useState({
    countryName: "",
    stateName: "",
    cityName: "",
  });
  const [state, setState] = useState([{}]);
  function handleCountryChange(e) {
    console.log("i am changed" + e.target.value);
    if (e.target.value == "select") {
      console.log("executed me select");
      setNames({
        countryName: "",
        stateName: "",
        cityName: "",
      });
      setState([{}]);
      setCity([{}]);
    }
    const [iso, name] = e.target.value.split(".");
    const getState = async () => {
      try {
        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${iso}/states`,
          headers: {
            "X-CSCAPI-KEY":
              "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
          },
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setState(response.data);
            setIso2Country(iso);
            setNames({
              ...names,
              countryName: name,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getState();
  }
  const [city, setCity] = useState([{}]);
  function handleStateChange(e) {
    const [iso, name] = e.target.value.split(".");
    console.log("city Changed");
    console.log(e.target.value);
    setIso2State(iso);
    const getCity = async () => {
      try {
        var config = {
          method: "get",
          url: `https://api.countrystatecity.in/v1/countries/${iso2Country}/states/${iso}/cities`,
          headers: {
            "X-CSCAPI-KEY":
              "NEMzaW5KOW1yVjhoalBQSmhKRzRBb1U1ZFZWVXh6Z0pZWFI5TXdMMg==",
          },
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setCity(response.data);
            setNames({
              ...names,
              stateName: name,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getCity();
  }

  function handleCityChange(e) {
    console.log(e.target.value);
    setNames({
      ...names,
      cityName: e.target.value,
    });
  }
  const [zipData, setZipdata] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [zip, setZip] = useState("");
  const formik = useFormik({
    initialValues: {
      customer_id: "",
      company_name: "",
      email: "",
      company_name: "",
      first_name: "",
      last_name: "",
      phone: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip_code: "",
      fax: "",
      country: "",
      tax_id: "",
      currency: "",
      language: "",
      is_active: false,
      billing_address1: "",
      billing_address2: "",
      billing_city: "",
      billing_state: "",
      billing_zip: "",
      billing_country: "",
      // sameAsShipping: false, // For "same as shipping address" checkbox
    },
    onSubmit: (values) => {
      console.log("customer running");
      values.zip_code = zip;
      alert(JSON.stringify(values));
      // alert(JSON.stringify(zipData.country));
      if (names.cityName === "") {
        console.log("hii");
        values.country = zipData.country;
        values.state = zipData.state;
        values.city = zipData.city;
      } else {
        console.log("wooo");
        values.country = names.countryName;
        values.state = names.stateName;
        values.city = names.cityName;
      }
      const addCustomersData = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(
            "http://localhost:5003/api/customers",
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert(JSON.stringify(values));
        } catch (err) {
          console.log(err);
        }
      };
      addCustomersData();
      navigate("/display");
    },
  });

  const handleDebounce = debounce((value) => {
    console.log("debouncing");
    console.log(value);
    const fetchUsingZipCode = async () => {
      try {
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        console.log(JSON.stringify(res.data));
        console.log(res.data[0].PostOffice[0].Country);
        setZipdata({
          country: res.data[0].PostOffice[0].Country,
          state: res.data[0].PostOffice[0].State,
          city: res.data[0].PostOffice[0].Block,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsingZipCode();
  }, 700);

  function handleZipCodeChange(e) {
    handleDebounce(e.target.value);
    console.log(e.target.value);
    setZip(e.target.value);
    if (e.target.value === "") {
      console.log("i am executed for empty");
      console.log(names.cityName + "empty");
      if (names.cityName === "") {
        console.log("i am executed for empty2");
        setStyle1({ display: "none" });
        setStyle2({ display: "inline-block" });
        setZipdata({
          country: "",
          state: "",
          city: "",
        });
      }
    }
    if (e.target.value != "") {
      console.log("i am executing for empty3");
      console.log("empty" + names.cityName);
      if (names.cityName == "") {
        setStyle1({ display: "inline-block" });
        setStyle2({ display: "none" });
      }
    }
  }
  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-semibold text-center text-gray-800 d-inline-block">
          Customer Billing Form
        </h1>
        <button className="btn btn-primary float-end">
          <NavLink to="/display" className="text-white text-decoration-none">
            Close
          </NavLink>
        </button>
        <form id="customerForm" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label
                for="Customer-Id"
                className="text-sm font-semibold text-gray-700"
              >
                Customer-Id:
              </label>
              <input
                type="number"
                id="Customer-Id"
                name="customer_id"
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Customer ID"
              />
            </div>
            <div>
              <label
                for="Company_name"
                className="text-sm font-semibold text-gray-700"
              >
                Company Name:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="Company_name"
                name="company_name"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Company Name"
              />
            </div>
            <div>
              <label
                for="first_name"
                className="text-sm font-semibold text-gray-700"
              >
                First Name:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="first_name"
                name="first_name"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter First Name"
              />
            </div>

            <div>
              <label
                for="last_name"
                className="text-sm font-semibold text-gray-700"
              >
                Last Name:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="last_name"
                name="last_name"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Last Name"
              />
            </div>

            <div>
              <label
                for="Email"
                className="text-sm font-semibold text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                onChange={formik.handleChange}
                // id="email"
                name="email"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Email Address"
              />
            </div>

            <div>
              <label
                for="phone"
                className="text-sm font-semibold text-gray-700"
              >
                Phone:
              </label>
              <input
                type="number"
                id="phone"
                onChange={formik.handleChange}
                name="phone"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <label
                for="mobile"
                className="text-sm font-semibold text-gray-700"
              >
                Mobile:
              </label>
              <input
                type="number"
                id="mobile"
                onChange={formik.handleChange}
                name="mobile"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Phone Number"
              />
            </div>
            <div>
              <label
                for="tax_id"
                className="text-sm font-semibold text-gray-700"
              >
                GSTN:
              </label>
              <input
                type="number"
                id="tax_id"
                onChange={formik.handleChange}
                name="tax_id"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter GSTN"
              />
            </div>

            <div>
              <label
                for="address_1"
                className="text-sm font-semibold text-gray-700"
              >
                Address 1:
              </label>
              <textarea
                id="address_1"
                name="address1"
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                placeholder="Enter Address 1"
              ></textarea>
            </div>

            <div>
              <label
                for="address_2"
                className="text-sm font-semibold text-gray-700"
              >
                Address 2:
              </label>
              <textarea
                id="address_2"
                name="address2"
                onChange={formik.handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                placeholder="Enter Address 2"
              ></textarea>
            </div>
            <div>
              <label for="Fax" className="text-sm font-semibold text-gray-700">
                Fax:
              </label>
              <input
                type="number"
                id="fax"
                onChange={formik.handleChange}
                name="fax"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Fax"
              />
            </div>
            <div>
              <label
                for="country"
                className="text-sm font-semibold text-gray-700"
              >
                Country:
              </label>
              <input
                style={style1}
                type="text"
                id="country"
                name="country"
                value={zipData.country}
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md style2 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Country Name"
              />
              {/* /////////////////////////////////////////// */}
              <select
                style={style2}
                name="country"
                className="style1 form-select"
                onChange={handleCountryChange}
              >
                <option readOnly value="select">
                  Select
                </option>
                {country.map((values) => (
                  <option
                    value={values.iso2 + "." + values.name}
                    className="form-text"
                    key={values.id}
                  >
                    {values.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="state"
                className="text-sm font-semibold text-gray-700"
              >
                State:
              </label>
              <input
                type="text"
                style={style1}
                id="state"
                value={zipData.state}
                name="state"
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md style2 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter State Name"
              />
              <select
                name="state"
                style={style2}
                className="style1 form-select"
                onChange={handleStateChange}
              >
                <option readOnly value="select">
                  Select
                </option>
                {state.map((values) => (
                  <option
                    value={values.iso2 + "." + values.name}
                    className="form-text"
                    key={values.id}
                  >
                    {values.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label for="city" className="text-sm font-semibold text-gray-700">
                City:
              </label>
              <input
                style={style1}
                type="text"
                id="city"
                value={zipData.city}
                name="city"
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md style2 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Country Name"
              />
              <select
                style={style2}
                className="style1 form-select"
                onChange={handleCityChange}
                name="city"
              >
                <option readOnly value="select">
                  Select
                </option>
                {city.map((values) => (
                  <option
                    value={values.name}
                    className="form-text"
                    key={values.id}
                  >
                    {values.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label for="zip" className="text-sm font-semibold text-gray-700">
                Zip/Pincode:
              </label>
              <input
                type="number"
                name="zip_code"
                onChange={handleZipCodeChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Zip/Pincode"
              />
            </div>
            <div>
              <label
                for="billing_city"
                className="text-sm font-semibold text-gray-700"
              >
                Billing City:
              </label>
              <input
                type="text"
                // id="billing_city"
                name="billing_city"
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Billing City"
              />
            </div>

            <div>
              <label
                for="billing_address1"
                className="text-sm font-semibold text-gray-700"
              >
                Billing Address 1:
              </label>
              <textarea
                id="billing_address1"
                name="billing_address1"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                placeholder="Enter Billing Address 1"
                onChange={formik.handleChange}
              ></textarea>
              {/* <!-- <input type="textarea" id="billing_address1" name="billing_address1" required className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"> */}
            </div>

            <div>
              <label
                for="billing_address2"
                className="text-sm font-semibold text-gray-700"
              >
                Billing Address 2:
              </label>
              <textarea
                id="billing_address2"
                onChange={formik.handleChange}
                name="billing_address2"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-200"
                placeholder="Enter Billing Address 2"
              ></textarea>
              {/* <!-- <input type="text" id="billing_address2" name="billing_address2" required className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"> --> */}
            </div>

            <div>
              <label
                for="billing_state"
                className="text-sm font-semibold text-gray-700"
              >
                Billing State:
              </label>
              <input
                type="text"
                id="billing_state"
                name="billing_state"
                onChange={formik.handleChange}
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Billing State"
              />
            </div>

            <div>
              <label
                for="billing_zip"
                className="text-sm font-semibold text-gray-700"
              >
                Billing Zip/Pincode:
              </label>
              <input
                type="number"
                onChange={formik.handleChange}
                id="billing_zip"
                name="billing_zip"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Billing Zip/Pincode"
              />
            </div>

            <div>
              <label
                for="billing_country"
                className="text-sm font-semibold text-gray-700"
              >
                Billing Country:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="billing_country"
                name="billing_country"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Billing Country"
              />
            </div>

            <div>
              <label
                for="currency"
                className="text-sm font-semibold text-gray-700"
              >
                Currency:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="currency"
                name="currency"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Currency"
              />
            </div>

            <div>
              <label
                for="language"
                className="text-sm font-semibold text-gray-700"
              >
                Language:
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                id="language"
                name="language"
                required
                className="w-full p-2 text-sm transition duration-300 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 hover:bg-gray-100"
                placeholder="Enter Language type"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            {/* <button
              type="submit"
              className="w-1/3 py-2 text-sm font-semibold text-white transition duration-300 transform bg-blue-600 rounded-full hover:bg-blue-800 hover:scale-105"
            >
              Submit
            </button> */}
            <ButtonComponent value="Submit" type="submit" label="Submit" className="w-1/3 py-2 text-sm font-semibold text-white transition duration-300 transform bg-blue-600 rounded-full hover:bg-blue-800 hover:scale-105"></ButtonComponent>
          </div>
        </form>
      </div>
    </div>
    // <div classNameName="bodye">
    //   <div classNameName="container">
    //     <h1>Customer Form</h1>
    //     <form classNameName="form-grid" onSubmit={handleSubmit}>
    //       {/* Personal Information */}
    //       <div>
    //         <label htmlFor="first_name">First Name:</label>
    //         <input
    //           type="text"
    //           id="first_name"
    //           name="first_name"
    //           value={formData.first_name}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="last_name">Last Name:</label>
    //         <input
    //           type="text"
    //           id="last_name"
    //           name="last_name"
    //           value={formData.last_name}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="email">Email:</label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="company_name">Company Name:</label>
    //         <input
    //           type="text"
    //           id="company_name"
    //           name="company_name"
    //           value={formData.company_name}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="phone">Phone:</label>
    //         <input
    //           type="text"
    //           id="phone"
    //           name="phone"
    //           value={formData.phone}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="mobile">Mobile:</label>
    //         <input
    //           type="text"
    //           id="mobile"
    //           name="mobile"
    //           value={formData.mobile}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="tax_id">Tax ID:</label>
    //         <input
    //           type="text"
    //           id="tax_id"
    //           name="tax_id"
    //           value={formData.tax_id}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="currency">Currency:</label>
    //         <input
    //           type="text"
    //           id="currency"
    //           name="currency"
    //           value={formData.currency}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="language">Language:</label>
    //         <input
    //           type="text"
    //           id="language"
    //           name="language"
    //           value={formData.language}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="is_active">Is Active:</label>
    //         <input
    //           type="checkbox"
    //           id="is_active"
    //           name="is_active"
    //           checked={formData.is_active}
    //           onChange={handleChange}
    //         />
    //       </div>

    //       {/* Shipping Address */}
    //       <div>
    //         <label htmlFor="address1">Address 1:</label>
    //         <input
    //           type="text"
    //           id="address1"
    //           name="address1"
    //           value={formData.address1}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="address2">Address 2:</label>
    //         <input
    //           type="text"
    //           id="address2"
    //           name="address2"
    //           value={formData.address2}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="city">City:</label>
    //         <input
    //           type="text"
    //           id="city"
    //           name="city"
    //           value={formData.city}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="state">State:</label>
    //         <input
    //           type="text"
    //           id="state"
    //           name="state"
    //           value={formData.state}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="zip">Zip:</label>
    //         <input
    //           type="text"
    //           id="zip"
    //           name="zip"
    //           value={formData.zip}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="country">Country:</label>
    //         <input
    //           type="text"
    //           id="country"
    //           name="country"
    //           value={formData.country}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>

    //       {/* Billing Address */}
    //       <div>
    //         <input
    //           type="checkbox"
    //           id="sameAsShipping"
    //           name="sameAsShipping"
    //           checked={formData.sameAsShipping}
    //           onChange={handleCheckboxChange}
    //         />
    //         <label htmlFor="sameAsShipping">Billing address is the same as shipping address</label>
    //       </div>

    //       <div>
    //         <label htmlFor="billing_address1">Billing Address 1:</label>
    //         <input
    //           type="text"
    //           id="billing_address1"
    //           name="billing_address1"
    //           value={formData.billing_address1}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping} // Disable if checkbox is checked
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="billing_address2">Billing Address 2:</label>
    //         <input
    //           type="text"
    //           id="billing_address2"
    //           name="billing_address2"
    //           value={formData.billing_address2}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="billing_city">Billing City:</label>
    //         <input
    //           type="text"
    //           id="billing_city"
    //           name="billing_city"
    //           value={formData.billing_city}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="billing_state">Billing State:</label>
    //         <input
    //           type="text"
    //           id="billing_state"
    //           name="billing_state"
    //           value={formData.billing_state}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="billing_zip">Billing Zip:</label>
    //         <input
    //           type="text"
    //           id="billing_zip"
    //           name="billing_zip"
    //           value={formData.billing_zip}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping}
    //           required
    //         />
    //       </div>

    //       <div>
    //         <label htmlFor="billing_country">Billing Country:</label>
    //         <input
    //           type="text"
    //           id="billing_country"
    //           name="billing_country"
    //           value={formData.billing_country}
    //           onChange={handleChange}
    //           disabled={formData.sameAsShipping}
    //           required
    //         />
    //       </div>

    //       {/* <div classNameName="button-container"> */}
    //         <button type="submit" classNameName="sumbit_button">Submit</button>
    //       {/* </div> */}
    //     </form>
    //   </div>
    // </div>
  );
}
