const { handleGetTask } = require("./controller");

//Triggered by API Gateway (GET /tasks/{id})

exports.handler = async (event) => {
  try {
    const task_id = event.pathParameters?.id;

    if (!task_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing task ID in path." }),
      };
    }

    const task = await handleGetTask(task_id);

    if (!task) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ task }),
    };
  } catch (error) {
    console.error("Error in getTask:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to retrieve task",
        error: error.message,
      }),
    };
  }
};
