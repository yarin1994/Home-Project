import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/RouteManagement/ProtectedRoutes";
import PublicRoutes from "../components/RouteManagement/PublicRoutes";
import InnerContent from "../components/RouteManagement/InnerContent";

import RegistrationFrom from "../components/RegistrationFrom";
import Login from "../pages/Login";

const ReactRouter = () => {
  
  <Routes>
    {/* <Route path="/" element={ProtectedRoutes}> */}
      {/* <Route path="/" element={InnerContent}></Route> */}
    {/* </Route> */}

    {/* <Route path="/" element={PublicRoutes}> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RegistrationFrom />} />
    {/* </Route> */}
  </Routes>;
};

export default ReactRouter;
