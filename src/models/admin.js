const { model, Schema } = require("mongoose")
const { schemaOptions } = require("./modelOptions")

function validPhoneNumber(phoneNumber) {
	const phoneRegex = /^\+998\d{9}$/
	return phoneRegex.test(phoneNumber)
}

const admin = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validPhoneNumber,
			message: 'Noto\'g\'ri telefon raqami iltimos tekshirib qayta kiriting' // Xatolik xabari
		}
	},
	password: {
		type: String,
		required: true,
	},
}, schemaOptions)

module.exports = model("Admin", admin)