const router = require('express').Router()
const { authController } = require("../controller")

router.post('/login', authController.login)

module.exports = router