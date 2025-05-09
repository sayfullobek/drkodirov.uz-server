const { Admin } = require("../models")
const CryptoJS = require('crypto-js')
const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
	try {
		const {
			phoneNumber, password
		} = req.body
		const users = await Admin.findOne({ phoneNumber })
		if (!users) {
			return res.status(401).json({
				message: "Telefon raqam yoki parolingizda xatolik"
			})
		}
		const decryptedPass = CryptoJS.AES.decrypt(users.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8)
		if (decryptedPass !== password) {
			return res.status(401).json({
				message: "Telefon raqam yoki parolingizda xatolik"
			})
		}
		const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET_KEY)
		users.password = undefined
		return res.status(200).json({
			message: "Xisobingizga muvaffaqiyatli kirdingiz",
			token,
			url: `/dr-kodirov/auth/dashboard`,
			users
		})
	} catch (err) {
		res.status(500).json({
			message: err.message
		})
	}
}
