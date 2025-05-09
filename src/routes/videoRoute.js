const router = require('express').Router()
const { videoController } = require('../controller')
const { verifyUsersToken } = require('../config')

router.get('/', videoController.getAll)
router.get('/:id', videoController.getOne)
router.post('/', verifyUsersToken, videoController.create)
router.put('/:id', verifyUsersToken, videoController.update)
router.delete('/:id', verifyUsersToken, videoController.remove)

module.exports = router
