import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, Redirect } from "react-router-dom";
import RegistrationFrom from "./components/RegistrationFrom";
import Login from './pages/Login';
import ReactRouter from './Router/routes';

const App = () => {
  return (
    // <Container className='App'>
    //   <ReactRouter />
    // </Container>
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<RegistrationFrom />} />
        </Routes>
      </Router>
    </>
  )
};


export default App;
