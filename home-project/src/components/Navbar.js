import React, {useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:5001/user/logout";


const NavBar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setUserName(localStorage.getItem("user_name"));
  }, [localStorage.getItem('user_name')])


  const handleLogout = async () => {
    try {
      const response = await axios.post(BASE_URL, null, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      if (response.data.message === 'Logout successful') {
          localStorage.removeItem('token');
          localStorage.removeItem('user_name')
          navigate('/');
      }
  } catch (error) {
      console.log(error);
  }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Project {userName}
          </Typography>
          {localStorage.getItem("token") ? (
            <Button
              onClick={handleLogout}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/login");
              }}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
