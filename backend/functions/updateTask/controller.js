const { updateTaskInDynamo } = require("./service");
const { sendMessageToQueue } = require("./service");

/**
 * Handles updating a task by its ID.
 * @param {string} task_id - The ID of the task to update
 * @param {Object} data - The update fields (title, description, status, etc.)
 */
exports.handleUpdateTask = async (task_id, data) => {
  // Basic validation
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No update data provided");
  }

  // Always update the timestamp
  data.updated_at = new Date().toISOString();

  // Update the task in DynamoDB
  const updatedTask = await updateTaskInDynamo(task_id, data);

  // Send update notification to SQS
  await sendMessageToQueue({
    task_id,
    type: "task_updated",
    fields_changed: Object.keys(data),
    timestamp: data.updated_at,
  });

  return updatedTask;
};
