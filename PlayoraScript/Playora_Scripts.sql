-- 1) "UserLevel" TABLE

create table "UserLevel" 
	("UserLevelId" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"Name" varchar(200) not null,
	"Description" varchar(500),
	"IsDelete" bool default false
	);


-- 2) "User" TABLE (user is a builtin keyword so usermaster)

create table "UserMaster"
	("UserId" BIGINT GENERATED ALWAYS AS IDENTITY Primary key,
	"UserName" varchar (200) not null,
	"Mobile" varchar(200) not null unique,
	"Age" int ,
	"Email" varchar(500) not null unique,
	"ProfileUrl" varchar(650),
	"UserLevelId" bigint ,
	"IsDelete" bool default false,
		foreign key("UserLevelId") references "UserLevel" ("UserLevelId") on delete  cascade
	);


-- 3) "Role" Table

create table "Role"
	("RoleId" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"RoleName" varchar(200)  not null,
	"Description" varchar(500),
	"IsDelete" bool default false	
);


INSERT INTO "Role" ("RoleName", "Description")
VALUES
('User', 'Normal user who just loves to play'),
('Turf', 'The turf owner or turf entity'),
('Admin', 'System administrator');



--4) "Login" table

create table "Login"
	("LoginId" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"UserId" Bigint ,
	"Email" varchar(500) unique not null,
	"Password"  varchar(500) not null,
	"Salt" varchar(500)  not null,
	"RoleId" BIGINT,
	"IsDelete" bool Default false,
		foreign key ("RoleId") references "Role"  ("RoleId") on delete set null,
		foreign key ("Email") references "UserMaster" ("Email") on delete cascade,
	    foreign key ("UserId" )references "UserMaster" ("UserId") on delete  cascade
	);
