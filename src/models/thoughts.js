const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")
const thoughtsSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	}, description: {
		type: String,
		required: true,
		maxlength: 20000
	}
}, schemaOptions)
module.exports = model('Thoughts', thoughtsSchema)