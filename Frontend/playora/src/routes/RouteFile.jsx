import { Route, Routes } from "react-router-dom";
import LoginComponent from "../pages/login/LoginComponent";
import TurfLayout from "../pages/turf/components/TurfLayout";
import TurfDashBoard from "../pages/turf/components/TurfDashBoard";

const RouteFile=()=>
{
    return(
        <Routes>
                <Route path="/" element={<LoginComponent/>}/>


                {/* for turf Routes */}
                <Route path="turf" element={<TurfLayout/>}>
                    <Route path="turfDashBoard" element={<TurfDashBoard/>}/>
                    <Route index element={<TurfDashBoard/>}/>
                </Route>




        </Routes>
    );
}
export default RouteFile;