const { putItem } = require("../../utils/dynamo");
const { insertTaskRelation } = require("../../utils/rds");
const { putObject } = require("../../utils/s3");
const { sendToQueue } = require("../../utils/sqs");

/**
 * Save task metadata to DynamoDB.
 * @param {Object} taskMetadata - The full task details
 */
exports.saveTaskToDynamo = async (taskMetadata) => {
  return await putItem("TasksTable", taskMetadata); // Adjust table name as needed
};

/**
 * Save task-user relationship to RDS.
 * @param {string} task_id - Unique task ID
 * @param {string} user_id - ID of the task owner
 */
exports.saveTaskToRDS = async (task_id, user_id) => {
  const sql = `INSERT INTO task_user (task_id, user_id) VALUES (?, ?)`;
  return await insertTaskRelation(sql, [task_id, user_id]);
};

/**
 * Upload a file to S3 and return its public URL.
 * @param {Object} file - { name, content (base64) }
 * @param {string} task_id - Used as part of the S3 key
 */
exports.uploadFileToS3 = async (file, task_id) => {
  const key = `attachments/${task_id}/${file.name}`;
  const result = await putObject("your-bucket-name", key, file.content); // Adjust bucket name
  return { url: `https://your-bucket-name.s3.amazonaws.com/${key}` };
};

/**
 * Send a task notification message to the SQS queue.
 * @param {Object} msg - Message to send (task_id, user_id, etc.)
 */
exports.sendMessageToQueue = async (msg) => {
  return await sendToQueue("YourQueueURL", msg); // Replace with your actual SQS URL
};
