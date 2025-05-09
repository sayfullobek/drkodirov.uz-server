const { Thoughts } = require('../models')

// CREATE
exports.create = async (req, res) => {
	try {
		const { fullName, description } = req.body
		const thought = await Thoughts.create({ fullName, description })
		res.status(201).json({ message: "Fikr yaratildi", thought })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// GET ALL
exports.getAll = async (req, res) => {
	try {
		const thoughts = await Thoughts.find().sort({ createdAt: -1 })
		res.status(200).json(thoughts)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// GET ONE
exports.getOne = async (req, res) => {
	try {
		const thought = await Thoughts.findById(req.params.id)
		if (!thought) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json(thought)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { fullName, description } = req.body
		const thought = await Thoughts.findByIdAndUpdate(
			req.params.id,
			{ fullName, description },
			{ new: true, runValidators: true }
		)
		if (!thought) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "Yangilandi", thought })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const thought = await Thoughts.findByIdAndDelete(req.params.id)
		if (!thought) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
