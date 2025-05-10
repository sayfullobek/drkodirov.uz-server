const { Certificate } = require('../models')
const fs = require('fs')
const path = require('path')

// CREATE
exports.create = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Rasm yuborilmadi" })
		}
		const photo = req.file.filename
		const cert = await Certificate.create({ photo })
		res.status(201).json({
			message: "Yaratildi",
			certificate: cert,
			imageUrl: `${req.protocol}://${req.get('host')}/uploads/${photo}`
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server xatosi' })
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
		console.error(err)
		res.status(500).json({ message: 'Server xatosi' })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { id } = req.params
		const cert = await Certificate.findById(id)
		if (!cert) return res.status(404).json({ message: 'Topilmadi' })

		if (req.file) {
			const oldPath = path.join('uploads', cert.photo)
			if (fs.existsSync(oldPath)) {
				fs.unlinkSync(oldPath)
			}
			cert.photo = req.file.filename
		}

		await cert.save()
		res.status(200).json({
			message: 'Yangilandi',
			certificate: cert,
			imageUrl: `${req.protocol}://${req.get('host')}/uploads/${cert.photo}`
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server xatosi' })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const { id } = req.params
		const cert = await Certificate.findById(id)
		if (!cert) return res.status(404).json({ message: 'Topilmadi' })

		const filePath = path.join('uploads', cert.photo)
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

		await Certificate.findByIdAndDelete(id)
		res.status(200).json({ message: 'Sertifikat o‘chirildi' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server xatosi' })
	}
}
