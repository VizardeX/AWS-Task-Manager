require("dotenv").config();

const { handleUpdateTask } = require("./controller");

//Lambda handler for updating a task.
//Triggered by API Gateway (PUT /tasks/{id})

exports.handler = async (event) => {
  try {
    const task_id = event.pathParameters?.id;
    const body = JSON.parse(event.body);

    if (!task_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing task ID in path." }),
      };
    }

    const result = await handleUpdateTask(task_id, body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task updated successfully",
        data: result,
      }),
    };
  } catch (error) {
    console.error("Error in updateTask:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update task",
        error: error.message,
      }),
    };
  }
};
