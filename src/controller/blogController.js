const { Blog } = require('../models')
const fs = require('fs')
const path = require('path')

// CREATE
exports.create = async (req, res) => {
	try {
		const { name, description } = req.body
		const photo = req.file?.filename || ''

		const blog = await Blog.create({ name, description, photo })

		res.status(201).json({
			message: "Blog yaratildi",
			blog,
			imageUrl: photo ? `${req.protocol}://${req.get('host')}/uploads/${photo}` : null
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ALL
exports.getAll = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({ createdAt: -1 })
		const host = `${req.protocol}://${req.get('host')}`
		const data = blogs.map(blog => ({
			...blog._doc,
			imageUrl: blog.photo ? `${host}/uploads/${blog.photo}` : null
		}))
		res.status(200).json(data)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// READ ONE
exports.getOne = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id)
		if (!blog) return res.status(404).json({ message: "Topilmadi" })

		res.status(200).json({
			...blog._doc,
			imageUrl: blog.photo ? `${req.protocol}://${req.get('host')}/uploads/${blog.photo}` : null
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// UPDATE
exports.update = async (req, res) => {
	try {
		const { name, description } = req.body
		const blog = await Blog.findById(req.params.id)
		if (!blog) return res.status(404).json({ message: 'Topilmadi' })

		if (req.file) {
			if (blog.photo) {
				fs.unlinkSync(path.join('uploads', blog.photo))
			}
			blog.photo = req.file.filename
		}

		blog.name = name || blog.name
		blog.description = description || blog.description

		await blog.save()

		res.status(200).json({
			message: 'Yangilandi',
			blog,
			imageUrl: blog.photo ? `${req.protocol}://${req.get('host')}/uploads/${blog.photo}` : null
		})
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

// DELETE
exports.remove = async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.id)
		if (!blog) return res.status(404).json({ message: "Topilmadi" })

		if (blog.photo) {
			fs.unlinkSync(path.join('uploads', blog.photo))
		}

		await Blog.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: "O‘chirildi" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
