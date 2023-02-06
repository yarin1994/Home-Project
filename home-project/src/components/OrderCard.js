import React from "react";
import Button from "@mui/material/Button";
import "../App.css";

const ProductList = ({ product_name, quantity, price }) => {
  return (
    <>
      <Button className="ProductButton">Edit</Button>
      <div className="ProductList">
        <div className="ProductList__item" key={product_name}>
          <div className="ProductList__item__name">{product_name}</div>
          <div className="ProductList__item__quantity">{quantity}</div>
          <div className="ProductList__item__price">{price}</div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
