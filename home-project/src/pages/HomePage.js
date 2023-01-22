import React from "react";


const HomePage = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(isAuthenticated);
  return (
    <>
      <h1> HomePage </h1>
      <h4>token: {localStorage.token}</h4>
      <h4>isAuthenticated: {isAuthenticated}</h4>
      <h4>userName: {localStorage.getItem('user_name')}</h4>
    </>
  );
};

export default HomePage;
