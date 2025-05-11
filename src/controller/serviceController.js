const { Service } = require('../models')

// CREATE
exports.create = async (req, res) => {
	try {
		const { name, description } = req.body
		// const service = await Service.create({ name, description })
		const service = new Service({ name, description })
		await service.save()
		res.status(201).json({ message: "Xizmat yaratildi", service })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ALL
exports.getAll = async (req, res) => {
	try {
		const services = await Service.find().sort({ createdAt: -1 })
		res.status(200).json(services)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ONE
exports.getOne = async (req, res) => {
	try {
		const service = await Service.findById(req.params.id)
		if (!service) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json(service)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { name, description } = req.body
		const service = await Service.findByIdAndUpdate(
			req.params.id,
			{ name, description },
			{ new: true }
		)
		if (!service) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "Yangilandi", service })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const service = await Service.findByIdAndDelete(req.params.id)
		if (!service) return res.status(404).json({ message: "Topilmadi" })
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
