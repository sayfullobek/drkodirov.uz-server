const { Schema, model } = require("mongoose");
const { schemaOptions } = require("./modelOptions");

const requestSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
		maxlength: 20000
	},
	isFromUzbekistan: {
		type: Boolean,
		required: true,
	},
	region: {
		type: String,
		required: function () {
			return this.isFromUzbekistan === true;
		}
	},
	country: {
		type: String,
		required: function () {
			return this.isFromUzbekistan === false;
		}
	}
}, schemaOptions);

module.exports = model('request', requestSchema);
