***GIT WORKFLOW***

STEP 1 - Git status (make sure you are currently on the DEVELOPMENT branch). 

STEP 2 - If your current branch is not development: git checkout development

STEP 3 - Copy the name of the Trello ticket you are working. 

STEP 4 - Create a branch with the name of that Trello ticket. (Example: git checkout -b Stockr gitflow readme)

STEP 5 - Run git status to make sure you are on your newly created branch.

Step 6 - Git add * (to add all changed files)

Step 7 - Git commit -m "(Enter your commit message)"

Step 8 -  Git push (may have to use: git push --set-upstream origin "your branch name")

Step 9 - Making a pull request: On github.com go to https://github.com/stockr-app/frontend/branches or https://github.com/stockr-app/backend/branches and look for the branch you just created and pushed to. 

Step 10 - On the right hand side click the button that says "New Pull Request"

Step 11 - Set base to development and compare to "your branch name" (should already be set).

Step 12 - Select two reviewers from the right (click on gear icon to select reviewers).

Step 13 - Leave comment if necessary and click "create pull request". 

# Welcome to the Stockr app api

Right now the database has only a single **users** table 

| id | name   | email  |premium|phoneNumber|
|----|--------|--------|-------|-----------|
|auto| string | string |boolean| integer   |

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
