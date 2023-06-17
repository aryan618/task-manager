const express = require("express");
const {
  getALLTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
  editTask,
} = require("../controllers/tasks");
const router = express.Router();
router.route("/").get(getALLTasks).post(createTask);
router
  .route("/:id")
  .get(getTask)
  .delete(deleteTask)
  .patch(updateTask)
  .put(editTask);
// the difference between put and patch is that patch is generally used for updation and put is used for replacement...check in the postman for examples for better clarification
module.exports = router;
