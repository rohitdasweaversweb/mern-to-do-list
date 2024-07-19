const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
    const data = req.body;
    // const modData = {taskname: data.taskName,isDone: data.isDone }
    // console.log('*****************************************',data);
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(200).json({
            message: `Data saved Succcessfully`,
            success: true,
            Result: model
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error to saving Data`, success: false });

    }
}

const fetchTask = async (req, res) => {
    // const data = req.body;
    try {
        const data = await TaskModel.find();
        // console.log("!!!!!!!!!!!!!!!!!!!!!!",data);
        res.status(200).json({
            Result: data
        });
    } catch (error) {
        console.log(`*****************`,error);
        res.status(500).json({ message: `Error to saving Data`, success: false });

    }
}


const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200).json({ message: 'Task deleted successfully', success: true, task: deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', success: false });
    }
}

const updateTask = async (req, res) => {
    const id=req.params.id;
    const body = req.body;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: { ...body } } );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200).json({ message: 'Task updated successfully', success: true, task: updatedTask });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task', success: false });
    }
}



module.exports = { createTask,fetchTask,deleteTask,updateTask};