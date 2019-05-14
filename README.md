# Welcome to the Stockr app api

Right now the database has only a single **users** table 

| id |username|password|
|----|--------|--------| 
|auto| string | string |

## Routes

At the moment there are four **User Routes**

They are:

- get all users which is a **get** request that uses /users as the route
- get user by id another **get** request that uses  /users/:id as the route
- create user/register user which is a **post** request that uses  /users as the route
- delte user which is a **delete** request that uses /users/:id as the route

All routes can be **found in the routes folder** 

inside the route folder is a **router.js** file this is the main router. **All other routers are routed through this file** which is then connected to the **server.js** file

## data folder

The data folder is home to the:

- **dbHelpers** folder
- **migtations** folder
- **dbConfig.js** file 
- **stockr.sqlite3** file

## dbHelpers

The dbHelpers fold houses all of the database helper functions.

dbHelpers are functions used to help the routes connect to the database 

Currently there is only the userDB.js file.

### userDB.js 

userDB currently has four helper functions :

- createUser()
- getUserById()
- getAllUsers()
- deleteUser()

