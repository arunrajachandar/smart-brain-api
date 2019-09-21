const handleRegister = (req, res,database, bcrypt)=>{
	const {name, email, password}= req.body;

if(!email||!password||!name){
	return res.status(400).json('incorrect form submission')
}
const hash = bcrypt.hashSync(password, saltRounds);
console.log(hash);

database.transaction(trx=>
	trx.insert({email: email,
		hash: hash}).
	into('login').
	returning('email').
	then(locEmail =>
		trx.insert({email: locEmail[0],
name: name,
joined: new Date()}).
		into('users').
		returning('*').
		then(user=> res.json(user[0]))
		).then(trx.commit)
	.catch(trx.rollback)
).catch(err => res.status(400).json('already exists'));
}

module.exports={
	handleRegister: handleRegister
}