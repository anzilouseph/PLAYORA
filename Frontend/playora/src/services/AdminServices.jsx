import axios from "axios";


    // Helper function to get headers with token if available
    const getHeaders = () => {
        const token = localStorage.getItem('accessToken');
        return {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
        };
    };

    const url="https://localhost:7257"


    const AdminServices =
    {
        getAllUser:async()=>
        {
            try
            {
                const response = await axios.get(`${url}/api/AdminManagement/get-all-user`,getHeaders());
                return response.data;
            }
            catch(error)
            {
                throw error;
            }
        }
    }
    export default AdminServices;