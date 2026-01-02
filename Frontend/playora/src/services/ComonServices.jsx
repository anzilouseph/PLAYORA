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

    const CommonServices =
    {
        login:async(data)=>
        {
            try{
                const response = await axios.post(`${url}/api/AuthenticationManagement/Login`,data);
                return response.data
            }
            catch(error)
            {
                throw(error);
            }
        },

        getOwnData:async()=>
        {
             try{
                const response = await axios.get(`${url}/api/UserManagement/get-own-profile`,getHeaders());
                return response.data
            }
            catch(error)
            {
                throw(error);
            }
        }
    }
    export default CommonServices;