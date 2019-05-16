const users = require('./userDB.js');
const db = require('../dbConfig.js');

describe('the user db helpers', ()=>{
    beforeEach(() => {
        return db("users").truncate();
      });
    describe('createUser fn', ()=>{
        it('should insert a user into the database', async ()=>{
            await users.createUser({
                username:'bobTheBuilder',
                password: 'password'
            });

            const userList = await db('users');

            expect(userList.length).toBe(1);
            expect(userList[0].username).toBe('bobTheBuilder');
            expect(userList[0].password).toBe('password');
            expect(userList[0].id).toBe(1);
            

        });
    });

    describe('the getAllUsers fn', ()=>{

        beforeEach(() => {
            return db("users").truncate();
          });

        it('should return a list of all users', async ()=>{

            await users.createUser({
                username:'bobTheBuilder',
                password:'password'
            });

            const userList = await users.getAllUsers();

            expect(userList.length).toBe(1);
            expect(userList[0].username).toBe('bobTheBuilder');
            expect(userList[0].id).toBe(1);
            expect(userList[0].password).toBe('password');
            
            
        })
    })
    // this test needs to be reviewed it is not working
    describe('the getUserById fn', ()=>{

        beforeEach(() => {
            return db("users").truncate();
          });

        it('should return a user by user Id', async ()=>{

            await users.createUser({
                username:'bobTheBuilder',
                password:'password'
            });
            const thisUser = await users.getAllUsers()
            const userList = await users.getUserById(thisUser[0].id);

            // expect(userList.length).toBe(1);
            expect(userList[0].username).toBe('bobTheBuilder');
            expect(userList[0].id).toBe(1);
            expect(userList[0].password).toBe('password');
            
            
        })
    })


});