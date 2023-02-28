import React, { useState, useEffect } from "react";
import ProductList from "../components/OrderCard";
import axios from "axios";
const BASE_URL = "http://localhost:5001";

const OrdersPage = () => {
  const [data, setData] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetchData();
    setDeleteSuccess(false)
  }, [deleteSuccess]);

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/orders/` + user_id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(`response`, response);
    setData(response.data.orders);
  };

  const handleDeleteSuccess = () => {
    setDeleteSuccess(true);
  };

  return (
    <>
      <div className="ProductList__item__headline">
        <div className="ProductList__item__name">Name</div>
        <div className="ProductList__item__name">Price</div>
        <div className="ProductList__item__quantity">Quantity</div>
        <div className="ProductList__item__price">Total Price</div>
      </div>
      {data.length ? (
        data.map((item) => (
          <div key={item._id}>
            <ProductList
              order_id={item._id}
              product_id={item.product_id}
              product_name={item.product_name}
              price={item.price}
              quantity={item.quantity}
              onDeleteSuccess={handleDeleteSuccess}
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
