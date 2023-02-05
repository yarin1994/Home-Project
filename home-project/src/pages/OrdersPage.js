import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = "http://localhost:5001";

const OrdersPage = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/orders/` + user_id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    setData(response.data.orders);
  };
  return (
    <>
      {data.length ? (
        data.map((item) => (
          <div key={item._id}>
            <div>
              <h3>{item._id}</h3>
              <h3>{item.product_name}</h3>
              <h3>{item.quantity}</h3>
            </div>
            {/* Add a order card component */}
            {/* and send the orders data to display it */}
          </div>
        ))
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
};

export default OrdersPage;
