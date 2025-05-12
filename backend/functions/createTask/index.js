const { handleCreateTask } = require("./controller");


 //Lambda handler for creating a new task.
 //Triggered by API Gateway (POST /tasks)
 
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await handleCreateTask(body);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Task created successfully",
        data: result,
      }),
    };
  } catch (error) {
    console.error("Error in createTask:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to create task",
        error: error.message,
      }),
    };
  }
};
