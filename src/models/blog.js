const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")
const blogSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		maxlength: 10000
	}, description: {
		type: String,
		required: true,
		maxlength: 20000
	}, photo: {
		type: String,
	}
}, schemaOptions)
module.exports = model('Blog', blogSchema)