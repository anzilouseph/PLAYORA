import { useState } from "react";
import { useForm } from "react-hook-form";
import CommonServices from "../../services/ComonServices";
import { useNavigate } from "react-router-dom";

const LoginComponent=()=>
{
    const [loading,setLoading] = useState(false);
    const {register,handleSubmit,formState :{errors}} = useForm();
    const [errorMessage,setErrorMessage] = useState();
    const nav = useNavigate();

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
                        console.log("logged in userdata",response2.data)
                        if(response2.data.roleName==="admin")
                        {
                        alert(response2.data.roleName);
                        }
                        else if(response2.data.roleName==="turf") 
                        {
                        alert(response2.data.roleName);
                        }
                        else 
                        {
                         alert(response2.data.roleName);
                        }
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

    const handleUserSignup=()=>
    {
        nav("");
    }
    const handleTurfSignup =()=>
    {
        nav("");
    }

    return(
        <div className="container " style={{height:600,backgroundColor:"black"}}>
                                                                                                        {/* this dv is only for the signup  */}
                                                                                                    <div className="position-absolute top-0 end-0 p-3">
                                                                                                            <div className="d-flex gap-3">
                                                                                                                <button 
                                                                                                                    onClick={handleUserSignup}
                                                                                                                    style={{
                                                                                                                        backgroundColor: 'transparent',
                                                                                                                        border: 'none',
                                                                                                                        color: '#0d6efd',
                                                                                                                        cursor: 'pointer',
                                                                                                                        fontSize: '14px',
                                                                                                                        fontWeight: '500',
                                                                                                                        textDecoration: 'none',
                                                                                                                        transition: 'all 0.3s ease',
                                                                                                                        padding: '5px 10px',
                                                                                                                        borderRadius: '4px'
                                                                                                                    }}
                                                                                                                    onMouseEnter={(e) => {
                                                                                                                        e.target.style.textDecoration = 'underline';
                                                                                                                        e.target.style.color = '#0a58ca';
                                                                                                                        e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
                                                                                                                    }}
                                                                                                                    onMouseLeave={(e) => {
                                                                                                                        e.target.style.textDecoration = 'none';
                                                                                                                        e.target.style.color = '#0d6efd';
                                                                                                                        e.target.style.backgroundColor = 'transparent';
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Sign Up as User
                                                                                                                </button>
                                                                                                                
                                                                                                                <button 
                                                                                                                    onClick={handleTurfSignup}
                                                                                                                    style={{
                                                                                                                        backgroundColor: 'transparent',
                                                                                                                        border: 'none',
                                                                                                                        color: '#198754',
                                                                                                                        cursor: 'pointer',
                                                                                                                        fontSize: '14px',
                                                                                                                        fontWeight: '500',
                                                                                                                        textDecoration: 'none',
                                                                                                                        transition: 'all 0.3s ease',
                                                                                                                        padding: '5px 10px',
                                                                                                                        borderRadius: '4px'
                                                                                                                    }}
                                                                                                                    onMouseEnter={(e) => {
                                                                                                                        e.target.style.textDecoration = 'underline';
                                                                                                                        e.target.style.color = '#146c43';
                                                                                                                        e.target.style.backgroundColor = 'rgba(25, 135, 84, 0.1)';
                                                                                                                    }}
                                                                                                                    onMouseLeave={(e) => {
                                                                                                                        e.target.style.textDecoration = 'none';
                                                                                                                        e.target.style.color = '#198754';
                                                                                                                        e.target.style.backgroundColor = 'transparent';
                                                                                                                    }}
                                                                                                                >
                                                                                                                    Sign Up as Turf
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </div>










            <div className="row  justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit(onFinish)}>
                        <div className="card" style={{marginTop:150}}>
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