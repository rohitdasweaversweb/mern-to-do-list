const express=require('express');
const { createTask,fetchTask,deleteTask,updateTask} = require('../Controllers/TaskController');
const router=express.Router();

router.get('/',fetchTask);

router.post('/',createTask);

router.put('/:id',updateTask);

router.delete('/:id',deleteTask);


module.exports=router;