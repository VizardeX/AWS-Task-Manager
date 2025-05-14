require("dotenv").config();

const { handleDeleteTask } = require("./controller");


//Triggered by API Gateway (DELETE /tasks/{id})

exports.handler = async (event) => {
  try {
    const task_id = event.pathParameters?.id;

    if (!task_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing task ID in path." }),
      };
    }

    await handleDeleteTask(task_id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task deleted successfully" }),
    };
  } catch (error) {
    console.error("Error in deleteTask:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to delete task",
        error: error.message,
      }),
    };
  }
};
