# Parking System

## Background
This repository stores the source code of our parking system backend.

- Parking System: https://parkingwebappmobile.herokuapp.com/ (User Name: mgr, Password: mgr)
- Parking System Management Console: https://binluis-parkingwebapp.herokuapp.com/login
- Parking System Backend: https://parkingsystem.herokuapp.com/
- Parking System Database: https://parkingsystem.herokuapp.com/h2-console (JDBC URL: jdbc:h2:file:./h2/binluis, User Name: sa, Blank Password)

Remark:
If the credential for parking system does not work, you may signup as below:


POST    https://parkingsystem.herokuapp.com/api/auth/signup

{
    "name":"mgr",
    "username":"mgr",
    "email":"mgr@email.com",
    "password":"mgr",
    "phoneNumber":"98765432",
    "role":"MANAGER"
}

This parking system is the final project of a bootcamp which we joint in Nov, 2018, we learnt several technology stacks as below

### Programming Languages
- Java
- Javascript

### Frameworks
- React JS
- Spring Boot

## Business Logic of Parking System
Assumption:
We have partnered with some parking service provider which will have their own parking boys helping customers park their cars.

Our parking system is a platform showing which parking lot a customer is going to park his/her car to so that parking boys can take the order and make money. On top of that, this parking system provides a management tool, covering utilization rate of each parking lot, resource planning (who are on duty).

Our parking system earns money by subscription for each parking service provider and advertisement.

## Team Members (in alphabetical order)
- Connie Ip (Tech Lead & Full Stack)
- Iker Suen (Full Stack & Security Function)
- Kyle Yip (Fullstack)
- Joe Ho (Team Lead & Full Stack)
- Tommy Hui (Frontend)
- Venice Lam (Frontend)
