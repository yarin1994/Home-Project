import React from "react";
import Button from "@mui/material/Button";

const ProductCard = (item) => {
  console.log(`item.img`, item.img);
  return (
    <>
      <div className="product-card">
        <img src={item.img} alt="Product Name" />
        <h3>Name: {item.name}</h3>
        <h3 className="price">Price: {item.price}</h3>
        <Button class="product-card button">Add to Cart</Button>
      </div>
    </>
  );
};

export default ProductCard;
