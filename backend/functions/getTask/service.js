const { getItem } = require("../../utils/dynamo");

/**
 * Fetches a task from DynamoDB by its ID.
 * @param {string} task_id - The task's unique identifier
 * @returns {Object|null} The task data or null if not found
 */
exports.getTaskFromDynamo = async (task_id) => {
  const tableName = "TasksTable"; // Replace with your actual table name

  try {
    const task = await getItem(tableName, task_id);
    return task || null;
  } catch (error) {
    console.error("Error fetching task from DynamoDB:", error);
    throw new Error("Failed to retrieve task from DynamoDB");
  }
};
