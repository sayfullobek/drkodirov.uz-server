const router = require('express').Router()
const { serviceController } = require('../controller')
const { verifyUsersToken } = require('../config')

router.get('/', serviceController.getAll)
router.get('/:id', serviceController.getOne)
router.post('/', verifyUsersToken, serviceController.create)
router.put('/:id', verifyUsersToken, serviceController.update)
router.delete('/:id', verifyUsersToken, serviceController.remove)

module.exports = router
