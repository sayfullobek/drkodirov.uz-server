const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")
const certificateSchema = new Schema({
	photo: {
		type: String,
	}
}, schemaOptions)
module.exports = model('Certificate', certificateSchema)