const express = require('express');

const {updateUser} = require('../controllers/user');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');

router.route('/:id').put(protect, authorize('admin'), updateUser)


module.exports=router;