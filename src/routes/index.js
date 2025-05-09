const express = require('express')
const router = express.Router()

router.use('/auth', require("./authRoute"))
router.use('/certificate', require("./certificateRoute"))
router.use('/service', require("./serviceRoute"))
router.use('/blog', require("./blogRoute"))
router.use('/video', require('./videoRoute'))
router.use('/shorts', require('./shortsRoute'))
router.use('/thoughts', require('./thoughtsRoute'))
router.use('/request', require('./requestRoute'))

module.exports = router