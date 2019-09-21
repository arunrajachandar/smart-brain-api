const handleProfile= (req, res,database)=>{
	const{id }= req.params;
	database('users').where('id',id).then(
		response => {
			if(response.length)
{
	res.json(response)
}else{
	res.status(400).json('Not found')
}			
		}
		)
}

module.exports={
	handleProfile: handleProfile
}