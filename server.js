const express = require('express');

const bodyParser = require('body-parser');

const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const database= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});



const bcrypt = require('bcrypt');

const cors = require('cors')
const app = express();


app.use(bodyParser.json());
app.use(cors())
// database.select('*').from('users').then(data=> console.log(data));
	
	const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// const database ={
// 	user:[
// 	{
// 		id:'123',
// 		name:'Arun',
// 		email:'arunrajachandar@gmail.com',
// 		password:'malarS58@',
// 		entries: 0,
// 		joined: new Date()
// 	},
// 	{
// 		id:'124',
// 		name:'Swe',
// 		email:'swedude@gmail.com',
// 		password:'arun2202',
// 		entries: 0,
// 		joined: new Date()
// 	}
// 	]
// }


app.get('/',(req, res)=>{
	res.send(database.user)
})


app.post('/register',(req, res)=>register.handleRegister(req, res, database, bcrypt));
app.post('/signin',(req, res)=>signin.handleSignin(req, res, database, bcrypt));
app.get('/profile/:id',(req, res)=>profile.handleSignin(req, res, database));
app.put('/image',(req, res)=>image.handleImage(req, res, database));
app.post('/imageurl',(req, res)=>image.handleApi(req, res));


// database('users').returning('*')
// database('login').insert({email:email,
// hash: hash});
// database.select('*').from('users').then(data=> console.log(data));




app.listen(process.env.PORT||3000, ()=>{
	console.log('Hello');
})
