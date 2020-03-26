
const Joi = require('joi')
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost/fahads_db')

app.use(express.json());


app.use('/api',require('./routes/api'))


//error handling middleware

app.use((err,req,res,next) => {
	//console.log(err)
	res.status(422).send({error: err['message']})
})



const courses = [

	{id:1,name: 'Javascript'},
	{id:2,name:'python'},
	{id:3,name:'php'}
]



app.get('/',(req,res) => {
	const obj = {

		name: "Fahad",
		age: 21,
		passion: "Programming",
		subject : "Javascript"
	}

	res.send(obj)
});

app.get('/:name/:id', (req,res) => {
	const info = {
		name: `${req.params.name}`,
		id: `${req.params.id}`
	}
	res.send(info)
});


app.post('/api/courses', (req,res) => {

	const schema = {
		name: Joi.string().min(3).required()
	};
	const result = Joi.validate(req.body, schema)
	console.log(result);
	if (result.error) {
		res.status(400).send(result.error.details[0].message)
		return;
	}
	const course = {
		id : courses.length + 1,
		name : req.body.name
	};
	courses.push(course)
	res.send(course)
});




app.post('/api/posts', (req,res) => {
	res.json({
		message: "post created"
	})
});


app.post('/api/login', (req,res) => {
	const user = {
		id: 1,
		username: "Fahad",
		email : "fahad@gmail.com"
	}

	jwt.sign({user:user}, 'secretkey', (error,token) => {
		res.json({
			token: token
		})
	});
});






// app.put('/api/courses/:id', (req,res) => {
// 	//look up the course
// 	//If not existing return 404 - not found
// 	const course = courses.find(c => c.id === purseInt(req.params.id))
// 	if (!course) {
// 		res.status(404).send('the course with given is was not found')
// 	}



// 	//validate

// 	//if invalid return 400 - bad request


// 	//update course
// 	//return the course to the client
// });



app.listen(3000, () => {
	console.log("running on port 3000");
})
