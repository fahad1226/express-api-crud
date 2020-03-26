
const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const fahadSchema = new Schema({
	name: {
		type: String,
		required: [true,'name is required']
	},
	rank: {
		type: String
	},
	availability: {
		type: Boolean,
		default: false
	}
});

const Fahad = mongoose.model('fahad', fahadSchema);

module.exports = Fahad;