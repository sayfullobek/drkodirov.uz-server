const { Schema, model } = require("mongoose")
const { schemaOptions } = require("./modelOptions")

const videoSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	video: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(v)
			},
			message: props => `${props.value} - bu YouTube linki emas`
		}
	}
}, schemaOptions)

module.exports = model('Video', videoSchema)
