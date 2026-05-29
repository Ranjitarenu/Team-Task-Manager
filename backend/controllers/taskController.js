const prisma = require("../config/db");

const createTask = async (req, res) => {
  try {

    const { title, description } = req.body;

    const task = await prisma.task.create({
  data: {
    title,
    description,
    user: {
      connect: { id: req.user.id }
    }
  }
});

    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    const { title, description, status } = req.body;

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
      },
    });

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};