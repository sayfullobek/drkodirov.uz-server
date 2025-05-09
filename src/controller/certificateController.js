const { Certificate } = require('../models')
const fs = require('fs')
const path = require('path')

// CREATE
exports.create = async (req, res) => {
	try {
		const photo = req.file.filename
		const cert = await Certificate.create({ photo })
		res.status(200).json({
			message: "Yaratildi",
			certificate: cert,
			imageUrl: `${req.protocol}://${req.get('host')}/uploads/${photo}`
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// GET ALL
exports.getAll = async (req, res) => {
	try {
		const certs = await Certificate.find().sort({ createdAt: -1 })
		const host = `${req.protocol}://${req.get('host')}`
		const data = certs.map(c => ({
			_id: c._id,
			photo: c.photo,
			imageUrl: `${host}/uploads/${c.photo}`
		}))
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { id } = req.params
		const cert = await Certificate.findById(id)
		if (!cert) return res.status(404).json({ message: 'Topilmadi' })

		// eski rasmni o‘chirish
		if (req.file) {
			fs.unlinkSync(path.join('uploads', cert.photo))
			cert.photo = req.file.filename
		}

		await cert.save()
		res.status(200).json({
			message: 'Yangilandi',
			certificate: cert,
			imageUrl: `${req.protocol}://${req.get('host')}/uploads/${cert.photo}`
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
// DELETE
exports.remove = async (req, res) => {
	try {
		const { id } = req.params
		const cert = await Certificate.findById(id)
		if (!cert) return res.status(404).json({ message: 'Topilmadi' })

		// Faylni uploads dan o‘chirish
		const filePath = path.join('uploads', cert.photo)
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		// MongoDB'dan o‘chirish
		await Certificate.findByIdAndDelete(id)

		res.status(200).json({ message: 'Sertifikat o‘chirildi' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
