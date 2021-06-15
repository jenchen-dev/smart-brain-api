/*

Endpoints:
/ --> response = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = update user

*/ 

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') })
app.post('/signin', signin.handleSignIn(database, bcrypt));
app.post('/register', register.handleRegister(database, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(database));
app.put('/image', image.handleImage(database));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
