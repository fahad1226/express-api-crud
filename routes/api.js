const express = require('express')
const Fahad = require('../models/fahad')
const router = express.Router();


router.get('/fahad', (req,res) => {
	res.send({type:'GET'})
});

router.post('/fahad', (req,res,next) => {
	Fahad.create(req.body).then(fahad => {
		res.send(fahad)
	}).catch(next)	
	
	
});

router.put('/fahad/:id', (req,res) => {
	Fahad.findByIdAndUpdate({_id:req.params.id},req.body).then( () => {
		Fahad.findOne({_id:req.params.id}).then(fahad => {
			res.send({
				fahad:fahad,
				msg:"update successfully"
			})
		});
	});
});

router.delete('/fahad/:id', (req,res) => {
	Fahad.findByIdAndRemove({_id:req.params.id})
	.then(fahad => {
		res.send(fahad)
	})
});

module.exports = router;