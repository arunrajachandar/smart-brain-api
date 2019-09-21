const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: '2d4024eb01994b158a0c333cf3214598'});

const handleApi = (req, res)=>{
	      app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	      .then(response =>res.json(response))
	      .catch(err=> res.status(400).json('unable to get the api to work'));

}

const handleImage= (req, res,database)=>{
	const{id }= req.body;
	database('users')
	.where('id',id)
	.increment('entries',1)
	.returning('entries')
	.then(response =>res.json(response[0]))
	.catch(err=> res.status(400).json('unable to get entries'))
}
module.exports = {
	handleImage: handleImage,
	handleApi: handleApi
}