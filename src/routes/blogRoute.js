const router = require('express').Router()
const { blogController } = require('../controller')
const upload = require('../middlewares/upload')
const { verifyUsersToken } = require('../config')

router.get('/', blogController.getAll)
router.get('/:id', blogController.getOne)
router.post('/', verifyUsersToken, upload.single('photo'), blogController.create)
router.put('/:id', verifyUsersToken, upload.single('photo'), blogController.update)
router.delete('/:id', verifyUsersToken, blogController.remove)

module.exports = router
