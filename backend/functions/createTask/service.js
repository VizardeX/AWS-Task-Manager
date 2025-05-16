const { putItem } = require("../../utils/dynamo");
const { insertTaskRelation } = require("../../utils/rds");
const { putObject } = require("../../utils/s3");
const { sendToQueue } = require("../../utils/sqs");

/**
 * Save task metadata to DynamoDB.
 * @param {Object} taskMetadata - The full task details
 */
exports.saveTaskToDynamo = async (taskMetadata) => {
  const tableName = process.env.DYNAMO_TABLE_NAME || "TaskMetadata";
  return await putItem(tableName, taskMetadata); // 
};

/**
 * Save task-user relationship to RDS.
 * @param {string} task_id - Unique task ID
 * @param {string} user_id - ID of the task owner
 */
exports.saveTaskToRDS = async (task_id, user_id) => {
  const sql = `INSERT INTO task_user (task_id, user_id) VALUES ($1, $2)`;
  return await insertTaskRelation(sql, [task_id, user_id]);
};

/**
 * Upload a file to S3 and return its public URL.
 * @param {Object} file - { name, content (base64) }
 * @param {string} task_id - Used as part of the S3 key
 */
exports.uploadFileToS3 = async (file, task_id) => {
  const key = `attachments/${task_id}/${file.name}`;
  const bucket = process.env.S3_BUCKET_NAME || "task-attachments-bucket1";
  const result = await putObject(bucket, key, file.content);
  return { url: `https://${bucket}.s3.amazonaws.com/${key}` };
};

/**
 * Send a task notification message to the SQS queue.
 * @param {Object} msg - Message to send (task_id, user_id, etc.)
 */
exports.sendMessageToQueue = async (msg) => {
  return await sendToQueue(process.env.SQS_QUEUE_URL, msg); // Replace with your actual SQS URL
};
