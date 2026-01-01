import { useState } from "react";
import { useForm } from "react-hook-form";
import CommonServices from "../../services/ComonServices";

const LoginComponent=()=>
{
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,formState :{errors}} = useForm();
    const [errorMessage,setErrorMessage] = useState();


    const onFinish =async(data)=>
    {
        setLoading(true);
        try
        {
            const response = await CommonServices.login(data);
            console.log("resposen",response)
            if(response.success)
            {
                localStorage.setItem("accessToken",response.data);
                console.log("accessToken",response.data);
                try
                {
                    const response2  = await CommonServices.getOwnData(response.data);
                    if(response2.success)
                    {
                        alert(response2.data.roleName);
                    }
                    else
                    {
                    setErrorMessage(response2.data.errorMessage);
                    alert(response2.data.errorMessage)
                    }
                }
                catch(error)
                {
                    setErrorMessage(response2.data.errorMessage);
                    alert(response2.data.errorMessage)
                }
            }
            else
            {
                setErrorMessage(response.data.errorMessage);
                alert(response.data.errorMessage)
            }
        }
        catch(error)
        {
            setErrorMessage(error);
            alert(error);
        }
        finally
        {
            setLoading(false);
        }
    }

    return();
}