const router = require('express').Router()
const { shortController } = require('../controller')
const { verifyUsersToken } = require('../config')
const upload = require('../middlewares/upload')

router.get('/', shortController.getAll)
router.get('/:id', shortController.getOne)
router.post('/', verifyUsersToken, upload.none(), shortController.create)
router.put('/:id', verifyUsersToken, shortController.update)
router.delete('/:id', verifyUsersToken, shortController.remove)

module.exports = router
