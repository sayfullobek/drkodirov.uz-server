const { Request } = require('../models')

// CREATE
exports.create = async (req, res) => {
	try {
		const { fullName, phoneNumber, date, message } = req.body
		const request = await Request.create({ fullName, phoneNumber, date, message })
		res.status(201).json({ message: "So‘rov yaratildi", request })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ALL
exports.getAll = async (req, res) => {
	try {
		const requests = await Request.find().sort({ createdAt: -1 })
		res.status(200).json(requests)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ONE
exports.getOne = async (req, res) => {
	try {
		const request = await Request.findById(req.params.id)
		if (!request) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json(request)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { fullName, phoneNumber, date, message } = req.body
		const request = await Request.findByIdAndUpdate(
			req.params.id,
			{ fullName, phoneNumber, date, message },
			{ new: true }
		)
		if (!request) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "Yangilandi", request })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const request = await Request.findByIdAndDelete(req.params.id)
		if (!request) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
