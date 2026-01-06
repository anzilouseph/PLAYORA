import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminServices from "../../../services/AdminServices";

const AdminDashBoard=()=>
{

    const [userData,setUserData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>
        {
            getInitialData()
        }
        ,[])

    const getInitialData=async()=>
    {
        try
        {
            const response =  await AdminServices.getAllUser();
            console.log("initial data loaded",response);
            if(response.status)
            {
            setUserData(response.data);
            }
            else
            {
                alert(response.data?.errorMessage || "failed ");
            }
        }
        catch(error)
        {
            alert(error.message ||"500");
        }
        
    }

    //for route to next page
    const navFn=(id)=>
    {
        navigate(`admin/getUserById/${id}`)
    };
return(
    <div className="container mt-4 row d-flex alihn-items-center">
        <div className="col-10">
            { userData ? (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">SI.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user,index)=>
                                    <tr key={user.id}>
                                        <td scope="col"> {index+1}</td>
                                        <td>{user.nameOfUser}</td>
                                        <td>{user.mobileOfUser}</td>
                                        <td>{user.emailOfUser}</td>
                                        <td>
                                            <div className="row d-flex">
                                              <div className="col-3">
                                                <button type="button" className="btn btn-primary" onClick={()=>navFn(user.id)}>Edit</button>
                                              </div>
                                              <div className="col-3">
                                                <button type="button" className="btn btn-danger">Delete</button>
                                              </div>
                                            </div>
                                        </td>
                                    </tr>
                                  )
                    }
                </tbody>
            </table>
            ) : (
                <p>No data</p>
            )}
            
        </div>
    </div>
);
}
export default AdminDashBoard;