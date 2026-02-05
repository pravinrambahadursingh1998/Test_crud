const express = require('express');
const router = express.Router();

const UserController = require('../controller/user_controller')

router.post('/user/add_user', UserController.addUser)
router.get('/user/getAllUser', UserController.getUser)
router.get('/user/getUser/:id', UserController.getSIngleUser)
router.put('/user/updateUser', UserController.updateUser)


module.exports = router;