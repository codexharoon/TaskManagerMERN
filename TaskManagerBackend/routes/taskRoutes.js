const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const TASK = require('../models/task');


// craete task
router.post('/',auth,async (req,res)=>{
    try{
        const task = new TASK(
            {
                ...req.body,
                owner : req.user._id
            }
        );
    
        await task.save();

        res.json({
            message : 'Task created!',
            task
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message
        });
    }
});


// get all tasks
router.get('/',auth,async (req,res)=>{
    try{
        const tasks = await TASK.find({owner : req.user._id});

        if(!tasks || tasks.length === 0){
            return res.status(404).json({
                message : 'No task found!'
            });
        }

        res.json({
            message : 'All tasks!',
            Tasks : tasks
        });
    }
    catch(err){
        res.status(500).json({
            message : err.message
        });
    }
});


// update a task
router.patch('/:id',auth,async (req,res)=>{
    try{
        const id = req.params.id;
        const updates = Object.keys(req.body);

        const allowedUpdates = ['title','description','completed'];
        const isValidUpdate = updates.every( update => allowedUpdates.includes(update));

        if(!isValidUpdate){
            return res.status(400).json({
                message : 'Invalid update!'
            });
        }

        const task = await TASK.findOne({
            _id : id,
            owner : req.user._id
        });

        if(!task){
            return res.status(404).json({
                message : 'Task not found!'
            });
        }

        updates.forEach( update => task[update] = req.body[update]);
        await task.save();

        res.json({
            message : 'Task updated!',
            task
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
}); 


// delete a task
router.delete('/:id',auth,async (req,res)=>{
    try{
        const id = req.params.id;

        const task = await TASK.findOneAndDelete({
            _id : id,
            owner : req.user._id
        });

        if(!task){
            return res.status(404).json({
                message : 'Task not found!'
            });
        }

        res.json({
            message : 'Task deleted!',
            task
        });
    }
    catch(error){
        res.status(500).json({
            message : error.message
        });
    }
});


module.exports = router;