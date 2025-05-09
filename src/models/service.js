const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")
const serviceSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}, description: {
		type: String,
		required: true,
		maxlength: 20000
	}
}, schemaOptions)
module.exports = model('Service', serviceSchema)