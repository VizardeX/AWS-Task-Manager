const { scanItems } = require("../../utils/dynamo");

/**
 * Retrieves all tasks for a specific user from DynamoDB.
 * @param {string} user_id - The user ID to filter tasks by
 */
exports.getTasksByUser = async (user_id) => {
  const tableName = process.env.DYNAMO_TABLE_NAME || "TaskMetadata";
  const allTasks = await scanItems(tableName);

  // Filter in-memory (since owner_id isn't a key)
  return allTasks.filter(task => task.owner_id === user_id);
};
