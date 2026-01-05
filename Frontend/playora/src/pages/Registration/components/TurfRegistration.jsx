import { useState } from "react"
import { useForm } from "react-hook-form";

const TurfRegistration=()=>
{
    const [loading,setLoading]=useState(false);
    const {register,handleSubmit,form: {errors}} = useForm();



            return (
                <div className="container bg-secondary" style={{height: 800}}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card mt-3" style={{height: 700}}>
                                    <div className="card-header bg-primary">
                                    <h3 style={{fontWeight: "bold", color: 'white'}}>Register your Turf</h3>
                                    </div>
                                    <div className="card-body">
                                        
                                        {/* Turf Name */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">TURF NAME :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter Turf Name"
                                                    {...register("Name", {required: "Turf name is required"})}
                                                />
                                                {errors.Name && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Name.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">EMAIL :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Enter Email Address"
                                                    {...register("Email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                            message: "Invalid email format"
                                                        }
                                                    })}
                                                />
                                                {errors.Email && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Email.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">PASSWORD :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Enter Password"
                                                    {...register("Password", {
                                                        required: "Password is required",
                                                        minLength: {
                                                            value: 6,
                                                            message: "Password must be at least 6 characters"
                                                        }
                                                    })}
                                                />
                                                {errors.Password && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Password.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">CONFIRM PASSWORD :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    placeholder="Confirm Password"
                                                    {...register("ConfirmPassword", {
                                                        required: "Please confirm your password"
                                                    })}
                                                />
                                                {errors.ConfirmPassword && (
                                                    <div className="text-danger mt-1">
                                                        {errors.ConfirmPassword.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile Number */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">MOBILE NUMBER :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="tel" 
                                                    className="form-control" 
                                                    placeholder="Enter Mobile Number"
                                                    {...register("Mobile", {
                                                        required: "Mobile number is required",
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: "Enter a valid 10-digit mobile number"
                                                        }
                                                    })}
                                                />
                                                {errors.Mobile && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Mobile.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">ADDRESS :</label>
                                            </div>
                                            <div className="col-8">
                                                <textarea 
                                                    className="form-control" 
                                                    placeholder="Enter Complete Address"
                                                    rows="3"
                                                    {...register("Address", {
                                                        required: "Address is required",
                                                        minLength: {
                                                            value: 10,
                                                            message: "Address must be at least 10 characters"
                                                        }
                                                    })}
                                                ></textarea>
                                                {errors.Address && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Address.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">CITY :</label>
                                            </div>
                                            <div className="col-8">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter City"
                                                    {...register("City", {
                                                        required: "City is required"
                                                    })}
                                                />
                                                {errors.City && (
                                                    <div className="text-danger mt-1">
                                                        {errors.City.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="row d-flex mb-3">
                                            <div className="col-4 d-flex align-items-center">
                                                <label className="form-label fw-bold">DESCRIPTION :</label>
                                            </div>
                                            <div className="col-8">
                                                <textarea 
                                                    className="form-control" 
                                                    placeholder="Describe your turf facilities, size, features, etc."
                                                    rows="4"
                                                    {...register("Description", {
                                                        required: "Description is required",
                                                        minLength: {
                                                            value: 20,
                                                            message: "Description must be at least 20 characters"
                                                        },
                                                        maxLength: {
                                                            value: 500,
                                                            message: "Description cannot exceed 500 characters"
                                                        }
                                                    })}
                                                ></textarea>
                                                {errors.Description && (
                                                    <div className="text-danger mt-1">
                                                        {errors.Description.message}
                                                    </div>
                                                )}
                                                <small className="text-muted">Maximum 500 characters</small>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="row mt-4">
                                            <div className="col-12 text-center">
                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary btn-lg px-5"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Registering...
                                                        </>
                                                    ) : (
                                                        "REGISTER TURF"
                                                    )}
                                                </button>
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
export default  TurfRegistration;