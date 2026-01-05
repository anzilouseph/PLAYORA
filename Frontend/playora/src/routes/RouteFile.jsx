import { Route, Routes } from "react-router-dom";
import LoginComponent from "../pages/login/LoginComponent";
import TurfLayout from "../pages/turf/components/TurfLayout";
import TurfDashBoard from "../pages/turf/components/TurfDashBoard";
import AdminLayyout from "../pages/admin/components/AdminLayyout";
import AdminDashBoard from "../pages/admin/components/AdminDashBoard";
import GetUserByIdAdmin from "../pages/admin/components/GetUserByIdAdmin";

const RouteFile=()=>
{
    return(
        <Routes>
                <Route path="/" element={<LoginComponent/>}/>

                {/* for admin */}
                <Route path="admin" element={<AdminLayyout/>}>
                    <Route path="adminDashBoard" element={<AdminDashBoard/>}/>
                    <Route index element={<AdminDashBoard/>}/>
                    <Route path="getUserById/:id" element={<GetUserByIdAdmin/>}/>
                </Route>


                {/* for turf Routes */}
                <Route path="turf" element={<TurfLayout/>}>
                    <Route path="turfDashBoard" element={<TurfDashBoard/>}/>
                    <Route index element={<TurfDashBoard/>}/>
                </Route>




        </Routes>
    );
}
export default RouteFile;