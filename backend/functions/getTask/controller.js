const { getTaskFromDynamo } = require("./service");

/**
 * Handles the retrieval of a task by ID.
 * @param {string} task_id - The ID of the task to retrieve
 * @returns {Object|null} The task metadata or null if not found
 */
exports.handleGetTask = async (task_id) => {
  if (!task_id) {
    throw new Error("Task ID is required");
  }

  // Get task metadata from DynamoDB
  const task = await getTaskFromDynamo(task_id);

  return task || null;
};
