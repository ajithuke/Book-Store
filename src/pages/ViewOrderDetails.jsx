import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ViewOrderDetailspage = ()=>{

    const params = useParams()
    const firebase = useFirebase()

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        firebase.getOrders(params.bookId).then((snap)=>{setOrders(snap.docs)})
    },[])

    return (
        <div className="container">
            <h1>Orders</h1>
            {orders.map((order)=>{
                const data = order.data()
                return (
                    <div style={{border:'solid black 1px',margin:'20px',padding:'10px'}}>
                        <h5>Customer Email : {data.Email}</h5>
                        <h5>Quantity Ordered : {data.Quantity}</h5>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewOrderDetailspage