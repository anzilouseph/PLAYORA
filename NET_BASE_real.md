Install-Package Microsoft.EntityFrameworkCore -Version 8.0.0

Install-Package Microsoft.EntityFrameworkCore.Design -Version 8.0.0

Install-Package Microsoft.EntityFrameworkCore.Tools -Version 8.0.0

Install-Package Npgsql.EntityFrameworkCore.PostgreSQL -Version 8.0.0







DATABASE\_CONTEXT







using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore.Storage;

using Npgsql.Replication.PgOutput.Messages;

using Playora.Entity;





namespace Playora.Context

{

&nbsp;   public class AppDbContext : DbContext

&nbsp;   {

&nbsp;       private IDbContextTransaction \_transaction;

&nbsp;       public AppDbContext(IDbContextTransaction transaction)

&nbsp;       {

&nbsp;           \_transaction = transaction;

&nbsp;       }

&nbsp;       public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }



&nbsp;       public DbSet<UserMaster> Users { get; set; }



&nbsp;       public DbSet<UserLevel> Levels { get; set; }



&nbsp;       public DbSet<Role> Roles { get; set; }



&nbsp;       public DbSet<Login> Logins { get; set; }

&nbsp;           

&nbsp;       protected  override void OnModelCreating(ModelBuilder modelBuilder)

&nbsp;       {

&nbsp;           modelBuilder.Entity<UserMaster>(entity => entity.HasKey(entity => entity.UserId));

&nbsp;           modelBuilder.Entity<UserLevel>(entity=>entity.HasKey(e=>e.UserLevelId));

&nbsp;           modelBuilder.Entity<Role>(entity=>entity.HasKey(e=>e.RoleId));

&nbsp;           modelBuilder.Entity<Login>(entity => entity.HasKey(e => e.LoginId));











&nbsp;       }



&nbsp;       public async Task CreateTransactionAsync()

&nbsp;       {

&nbsp;           if (\_transaction != null)

&nbsp;           {

&nbsp;               return;

&nbsp;           }



&nbsp;           \_transaction = await Database.BeginTransactionAsync();

&nbsp;       }



&nbsp;       public async Task CommitTransactionAsync()

&nbsp;       {

&nbsp;           try

&nbsp;           {

&nbsp;               await \_transaction.CommitAsync();

&nbsp;           } 

&nbsp;           catch {

&nbsp;               await RollbackTransactionAsync();

&nbsp;               throw;

&nbsp;           }

&nbsp;           finally

&nbsp;           {

&nbsp;               if (\_transaction != null)

&nbsp;               {

&nbsp;                   await \_transaction.DisposeAsync();

&nbsp;                   \_transaction = null;

&nbsp;               }

&nbsp;           }



&nbsp;       }



&nbsp;       public async Task RollbackTransactionAsync()

&nbsp;       {

&nbsp;           try

&nbsp;           {

&nbsp;               await \_transaction?.RollbackAsync();

&nbsp;           }

&nbsp;           finally

&nbsp;           {

&nbsp;               if (\_transaction != null)

&nbsp;               {

&nbsp;                   await \_transaction.DisposeAsync();

&nbsp;                   \_transaction = null;

&nbsp;               }

&nbsp;           }

&nbsp;       }

&nbsp;       public bool HasActiveTransaction => \_transaction != null;





&nbsp;   }

}









APPSETTINGS 







{

&nbsp; "Logging": {

&nbsp;   "LogLevel": {

&nbsp;     "Default": "Information",

&nbsp;     "Microsoft.AspNetCore": "Warning"

&nbsp;   }

&nbsp; },

&nbsp; "ConnectionStrings": { "DefaultConnection": "Server=DESKTOP-RH6IR22\\\\SQLEXPRESS2019;Database=library\_management;Trusted\_Connection=True;Encrypt=False;" },



&nbsp; "AllowedHosts": "\*",



&nbsp; "JwtConfig": {

&nbsp;   "Issuer": "LibraryManagementSystem",

&nbsp;   "Audience": "LibraryManagementSystem",

&nbsp;   "Key": "Yh2k7QSu4l8CZg5p6X3Pna9L0Miy4D3Bvt0JVr87UcOj69Kqw5R2Nmf4FWs03Hdx"

&nbsp; }

}









PROGRAM.CS



using Microsoft.EntityFrameworkCore;

using Playora.Context;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;

using System.Text;

using Playora.IRepository;

using Playora.Repository;

using Playora.Utility;





var builder = WebApplication.CreateBuilder(args);



builder.Services.AddCors(options =>

{

&nbsp;   options.AddPolicy("AllowAnyOrigin",policy =>

&nbsp;   {

&nbsp;       policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

&nbsp;   });

});



// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefailtConnection")));

builder.Services.AddAutoMapper(typeof(MapperClass));   //Install-Package AutoMapper -Version 12.0.1  

//Install-Package  AutoMapper.Extensions.Microsoft.DependencyInjection -Version 12.0.1 

builder.Services.AddScoped<IAuthenticationManagementRepo, AuthenticationManagementRepo>();

builder.Services.AddScoped<IUserManagementRepo, UserManagementRepo>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();

// Configure Swagger with JWT Support

builder.Services.AddSwaggerGen(c =>

{

&nbsp;   c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "HMS", Version = "v1" });

&nbsp;   c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme

&nbsp;   {

&nbsp;       Name = "Authorization",

&nbsp;       Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,

&nbsp;       Scheme = "Bearer",

&nbsp;       BearerFormat = "JWT",

&nbsp;       In = Microsoft.OpenApi.Models.ParameterLocation.Header,

&nbsp;       Description = "Enter 'Bearer' \[space] and then your valid token in the text input below.\\n\\nExample: \\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\\""

&nbsp;   });

&nbsp;   c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement

&nbsp;   {

&nbsp;       {

&nbsp;           new Microsoft.OpenApi.Models.OpenApiSecurityScheme

&nbsp;           {

&nbsp;               Reference = new Microsoft.OpenApi.Models.OpenApiReference

&nbsp;               {

&nbsp;                   Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,

&nbsp;                   Id = "Bearer"

&nbsp;               }

&nbsp;           },

&nbsp;           new string\[] {}

&nbsp;       }

&nbsp;   });





});







// Configure JWT Authentication

builder.Services.AddAuthentication(options =>

{

&nbsp;   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

&nbsp;   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

&nbsp;   options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;



}



&nbsp;   )

&nbsp;   .AddJwtBearer(options =>

&nbsp;   {

&nbsp;       options.RequireHttpsMetadata = false; // Set to true in production

&nbsp;       options.SaveToken = true;

&nbsp;       options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters

&nbsp;       {

&nbsp;           ValidateIssuer = true,

&nbsp;           ValidateAudience = true,

&nbsp;           ValidateLifetime = true,

&nbsp;           ValidateIssuerSigningKey = true,



&nbsp;           ValidIssuer = builder.Configuration\["JWTConfig:Issuer"],

&nbsp;           ValidAudience = builder.Configuration\["JWTConfig:Audience"],

&nbsp;           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration\["JWTConfig:Key"]!))

&nbsp;       };

&nbsp;   });







builder.Services.AddAuthorization();







var app = builder.Build();



// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())

{

&nbsp;   app.UseSwagger();

&nbsp;   app.UseSwaggerUI();

}



app.UseHttpsRedirection();



app.UseCors("AllowAnyOrgin");



app.UseAuthentication();



app.UseAuthorization();



app.MapControllers();



app.Run();













AUTOMAPPER





using AutoMapper;

using Playora.Entity;

using Playora.Dto;



namespace Playora.Utility

{

&nbsp;   public class MapperClass : Profile

&nbsp;   {

&nbsp;       public MapperClass()

&nbsp;       {

&nbsp;           CreateMap<UserMaster,UserForCreationDto > ();

&nbsp;           CreateMap<UserForCreationDto, UserMaster>();

&nbsp;       }

&nbsp;   }

}









APIHELPER



namespace Playora.Utility

{

&nbsp;   public class ApiHelper<T>

&nbsp;   {

&nbsp;       public ApiHelper(T data, string errorMessage, bool status)

&nbsp;       {

&nbsp;           this.data = data;

&nbsp;           this.errorMessage = errorMessage;

&nbsp;           Status = status;

&nbsp;       }



&nbsp;       public T data { get; set; }

&nbsp;       public string errorMessage { get; set; }

&nbsp;       public bool Status {  get; set; }



&nbsp;     

&nbsp;       public static ApiHelper<T> Error(string message)

&nbsp;       {

&nbsp;           return new ApiHelper<T>(default, message, false);

&nbsp;       }



&nbsp;       public static ApiHelper<T> Success (T data,string message)

&nbsp;       {

&nbsp;           return new ApiHelper<T>(data, message, true);

&nbsp;       }

&nbsp;   }

}











































REACT BASICS





npx create-react-app

npm install react-router-dom

npm install axios

npm install react-hook-form

npm install bootstrap   :=>  import 'bootstrap/dist/css/bootstrap.min.css'







1)App.js      --npm install  react-router-dom



import logo from './logo.svg';

import './App.css';

import { BrowserRouter } from 'react-router-dom';

import RouteFile from './routes/RouteFile';



function App() {

&nbsp; return (

&nbsp;   <div className="App">

&nbsp;     <header className="App-header">

&nbsp;      <BrowserRouter>  			--these 3 lines imp

&nbsp;        <RouteFile/>

&nbsp;      </BrowserRouter>

&nbsp;     </header>

&nbsp;   </div>

&nbsp; );

}



export default App;













2)Routing jsx









import React from "react";

import { Route,Routes,Navigate } from 'react-router-dom'

import UserRegisration from "./Components/RegistrationComponent/UserRegisration";

import AdminLayout from "./Components/AdminComponent/AdminLayoutComponent/AdminLayoutComponent";

import LoginComponent from "./Components/LoginComponent/LoginComponent";

import AdminDashboard from "./Components/AdminComponent/AdminDashboardComponent/AdminDashboard";

import GetAllUsers from "./Components/AdminComponent/AdminUserComponent/ListAllUsers/GetAllUsers";

import GetUserById from "./Components/AdminComponent/AdminUserComponent/GetUserById/GetUserById";

import GetAllBooks from "./Components/AdminComponent/AdminBookManagement/GetAllBooks/GetAllBooks";

import GetBookById from "./Components/AdminComponent/AdminBookManagement/GetBookById/GetBookById";

export default function ForRouting() {

&nbsp; return (

&nbsp;   <div>

&nbsp;     <Routes>



&nbsp;       <Route path="/" element={<LoginComponent/>}/>

&nbsp;       <Route path="userRegistration" element={<UserRegisration/>}/>



&nbsp;       {/\* this is the admin part \*/}

&nbsp;       <Route path="adminLayout" element={<AdminLayout/>}>       --VERY IMPLY THEIR IS NO "/" THATS WHY BELOW ROUTES CMES UNDER IT



&nbsp;           {/\* Default route inside AdminLayout \*/}

&nbsp;           <Route index element={<AdminDashboard/>}/>

&nbsp;           <Route path="adminDashboard" element={<AdminDashboard/>}/>

&nbsp;           <Route  path="getAllUsers" element={<GetAllUsers/>}/>

&nbsp;           <Route path="getUserById/:id" element={<GetUserById/>}/>

&nbsp;           <Route path="getAllBooks" element={<GetAllBooks/>}/>

&nbsp;           <Route path="getBookById/:id" element={<GetBookById/>}/>

&nbsp;       </Route>







&nbsp;     </Routes>

&nbsp;   </div>

&nbsp; )

}









3)Service           --npm install axios



import axios from "axios";





&nbsp;   // Helper function to get headers with token if available

