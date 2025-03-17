import axios from "axios";
import { useEffect, useState,useRef } from "react"
import { useLocation } from "react-router-dom"
import { useReactToPrint } from "react-to-print";
import "../styles/generateInvoice.css"
export function GenerateInvoice(){
    const [customer,setCustomer]=useState([{}]);
    const location=useLocation();
    const [data,setData]=useState(null);
            useEffect(()=>{
            const get=[location.state];
            console.log(get);
            const fetchCustomerDetails=async ()=>{
                const token=localStorage.getItem("token");
                try{
                    const number=get[0].data.customerNumber;
                    const res=await axios.get(`http://localhost:5003/api/invoices/${number}`,{
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    })
                    console.log(res.data);
                    setCustomer(res.data);
                    setData([location.state])
                }
                catch(error){
                    console.log(error);
                }
            }
            fetchCustomerDetails();
            },[])
            
            const contentRef=useRef();
            const handlePrintInvoice=useReactToPrint({contentRef})

    return(
        <>
            {data!=null?
                (<div ref={contentRef} id="invoice">
                <div className="invoiceWidth">
                <h4>Tax Invoice</h4>
                <h4>{customer[0].company_name}</h4>
            <h4>{data[0].data.shipping_address}</h4>
            <h4>Gstin number</h4>
            <h4 className="customer_name">Name:{customer[0].first_name.toUpperCase()+" "+customer[0].last_name.toUpperCase()}</h4>
            <table className="table table-borderless table-responsive">
                <thead >
                    <tr>
                        <th>Items</th>
                        <th>Taxable</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(values=>
                        customer.map(valueCustomer=>(
                                values.data.productdetail.map(val=>
                                    <tr>
                                        <td>
                                        {val.productName}x{val.quantity}
                                        <br />
                                        HSN:{val.hsnCode}
                                        <br />
                                        Rate:{val.unitPrice}                                    
                                    </td>
                                    <td className="">  
                                            {val.unitPrice}
                                            <br />
                                            +{val.gstRate}%
                                       
                                    </td>
                                    <td>
                                        {val.total}
                                    </td>
                                    </tr>
                                )
                                                ))
                    )}
                </tbody>
            </table>
            </div>
            </div>
                
            ):(<h1>loading</h1>)
        }
        <button onClick={handlePrintInvoice}>Print Invoice</button>
        </>
    )
}