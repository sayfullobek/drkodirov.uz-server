const router = require('express').Router()
const { requestController } = require('../controller')
const { verifyUsersToken } = require('../config')

router.get('/', requestController.getAll)
router.get('/:id', requestController.getOne)
router.post('/', requestController.create)
router.put('/:id', verifyUsersToken, requestController.update)
router.delete('/:id', verifyUsersToken, requestController.remove)

module.exports = router
