import { Route, Routes } from "react-router-dom";
import LoginComponent from "../pages/login/LoginComponent";

const RouteFile=()=>
{
    return(
        <Routes>
            <Route path="/" element={<LoginComponent/>}/>
        </Routes>
    );
}
export default RouteFile;