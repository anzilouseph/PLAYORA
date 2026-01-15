import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AdminServices from '../../../services/AdminServices';
import { message } from 'antd';

const GetUserByIdAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize react-hook-form
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      nameOfUser: '',
      ageOfUser: '',
      addressOfUser: '',
      emailOfUser: '',
      roleOfUser: ''
    }
  });

  // Fetch user data on component mount
  useEffect(() => {
    getUserByAdmin();
  }, [id]);

  const getUserByAdmin = async () => {
    try {
      setLoading(true);
      const response = await AdminServices.getByIdForAdmin(id);
      
      if (response.status) {
        const userData = {
          nameOfUser: response.data.nameOfUser || '',
          ageOfUser: response.data.ageOfUser || '',
          addressOfUser: response.data.addressOfUser || '',
          emailOfUser: response.data.emailOfUser || '',
          roleOfUser: response.data.roleOfUser || ''
        };
        
        setOriginalData(userData);
        reset(userData);
        setErrorMessage('');
      } else {
        setErrorMessage(response.message);
        message.error(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred');
      message.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission in edit mode
  const onSubmit = async (data) => {
    if (!isEditMode) return; // Don't submit if not in edit mode
    
    try {
      console.log("Updating data", data);
      
      const updateData = {
        nameOfUser: data.nameOfUser || "",
        ageOfUser: data.ageOfUser || "",
        addressOfUser: data.addressOfUser || "",
        emailOfUser: data.emailOfUser || "",
        roleOfUser: data.roleOfUser || ""
      };
      
      const response = await AdminServices.updateUserByAdmin(updateData, id);
      
      if (response.status) {
        message.success(response.message);
        // Update original data with new data
        setOriginalData(updateData);
        // Switch back to read-only mode
        setIsEditMode(false);
        // Refresh the data
        await getUserByAdmin();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log("Catch block error", error);
      message.error(error.message || "Update failed");
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // Handle clear button - reset form to original values but stay in edit mode
  const handleClear = () => {
    reset(originalData);
  };

  // Handle cancel button - go back to read-only mode without saving
  const handleCancel = () => {
    reset(originalData);
    setIsEditMode(false);
  };

  // Handle Go Back to list
  const handleGoBackToList = () => {
    navigate('/getAllUser');
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center bg-success py-5">
        <div className="col-12 col-md-10 col-lg-8 d-flex justify-content-center">
          <div className="card shadow-lg border-0 w-100 bg-light">
            <div className="card-header bg-primary text-center text-white d-flex justify-content-between align-items-center">
              <h2 className="mb-0">USER DETAILS</h2>
              {!isEditMode && (
                <button 
                  className="btn btn-warning"
                  onClick={handleEditClick}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  EDIT
                </button>
              )}
            </div>
            
            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-12 col-md-3 col-form-label">
                    FULL NAME:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="text"
                      className={`form-control ${errors.nameOfUser ? 'is-invalid' : ''}`}
                      id="name"
                      {...register("nameOfUser", { 
                        required: "Name is required",
                        disabled: !isEditMode
                      })}
                      readOnly={!isEditMode}
                    />
                    {errors.nameOfUser && (
                      <div className="invalid-feedback d-block">
                        {errors.nameOfUser.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Age */}
                <div className="mb-3 row">
                  <label htmlFor="age" className="col-12 col-md-3 col-form-label">
                    AGE:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="number"
                      className={`form-control ${errors.ageOfUser ? 'is-invalid' : ''}`}
                      id="age"
                      {...register("ageOfUser", { 
                        required: "Age is required",
                        min: { value: 1, message: "Age must be at least 1" },
                        max: { value: 120, message: "Age must be at most 120" },
                        disabled: !isEditMode
                      })}
                      readOnly={!isEditMode}
                    />
                    {errors.ageOfUser && (
                      <div className="invalid-feedback d-block">
                        {errors.ageOfUser.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mb-3 row">
                  <label htmlFor="address" className="col-12 col-md-3 col-form-label">
                    ADDRESS:
                  </label>
                  <div className="col-12 col-md-9">
                    <textarea
                      className={`form-control ${errors.addressOfUser ? 'is-invalid' : ''}`}
                      id="address"
                      {...register("addressOfUser", { 
                        required: "Address is required",
                        disabled: !isEditMode
                      })}
                      readOnly={!isEditMode}
                      rows="3"
                    />
                    {errors.addressOfUser && (
                      <div className="invalid-feedback d-block">
                        {errors.addressOfUser.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-12 col-md-3 col-form-label">
                    EMAIL:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="email"
                      className={`form-control ${errors.emailOfUser ? 'is-invalid' : ''}`}
                      id="email"
                      {...register("emailOfUser", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        },
                        disabled: !isEditMode
                      })}
                      readOnly={!isEditMode}
                    />
                    {errors.emailOfUser && (
                      <div className="invalid-feedback d-block">
                        {errors.emailOfUser.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="mb-3 row">
                  <label htmlFor="role" className="col-12 col-md-3 col-form-label">
                    ROLE:
                  </label>
                  <div className="col-12 col-md-9">
                    <input
                      type="text"
                      className={`form-control ${errors.roleOfUser ? 'is-invalid' : ''}`}
                      id="role"
                      {...register("roleOfUser", { 
                        required: "Role is required",
                        disabled: !isEditMode
                      })}
                      readOnly={!isEditMode}
                    />
                    {errors.roleOfUser && (
                      <div className="invalid-feedback d-block">
                        {errors.roleOfUser.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="row d-flex justify-content-evenly mt-4">
                  {!isEditMode ? (
                    // Read-only mode buttons
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-secondary btn-lg"
                        onClick={handleGoBackToList}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        GO BACK
                      </button>
                    </div>
                  ) : (
                    // Edit mode buttons (3 buttons)
                    <>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-warning btn-lg"
                          onClick={handleClear}
                          disabled={!isDirty}
                        >
                          <i className="bi bi-eraser me-2"></i>
                          CLEAR
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                          onClick={handleCancel}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          CANCEL
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="submit"
                          className="btn btn-success btn-lg"
                          disabled={!isDirty}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          SAVE
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message Section */}
      {errorMessage && (
        <div className="container">
          <div className="row d-flex justify-content-center pt-5">
            <div className="col-auto text-center text-danger">
              <h1>{errorMessage}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUserByIdAdmin;