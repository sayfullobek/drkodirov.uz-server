const router = require('express').Router()
const { shortController } = require('../controller')
const { verifyUsersToken } = require('../config')

router.get('/', shortController.getAll)
router.get('/:id', shortController.getOne)
router.post('/', verifyUsersToken, shortController.create)
router.put('/:id', verifyUsersToken, shortController.update)
router.delete('/:id', verifyUsersToken, shortController.remove)

module.exports = router
