const handleSignin = (req, res, database, bcrypt)=>{
	const {email, password}=req.body;
// bcrypt.compare(, hash, function(err, res) {
    
// });
database.select('email','hash')
.from('login')
.where('email', email)
.then(resp =>{
const isValid = bcrypt.compareSync(password, resp[0].hash); // true
	console.log(isValid);
	if(isValid){
		return database.select('*')
		.from('users')
		.where('email',resp[0].email)
		.then(response => res.json(response[0]))
		.catch(err => res.status(400).json('unable to get the user'))
	}
	else{
		res.status(400).json('wrong credentials');
	}
}).catch(err => res.status(400).json('wrong credentials'))
}

module.exports={
	handleSignin: handleSignin
}