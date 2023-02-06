import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const BASE_URL = "http://localhost:5001"

const ProductCard = (item) => {
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');


  const productOnClick = (id, name, price) => {
    axios.post(
      `${BASE_URL}/orders/` + user_id,
      {
        product: id,
        product_name: name,
        price: price
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  return (
    <>
      <div className="product-card">
        <img src={item.img} alt="Product Name" />
        <h3>Name: {item.name}</h3>
        <h3 className="price">Price: {item.price}</h3>
        <Button onClick={() => {productOnClick(item.id, item.name, item.price)}} className="product-card button">Add to Cart</Button>
      </div>
    </>
  );
};

export default ProductCard;
