import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
const BASE_URL = "http://localhost:5001";

const ProductList = ({
  order_id,
  product_id,
  product_name,
  price,
  quantity,
  onDeleteSuccess,
}) => {
  const [itemQuantity, setQuantity] = useState(quantity);
  const [enabled, setEnabled] = useState(false);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  const handleOnClick = () => {
    setEnabled(true);
  };

  const onSave = async () => {
    setEnabled(false);
    if (itemQuantity > 0) {
      await axios.put(
        `${BASE_URL}/orders/` + order_id,
        {
          product: product_id,
          user_id: user_id,
          quantity: itemQuantity,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      await axios.delete(`${BASE_URL}/orders/` + order_id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      onDeleteSuccess();
    }
  };

  return (
    <>
      <div className="ProductList">
        <div
          className="ProductList__item"
          key={product_name}
          onClick={handleOnClick}
        >
          <div className="ProductList__item__name">{product_name}</div>
          <div className="ProductList__item__name">{price}</div>

          {enabled ? (
            <>
              <button
                onClick={() => {
                  itemQuantity > 0
                    ? setQuantity(itemQuantity - 1)
                    : setQuantity(itemQuantity);
                }}
              >
                -
              </button>
              <div className="ProductList__item__quantity">{itemQuantity}</div>
              <button
                onClick={() => {
                  setQuantity(itemQuantity + 1);
                }}
              >
                +
              </button>
            </>
          ) : (
            <div className="ProductList__item__quantity">{itemQuantity}</div>
          )}

          <div className="ProductList__item__price">{itemQuantity * price}</div>
        </div>
        {enabled ? <button onClick={onSave}>Save</button> : null}
      </div>
    </>
  );
};

export default ProductList;
