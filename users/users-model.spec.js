const Users = require('./users-model.js');
const db = require('../database/dbConfig');

describe('users model', function() {


    

    describe('add()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })

        it('adds new user to the database', async function() {
            await Users.add({ username: 'bilbo', password: "baggins"});
            await Users.add({ username: 'harry', password: 'potter'});

            const users = await db('users');

            expect(users).toHaveLength(2)
        })
    })
})