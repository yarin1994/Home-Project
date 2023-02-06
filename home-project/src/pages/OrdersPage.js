import React, { useState, useEffect } from "react";
import ProductList from "../components/OrderCard";
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
      <div className="ProductList__item__headline">
        <div className="ProductList__item__name">Name</div>
        <div className="ProductList__item__quantity">Quantity</div>
        <div className="ProductList__item__price">Price</div>
      </div>
      {data.length ? (
        data.map((item) => (
          <div key={item._id}>
            <ProductList
              product_name={item.product_name}
              quantity={item.quantity}
              price={item.price}
            />
          </div>
        ))
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
};

export default OrdersPage;
