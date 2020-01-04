# Parking System Management Console

If you think this project is intersting or helpful, please give it a star.

## Table of Contents
1. [Background](#background)
2. [Business Logic of Parking System](#business-logic-of-parking-system)
3. [Business Flow (a.k.a Quickstart)](#business-flow-aka-quickstart)
4. [Additional Functions](#additional-functions)
5. [Remark](#remark)
6. [Team Members (in alphabetical order)](#team-members-in-alphabetical-order)
7. [Contact](#contact)

## Background
This repository stores the source code of our parking system management console.

- Parking System Mobile Web App: https://binluis-parking-mobile.herokuapp.com
- Parking System Management Console: https://binluis-parkingwebapp.herokuapp.com/login
- Parking System Backend: https://parkingsystem.herokuapp.com
- Parking System Database: https://parkingsystem.herokuapp.com/h2-console (JDBC URL: jdbc:h2:file:./h2/binluis, User Name: sa, Blank Password)

This parking system is the final project of a bootcamp which we joint in Nov, 2018, we learnt several technology stacks as below

### Programming Languages
- Java
- Javascript

### Frameworks
- React JS
- Spring Boot

## Business Logic of Parking System
This web app is a inhouse tool of a multinational parking service provider.

Customers use our application to ask for car parking service in this web app, our internal parking clerks use this app to compete for car parking service to make extra money. On top of that, we have a management console for human resource management, parking lot management (i.e. which parking lot that a parking clerk will manage), car service request assignment (assign car service to some parking clerk)

## Business Flow (a.k.a Quickstart)
0. Spin Up the machines by browsing below URL</br>
   https://binluis-parking-mobile.herokuapp.com<br/>
   https://binluis-parkingwebapp.herokuapp.com/login<br/>
   https://parkingsystem.herokuapp.com<br/>
   https://parkingsystem.herokuapp.com/h2-console<br/>
   
   Try to refresh the above websites again if you cannot encounter the error, as the application cannot be re-started properly.
1. Create a parking clerk account <br/>
   POST https://parkingsystem.herokuapp.com/api/auth/signup
   {"name":"clerk","username":"clerk","email":"clerk@email.com","password":"clerk","phoneNumber":"12345678","role":"PARKINGCLERK"}
2. Create a manager account<br/>
   POST https://parkingsystem.herokuapp.com/api/auth/signup
   {"name":"mgr","username":"mgr","email":"mgr@email.com","password":"mgr","phoneNumber":"98765432","role":"MANAGER"}
3. Log in to Management Console (https://binluis-parkingwebapp.herokuapp.com/login) with User name: mgr & Password: mgr) <br/>
![Log in to Management Console](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementLogin_edit.gif)
4. Create and assign a parking lot to a parking clerk<br/>
![Create and assign a parking lot](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementParkingLot_edit.gif)
5. Create a car parking request at https://binluis-parking-mobile.herokuapp.com/requestformpage<br/>
![Submit car parking request](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuSubmitParkingRequest_edit.gif)<br/>
6. Customer can view the status of his/her car parking request at https://binluis-parking-mobile.herokuapp.com/requestformpage<br/>
![Check car parking request is well-received](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuSearchCarToCheckRequestReceived_edit.gif)<br/>
7. A parking clerk logs in to https://binluis-parking-mobile.herokuapp.com/login with User name: clerk & Password: clerk)<br/>
![Parking clerk log in to Web App](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuLogin_edit.gif)
8. The parking clerk competes with other parking clerks for the car parking order.<br/>
![Parking clerk compete for order](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuAcceptOrder_edit.gif)
9. The parking clerk chooses the parking lot and drives the car to the parking lot.<br/>
![Parking clerk parks car](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuParkCar_edit.gif)
10. Customer can check view the status of his/her car parking request.<br/>
![Verify customer's car is now in parking lot](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuSearchCarToCheckCarIsNowInParkingLot_edit.gif)
11. Customer send a request to pick up car.<br/>
![Customer send car picking up request](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuMakeCarFetchingRequest_edit.gif)
12. Customer can check the status car picking up request.<br/>
![Check car picking up request status](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuSearchCarToCheckParkingClerkIsFetchingTheCar_edit.gif)
14. Parking Clerk will pick up the car and drives the car to customer's destination
![Parking clerk pick up car](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuClerkPickUpCar_edit.gif)

## Additional Functions
1. Parking Clerk can change his/her password.<br/>
![Parking Clerk changes password](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/BinLuClerkChangePassword_edit.gif)
2. Manager can edit basic information of parking clerks.<br/>
![Manager edits information of a parking clerk](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementEmployee_edit.gif)
3. Manager can view the utilization of each parking lot
![Parking Lot Utilization](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementParkingLotsUtilization.PNG)
4. Manager can view the status of all car parking order
![Customer Request](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementCustomerRequest.PNG)
5. Manager can assign a parking clerk to handle a car parking order (possibly due to no one respond to that order)
![Assign a parking clerk to a new parking order](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementAssignParkingClerkToNewOrder_edit.gif)
6. Search parking lots, employees and parking clerks by their name
![Search resources by name](https://github.com/BinLuIS/ParkingSystemManagementConsole/blob/master/media/ManagementSearchByName_edit.gif)

## Remark
1. Data will not persist, the database will erase all data whenever it is offline.

## Team Members (in alphabetical order)
- Connie Ip (Tech Lead & Full Stack)
- Iker Suen (Full Stack & Security Function)
- Kyle Yip (Fullstack)
- Joe Ho (Team Lead & Full Stack)
- Tommy Hui (Frontend)
- Venice Lam (Frontend)
