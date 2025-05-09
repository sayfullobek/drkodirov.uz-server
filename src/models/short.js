const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")

const shortSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	video: {
		type: String, // YouTube linki saqlanadi
		required: true,
		validate: {
			validator: function (v) {
				return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v)
			},
			message: props => `${props.value} - bu to‘g‘ri YouTube havolasi emas!`
		}
	}
}, schemaOptions)

module.exports = model('Short', shortSchema)
