const { Short } = require('../models')

// CREATE
exports.create = async (req, res) => {
	try {
		const { name, video } = req.body

		const short = await Short.create({ name, video })
		res.status(201).json({ message: "Short qo‘shildi", short })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// GET ALL
exports.getAll = async (req, res) => {
	try {
		const shorts = await Short.find().sort({ createdAt: -1 })
		res.status(200).json(shorts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// GET ONE
exports.getOne = async (req, res) => {
	try {
		const short = await Short.findById(req.params.id)
		if (!short) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json(short)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { name, video } = req.body

		const short = await Short.findByIdAndUpdate(
			req.params.id,
			{ name, video },
			{ new: true, runValidators: true }
		)

		if (!short) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "Yangilandi", short })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const short = await Short.findByIdAndDelete(req.params.id)
		if (!short) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
