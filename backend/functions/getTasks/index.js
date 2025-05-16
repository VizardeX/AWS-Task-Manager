const { handleGetAllTasks } = require("./controller");

exports.handler = async (event) => {
  try {
    const queryParams = event.queryStringParameters || {};
    const user_id = queryParams.user_id;

    const result = await handleGetAllTasks(user_id);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tasks retrieved successfully",
        data: result,
      }),
    };
  } catch (error) {
    console.error("Error in getTasks:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to retrieve tasks",
        error: error.message,
      }),
    };
  }
};