&nbsp;   const getHeaders = () => {

&nbsp;       const token = localStorage.getItem('accessToken');

&nbsp;       return {

&nbsp;       headers: {

&nbsp;           'Authorization': `Bearer ${token}`,

&nbsp;       }

&nbsp;       };

&nbsp;   };





const CommonServices = 

{

&nbsp; login:async(data)=>

&nbsp;       {

&nbsp;           try{

&nbsp;               const response = await axios.post(`https://localhost:7097/api/AuthenticationManagementController/login`,data,);

&nbsp;               return response.data;

&nbsp;           }

&nbsp;           catch(error)

&nbsp;           {

&nbsp;               throw(error);

&nbsp;           }

&nbsp;       },



&nbsp;   getAllUser:async()=>

&nbsp;   {

&nbsp;       try{

&nbsp;           const response = await axios.get(`https://localhost:7097/api/AdminManagementController/get-all-employees`);

&nbsp;           return response.data;

&nbsp;       }

&nbsp;       catch(error)

&nbsp;       {

&nbsp;           throw(error);

&nbsp;       }

&nbsp;   },

&nbsp;   getOwnData :async()=>

&nbsp;   {

&nbsp;       try{

&nbsp;           const response = await axios.get(`https://localhost:7097/api/EmployeeManagement/get-own-profile`,getHeaders());

&nbsp;           return response.data;

&nbsp;       }

&nbsp;       catch(error)

&nbsp;       {

&nbsp;           throw (error);

&nbsp;       }

&nbsp;   }

}



export default CommonServices;















4)Login Componenet





import { useState } from "react";

import { useForm } from "react-hook-form";

import CommonServices from "../../services/ComonServices";

import { useNavigate } from "react-router-dom";



const LoginComponent=()=>

