import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import ProductCard from "../components/ProductCard";

const BASE_URL = "http://localhost:5001/products";
const useStyles = makeStyles(() => ({
  productCard: {
    width: "200px",
    height: "100px",
    marginTop: "20px",
    backgroundColor: "red",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setData(response.data.products);
  };

  return (
    <>
      <h2>Products Page</h2>
      <div className="card-container">
        {data.length ? (
          data.map((item) => (
            <div key={item._id}>
              <ProductCard name={item.name} price={item.price} img={item.img} />
            </div>
          ))
        ) : (
          <h2>loading</h2>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
