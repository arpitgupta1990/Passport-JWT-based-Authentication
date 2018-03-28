# SYNOPSIS
It has basic functionality without any CORS security checks.
Authentication is done through JWT.
Some test cases are implemented using mocha.

# Get Started
## Installation
  For installing all packages use:
  `npm install`
  ####Notes: Please ensure that mongo server is running
## Running the development server
  `npm run dev`
## Running the tests
  `npm run test`
# REST API
Base URL: http://localhost:4000
### Register
  * URL<br />
    `/auth/register`<br />
    
  * Methods <br />
      POST <br />
      
  * Data Params <br />
      {
          "name":"arpit",
          "email": "arpit@gmail.com",
          "password": "1234567"
      }<br />
  * Success Response<br />
    Code: 201<br /> 
    Content: {
        "status": "success",
        "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVhYmI1MTYxMDUzOGYxMDk3Njg4MGJjMyI.
               6lvfCAKARRIMI7CPwyW9zn7W5e2GUxh1ComSxd6YNI"
      }<br />
  * Error Response<br />
      Code: 400 BAD REQUEST <br />
      Content: {
                "errors": "Name cannot be blank"
       }<br />
       OR <br />
       Code: 400 BAD REQUEST <br />
      Content: {
          "errors": "Email is not valid"
        }<br />
          OR<br />
      Code: 422 UNPROCESSABLE ENTRY 
      Content: {
                "error": "user already exist"
                }<br />
### Login
  * URL<br />
    `/auth/login`<br />
    
  * Methods <br />
      POST <br />
      
  * Data Params <br />
      {
          "email": "arpit@gmail.com",
          "password": "1234567"
      }<br />
  * Success Response<br />
    Code: 200<br /> 
    Content: {
        "status": "success",
        "token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVhYmI1MTYxMDUzOGYxMDk3Njg4MGJjMyI.
               6lvfCAKARRIMI7CPwyW9zn7W5e2GUxh1ComSxd6YNI"
      }<br />
  * Error Response<br />
      Code: 400 BAD REQUEST <br />
      Content: {
                "errors": "Invalid Password"
       }<br />
       OR <br />
       Code: 400 BAD REQUEST <br />
      Content: {
                "errors": "No User Exists"
       }<br />
       OR <br />
       Code: 400 BAD REQUEST <br />
      Content: {
          "errors": "Email is not valid"
        }<br />
          OR<br />
      Code: 422 UNPROCESSABLE ENTRY 
      Content: {
                "error": "user already exist"
                }<br />
   ### Create Activity
  * URL<br />
    `/account/activity`<br />
    
  * Methods <br />
      POST <br />
      
  * Data Params <br />
      {
 "name":"act1",
 "startTime": 1521962198817,
 "endTime": 1521962211090,
 "category": "hard"
}<br />
  * Header<br />
    Content-Type: application/json<br />
    Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVhYmI1MTYxMDUzOGYxMDk3Njg4MGJjMyI.6l-vfCAKARRIMI7CPwyW9zn7W5e2GUxh1ComSxd6YNI"<br />
  * Success Response<br />
    Code: 201<br /> 
    Content: {
    "category": "hard",
    "_id": "5abb56710538f10976880bc4",
    "name": "act2",
    "startTime": "2018-03-25T07:16:38.817Z",
    "endTime": "2018-03-25T07:16:51.090Z",
    "createdBy": "5abb51610538f10976880bc3",
    "__v": 0,
}<br />
  * Error Response<br />
      Code: 422 BAD REQUEST <br />
      Content: {
                "errors": "Activity validation failed: name: Activity is required"
       }<br />
       OR <br />
       Code: 401 BAD REQUEST <br />
      Content: Unauthorized<br />
  ### Get All List Of Activity
  * URL<br />
    `/account/activity`<br />
    
  * Methods <br />
      GET <br />
  * Header<br />
    Content-Type: application/json<br />
    Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjVhYmI1MTYxMDUzOGYxMDk3Njg4MGJjMyI.6l-vfCAKARRIMI7CPwyW9zn7W5e2GUxh1ComSxd6YNI"<br />
  * Success Response<br />
    Code: 200<br /> 
    Content: {
        "category": "hard",
        "_id": "5ab7edb4a718f91c442e973d",
        "name": "act3",
        "startTime": "2018-03-25T07:16:38.817Z",
        "endTime": "2018-03-25T07:16:51.090Z",
        "createdBy": {
            "_id": "5ab7ed78a718f91c442e973c",
            "name": "ffd"
        },
        "__v": 0
    },
    {
        "category": "hard",
        "_id": "5ab7edbaa718f91c442e973e",
        "name": "act2",
        "startTime": "2018-03-25T07:16:38.817Z",
        "endTime": "2018-03-25T07:16:51.090Z",
        "createdBy": {
            "_id": "5ab7ed78a718f91c442e973c",
            "name": "ffd"
        },
        "__v": 0
    }<br />
  * Error Response<br />
       Code: 401 BAD REQUEST <br />
      Content: Unauthorized<br />


