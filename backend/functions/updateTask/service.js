const { updateItem } = require("../../utils/dynamo");
const { sendToQueue } = require("../../utils/sqs");

/**
 * Updates a task in DynamoDB using the given task ID and fields.
 * @param {string} task_id - The task's unique identifier
 * @param {Object} updates - Key-value pairs of fields to update
 */
exports.updateTaskInDynamo = async (task_id, updates) => {
  const tableName = "TasksTable"; // Replace with your actual DynamoDB table name

  try {
    const result = await updateItem(tableName, task_id, updates);
    console.log("Task updated in DynamoDB:", result);
    return result;
  } catch (error) {
    console.error("Error updating task in DynamoDB:", error);
    throw new Error("Failed to update task");
  }
};

/**
 * Sends an update message to the SQS queue.
 * @param {Object} message - The message payload
 */
exports.sendMessageToQueue = async (message) => {
  const queueUrl = "https://sqs.us-east-1.amazonaws.com/123456789012/YourQueue"; // Replace with actual URL
  return await sendToQueue(queueUrl, message);
};
