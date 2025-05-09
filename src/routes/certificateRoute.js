const router = require('express').Router()
const { certificateController } = require('../controller')
const upload = require('../middlewares/upload')
const { verifyUsersToken } = require('../config')

router.get('/', certificateController.getAll)
router.post('/', verifyUsersToken, upload.single('photo'), certificateController.create)
router.put('/:id', verifyUsersToken, upload.single('photo'), certificateController.update)
router.delete('/:id', verifyUsersToken, certificateController.remove)

module.exports = router
