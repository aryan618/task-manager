const Task = require("../models/Tasks"); // model having the schema
const getALLTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createTask = async (req, res) => {
  // we have made it asynchronous as Task.create is a type of promise function to be executed
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};
const updateTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      // the third option in this funcion is the object which defines the rules of the updation..it is important to make new:true always
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `Task ${taskID} not found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
  res.send(`updated item`);
};
const getTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      // this error is for that the syntax of the id is correct but it is not found in the database.
      return res.status(404).json({ message: `task ${taskID} not found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // this error is for syntax errors of the id
    res.status(500).json({ message: error });
  }
};
const deleteTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findByIdAndDelete({ _id: taskID }); // it first finds the respective task and then store it..then it deletes that particular task ffrom the database
    if (!task) {
      return res.status(404).json({
        message: `task ${taskID} not found toh kya delete karun bsdk`,
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: `error: ${error.message}` });
  }
};
const editTask = async (req, res) => {
  try {
    const taskID = req.params.id;
    const task = await Task.findOneAndReplace({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: `task with id ${taskID} not found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` });
  }
};
module.exports = {
  getALLTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
