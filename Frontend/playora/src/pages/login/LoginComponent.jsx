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
        console.log("inputed data",data);
        const loginData = {
                            "email":data.Email,
                            "password":data.Password
                          }
        console.log("Login data",loginData);
        setLoading(true);
        try
        {
            const response = await CommonServices.login(loginData);
            console.log("resposen",response)
            if(response.status)
            {
                localStorage.setItem("accessToken",response.data);
                console.log("accessToken",response.data);
                try
                {
                    const response2  = await CommonServices.getOwnData(response.data);
                    if(response2.status)
                    {
                        alert(response2.data.roleName);
                    }
                    else
                    {
                    setErrorMessage(response2.data.errorMessage);
                    alert(errorMessage);
                    }
                }
                catch(error)
                {
                    setErrorMessage(error);
                    alert(error);
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

    return(
        <div className="container bg-secondary " style={{height:600}}>
            <div className="row  justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit(onFinish)}>
                        <div className="card">
                            <div className="card-header bg-success text-center ht-5">
                                <h3 style={{color:'white'}}>LOGIN</h3>
                            </div>
                            <div className="card-body bg-primary">
                                <div className="row mt-2">
                                    <div className="col-3 d-flex align-items-center">
                                        <label className="form-label justify-content-end" style={{fontWeight:"bold"}}>EMAIL : </label>
                                    </div>
                                    <div className="col-9">
                                        <input type="email" placeholder="Email"  className="form-control" 
                                        {
                                            ...register ("Email",{required:true,pattern:{
                                                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                                                            message: "Invalid email format"
                                                                                        }
                                                                }
                                                        )
                                        }
                                        />
                                        {errors.Email && ( <div className="invalid-feedback d-block">
                                                            {errors.Email.message}
                                                            </div>)}
                                    </div>
                                </div>
                                <div className="row  d-flex mt-2">
                                    <div className="col-3 align-items-center">
                                            <label className="form-label" style={{fontWeight:"bold"}}>
                                                PASSWORD :
                                            </label>
                                    </div>
                                    <div className="col-9">
                                        <input className="form-control" placeholder="Password" type="password" 
                                        {
                                            ...register("Password",{required:true})
                                        }
                                        />
                                        {errors.Password && (
                                                                <div className="invalid-feedback d-block">
                                                                    {errors.Password.message}
                                                                </div>
                                                            )
                                        }
                                    </div>                             
                                </div>

                                <div className="row d-flex ">
                                    <div className="col-3">
                                    </div>

                                    <div className="col-6 mt-4" style={{marginLeft: '80px'}}>
                                        <button type="submit" className="btn  btn-success">
                                            
                                            {loading?(
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Logging in...
                                                        </>
                                                      ) :
                                                      "Login"
                                            }

                                        </button>

                                        {/* or
                                        <button 
                                            type="button" 
                                            className="btn btn-lg btn-outline-success" 
                                            onClick={() => {
                                                // Get form data and submit
                                                handleSubmit(onFinish)();
                                                // OR: handleSubmit((data) => onFinish(data))();
                                            }}
                                        >
                                            Login
                                        </button> */}

                                        
                                    </div>
                                    <div className="col-3">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginComponent;