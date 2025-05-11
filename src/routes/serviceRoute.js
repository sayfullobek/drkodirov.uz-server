const router = require('express').Router()
const { serviceController } = require('../controller')
const { verifyUsersToken } = require('../config')
const upload = require('../middlewares/upload')

router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.post('/', verifyUsersToken, upload.none(), serviceController.create)
router.put('/:id', verifyUsersToken, serviceController.update)
router.delete('/:id', verifyUsersToken, serviceController.remove)

module.exports = router
