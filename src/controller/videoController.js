const { Video } = require('../models')

// CREATE
exports.create = async (req, res) => {
	try {
		const { name, video } = req.body
		const created = await Video.create({ name, video })
		res.status(201).json({ message: "Video yaratildi", video: created })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// GET ALL
exports.getAll = async (req, res) => {
	try {
		const videos = await Video.find().sort({ createdAt: -1 })
		res.status(200).json(videos)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// GET ONE
exports.getOne = async (req, res) => {
	try {
		const video = await Video.findById(req.params.id)
		if (!video) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json(video)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { name, video } = req.body
		const updated = await Video.findByIdAndUpdate(
			req.params.id,
			{ name, video },
			{ new: true, runValidators: true }
		)
		if (!updated) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "Yangilandi", video: updated })
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const deleted = await Video.findByIdAndDelete(req.params.id)
		if (!deleted) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
