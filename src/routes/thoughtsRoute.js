const router = require('express').Router()
const { thoughtsController } = require('../controller')
const { verifyUsersToken } = require('../config')
const upload = require('../middlewares/upload')

router.get('/', thoughtsController.getAll)
router.get('/:id', thoughtsController.getOne)
router.post('/', verifyUsersToken, upload.none(), thoughtsController.create)
router.put('/:id', verifyUsersToken, thoughtsController.update)
router.delete('/:id', verifyUsersToken, thoughtsController.remove)

module.exports = router