{

&nbsp;   const \[loading,setLoading] = useState(false);

&nbsp;   const {register,handleSubmit,formState :{errors}} = useForm();

&nbsp;   const \[errorMessage,setErrorMessage] = useState();

&nbsp;   const nav = useNavigate();



&nbsp;   const onFinish =async(data)=>

&nbsp;   {

&nbsp;       console.log("inputed data",data);

&nbsp;       const loginData = {

&nbsp;                           "email":data.Email,

&nbsp;                           "password":data.Password

&nbsp;                         }

&nbsp;       console.log("Login data",loginData);

&nbsp;       setLoading(true);

&nbsp;       try

&nbsp;       {

&nbsp;           const response = await CommonServices.login(loginData);

&nbsp;           console.log("resposen",response)

&nbsp;           if(response.status)

&nbsp;           {

&nbsp;               localStorage.setItem("accessToken",response.data);

&nbsp;               console.log("accessToken",response.data);

&nbsp;               try

&nbsp;               {

&nbsp;                   const response2  = await CommonServices.getOwnData(response.data);

&nbsp;                   if(response2.status)

&nbsp;                   {

&nbsp;                       console.log("logged in userdata",response2.data)

&nbsp;                       if(response2.data.roleName==="admin")

&nbsp;                       {

&nbsp;                       alert(response2.data.roleName);

&nbsp;                       }

&nbsp;                       else if(response2.data.roleName==="turf") 

&nbsp;                       {

&nbsp;                       alert(response2.data.roleName);

&nbsp;                       }

&nbsp;                       else 

&nbsp;                       {

&nbsp;                        alert(response2.data.roleName);

&nbsp;                       }

&nbsp;                   }

&nbsp;                   else

&nbsp;                   {

&nbsp;                   setErrorMessage(response2.data.errorMessage);

&nbsp;                   alert(errorMessage);

&nbsp;                   }

&nbsp;               }

&nbsp;               catch(error)

&nbsp;               {

&nbsp;                   setErrorMessage(error);

&nbsp;                   alert(error);

&nbsp;               }

&nbsp;           }

&nbsp;           else

&nbsp;           {

&nbsp;               setErrorMessage(response.data.errorMessage);

&nbsp;               alert(response.data.errorMessage)

&nbsp;           }

&nbsp;       }

&nbsp;       catch(error)

&nbsp;       {

&nbsp;           setErrorMessage(error);

&nbsp;           alert(error);

&nbsp;       }

&nbsp;       finally

&nbsp;       {

&nbsp;           setLoading(false);

&nbsp;       }

&nbsp;   }



&nbsp;   const handleUserSignup=()=>

&nbsp;   {

&nbsp;       nav("");

&nbsp;   }

&nbsp;   const handleTurfSignup =()=>

&nbsp;   {

&nbsp;       nav("");

&nbsp;   }



&nbsp;   return(

&nbsp;       <div className="container " style={{height:600,backgroundColor:"black"}}>

&nbsp;                                                                                                       {/\* this dv is only for the signup  \*/}

&nbsp;                                                                                                   <div className="position-absolute top-0 end-0 p-3">

&nbsp;                                                                                                           <div className="d-flex gap-3">

&nbsp;                                                                                                               <button 

&nbsp;                                                                                                                   onClick={handleUserSignup}

&nbsp;                                                                                                                   style={{

&nbsp;                                                                                                                       backgroundColor: 'transparent',

&nbsp;                                                                                                                       border: 'none',

&nbsp;                                                                                                                       color: '#0d6efd',

&nbsp;                                                                                                                       cursor: 'pointer',

&nbsp;                                                                                                                       fontSize: '14px',

&nbsp;                                                                                                                       fontWeight: '500',

&nbsp;                                                                                                                       textDecoration: 'none',

&nbsp;                                                                                                                       transition: 'all 0.3s ease',

&nbsp;                                                                                                                       padding: '5px 10px',

&nbsp;                                                                                                                       borderRadius: '4px'

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                                   onMouseEnter={(e) => {

&nbsp;                                                                                                                       e.target.style.textDecoration = 'underline';

&nbsp;                                                                                                                       e.target.style.color = '#0a58ca';

&nbsp;                                                                                                                       e.target.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                                   onMouseLeave={(e) => {

&nbsp;                                                                                                                       e.target.style.textDecoration = 'none';

&nbsp;                                                                                                                       e.target.style.color = '#0d6efd';

&nbsp;                                                                                                                       e.target.style.backgroundColor = 'transparent';

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                               >

&nbsp;                                                                                                                   Sign Up as User

&nbsp;                                                                                                               </button>

&nbsp;                                                                                                               

&nbsp;                                                                                                               <button 

&nbsp;                                                                                                                   onClick={handleTurfSignup}

&nbsp;                                                                                                                   style={{

&nbsp;                                                                                                                       backgroundColor: 'transparent',

&nbsp;                                                                                                                       border: 'none',

&nbsp;                                                                                                                       color: '#198754',

&nbsp;                                                                                                                       cursor: 'pointer',

&nbsp;                                                                                                                       fontSize: '14px',

&nbsp;                                                                                                                       fontWeight: '500',

&nbsp;                                                                                                                       textDecoration: 'none',

&nbsp;                                                                                                                       transition: 'all 0.3s ease',

&nbsp;                                                                                                                       padding: '5px 10px',

&nbsp;                                                                                                                       borderRadius: '4px'

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                                   onMouseEnter={(e) => {

&nbsp;                                                                                                                       e.target.style.textDecoration = 'underline';

&nbsp;                                                                                                                       e.target.style.color = '#146c43';

&nbsp;                                                                                                                       e.target.style.backgroundColor = 'rgba(25, 135, 84, 0.1)';

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                                   onMouseLeave={(e) => {

&nbsp;                                                                                                                       e.target.style.textDecoration = 'none';

&nbsp;                                                                                                                       e.target.style.color = '#198754';

&nbsp;                                                                                                                       e.target.style.backgroundColor = 'transparent';

&nbsp;                                                                                                                   }}

&nbsp;                                                                                                               >

&nbsp;                                                                                                                   Sign Up as Turf

&nbsp;                                                                                                               </button>

&nbsp;                                                                                                           </div>

&nbsp;                                                                                                       </div>





















&nbsp;           <div className="row  justify-content-center">

&nbsp;               <div className="col-lg-6">

&nbsp;                   <form onSubmit={handleSubmit(onFinish)}>

&nbsp;                       <div className="card" style={{marginTop:150}}>

&nbsp;                           <div className="card-header bg-success text-center ht-5">

&nbsp;                               <h3 style={{color:'white'}}>LOGIN</h3>

&nbsp;                           </div>

&nbsp;                           <div className="card-body bg-primary">

&nbsp;                               <div className="row mt-2">

&nbsp;                                   <div className="col-3 d-flex align-items-center">

&nbsp;                                       <label className="form-label justify-content-end" style={{fontWeight:"bold"}}>EMAIL : </label>

&nbsp;                                   </div>

&nbsp;                                   <div className="col-9">

&nbsp;                                       <input type="email" placeholder="Email"  className="form-control" 

&nbsp;                                       {

&nbsp;                                           ...register ("Email",{required:true,pattern:{

&nbsp;                                                                                           value: /^\[a-zA-Z0-9.\_%+-]+@\[a-zA-Z0-9.-]+\\.\[a-zA-Z]{2,}$/,

&nbsp;                                                                                           message: "Invalid email format"

&nbsp;                                                                                       }

&nbsp;                                                               }

&nbsp;                                                       )

&nbsp;                                       }

&nbsp;                                       />

&nbsp;                                       {errors.Email \&\& ( <div className="invalid-feedback d-block">

&nbsp;                                                           {errors.Email.message}

&nbsp;                                                           </div>)}

&nbsp;                                   </div>

&nbsp;                               </div>

&nbsp;                               <div className="row  d-flex mt-2">

&nbsp;                                   <div className="col-3 align-items-center">

&nbsp;                                           <label className="form-label" style={{fontWeight:"bold"}}>

&nbsp;                                               PASSWORD :

&nbsp;                                           </label>

&nbsp;                                   </div>

&nbsp;                                   <div className="col-9">

&nbsp;                                       <input className="form-control" placeholder="Password" type="password" 

&nbsp;                                       {

&nbsp;                                           ...register("Password",{required:true})

&nbsp;                                       }

&nbsp;                                       />

&nbsp;                                       {errors.Password \&\& (

&nbsp;                                                               <div className="invalid-feedback d-block">

&nbsp;                                                                   {errors.Password.message}

&nbsp;                                                               </div>

&nbsp;                                                           )

&nbsp;                                       }

&nbsp;                                   </div>                             

&nbsp;                               </div>



&nbsp;                               <div className="row d-flex ">

&nbsp;                                   <div className="col-3">

&nbsp;                                   </div>



&nbsp;                                   <div className="col-6 mt-4" style={{marginLeft: '80px'}}>

&nbsp;                                       <button type="submit" className="btn  btn-success">

&nbsp;                                           

&nbsp;                                           {loading?(

&nbsp;                                                       <>

&nbsp;                                                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>

&nbsp;                                                           Logging in...

&nbsp;                                                       </>

&nbsp;                                                     ) :

&nbsp;                                                     "Login"

&nbsp;                                           }



&nbsp;                                       </button>



&nbsp;                                       {/\* or

&nbsp;                                       <button 

&nbsp;                                           type="button" 

&nbsp;                                           className="btn btn-lg btn-outline-success" 

&nbsp;                                           onClick={() => {

&nbsp;                                               // Get form data and submit

&nbsp;                                               handleSubmit(onFinish)();

&nbsp;                                               // OR: handleSubmit((data) => onFinish(data))();

&nbsp;                                           }}

&nbsp;                                       >

&nbsp;                                           Login

&nbsp;                                       </button> \*/}



&nbsp;                                       

&nbsp;                                   </div>

&nbsp;                                   <div className="col-3">

&nbsp;                                   </div>

&nbsp;                               </div>

&nbsp;                           </div>

&nbsp;                       </div>

&nbsp;                   </form>

&nbsp;               </div>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   );

}

export default LoginComponent;













ADMIN DASHBOARD COMPONENT





import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AdminServices from "../../../services/AdminServices";



const AdminDashBoard=()=>

{



&nbsp;   const \[userData,setUserData] = useState(\[]);

&nbsp;   const navigate = useNavigate();

&nbsp;   useEffect(()=>

&nbsp;       {

&nbsp;           getInitialData()

&nbsp;       }

&nbsp;       ,\[])



&nbsp;   const getInitialData=async()=>

&nbsp;   {

&nbsp;       try

&nbsp;       {

&nbsp;           const response =  await AdminServices.getAllUser();

&nbsp;           console.log("initial data loaded",response);

&nbsp;           if(response.status)

&nbsp;           {

&nbsp;           setUserData(response.data);

&nbsp;           }

&nbsp;           else

&nbsp;           {

&nbsp;               alert(response.data?.errorMessage || "failed ");

&nbsp;           }

&nbsp;       }

&nbsp;       catch(error)

&nbsp;       {

&nbsp;           alert(error.message ||"500");

&nbsp;       }

&nbsp;       

&nbsp;   }



&nbsp;   //for route to next page

&nbsp;   const navFn=(id)=>

&nbsp;   {

&nbsp;       navigate(`admin/getUserById/${id}`)

&nbsp;   };

return(

&nbsp;   <div className="container mt-4 row d-flex alihn-items-center">

&nbsp;       <div className="col-10">

&nbsp;           { userData ? (

&nbsp;           <table className="table">

&nbsp;               <thead>

&nbsp;                   <tr>

&nbsp;                       <th scope="col">SI.</th>

&nbsp;                       <th scope="col">Name</th>

&nbsp;                       <th scope="col">Mobile</th>

&nbsp;                       <th scope="col">Email</th>

&nbsp;                       <th scope="col">Action</th>

&nbsp;                   </tr>

&nbsp;               </thead>

&nbsp;               <tbody>

&nbsp;                   {userData.map((user,index)=>

&nbsp;                                   <tr key={user.id}>

&nbsp;                                       <td scope="col"> {index+1}</td>

&nbsp;                                       <td>{user.nameOfUser}</td>

&nbsp;                                       <td>{user.mobileOfUser}</td>

&nbsp;                                       <td>{user.emailOfUser}</td>

&nbsp;                                       <td>

&nbsp;                                           <div className="row d-flex">

&nbsp;                                             <div className="col-3">

&nbsp;                                             <button type="button" className="btn btn-primary" onClick={()=>navFn(user.id)}>Edit</button>

&nbsp;                                             </div>

&nbsp;                                           </div>

&nbsp;                                           <div className="col-3">

&nbsp;                                             <button type="button" className="btn btn-danger">Delete</button>

&nbsp;                                             </div>

&nbsp;                                       </td>

&nbsp;                                   </tr>

&nbsp;                                 )

&nbsp;                   }

&nbsp;               </tbody>

&nbsp;           </table>

&nbsp;           ) : (

&nbsp;               <p>No data</p>

&nbsp;           )}

&nbsp;           

&nbsp;       </div>

&nbsp;   </div>

);

}

export default AdminDashBoard;









		**IMP...**



**-> HERE we want to send or userdata that we get from the forloop to the next page where we show the card for show the user , we can do it as**



1. **pass the "id" in the url , then take that is by    :=>>     const id = useParams();**
1. 
**&nbsp;   the call the get api in teh useEffect**









2\) We already ge the whole data of the user form the forloop , when we navigate to th next page we will pass this whole data in a state



ie 

const navFn(user)

{

nav(`admin/getuserbyid/${user.id}  ,  {state : {userData = user}}

}





we can pass the data in a state with teh url those are taken using       "UseLocation"

ie

const location = useLocation();

console.log(location.pathname); // "/admin/getUserById/123"

console.log(location.search);   // "?name=john" (query params)  to get the query params here we ont have any query params





console.log(location.state);    // { userData: {...} } (passed state)  ours





3\)  Using props , but if we using propps we cant pass the data to a new url , if its a modal  then perfect but in our  case we uses new route so we cant pass data in props







