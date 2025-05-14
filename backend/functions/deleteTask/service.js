const { deleteItem } = require("../../utils/dynamo");
const { deleteRelation } = require("../../utils/rds");
const { deleteObject } = require("../../utils/s3");
const { sendToQueue } = require("../../utils/sqs");

/**
 * Delete a task from DynamoDB and return the deleted item.
 * @param {string} task_id - ID of the task to delete
 */
exports.deleteTaskFromDynamo = async (task_id) => {
  const tableName = "TasksTable"; // Replace with your actual table name

  const deletedItem = await deleteItem(tableName, task_id);
  return deletedItem;
};

/**
 * Delete the user-task relation from RDS.
 * @param {string} task_id - ID of the task to remove from RDS
 */
exports.deleteTaskFromRDS = async (task_id) => {
  const sql = `DELETE FROM task_user WHERE task_id = ?`;
  await deleteRelation(sql, [task_id]);
};

/**
 * Delete a file from S3 based on its full URL.
 * @param {string} attachmentUrl - The full S3 file URL
 */
exports.deleteAttachmentFromS3 = async (attachmentUrl) => {
  // Extract bucket and key from the URL
  const url = new URL(attachmentUrl);
  const bucketName = url.hostname.split(".")[0]; // e.g., your-bucket-name
  const key = decodeURIComponent(url.pathname.slice(1)); // remove leading slash

  await deleteObject(bucketName, key);
};

/**
 * Send a deletion notification to SQS.
 * @param {Object} message - Message payload
 */
exports.sendMessageToQueue = async (message) => {
  const queueUrl = "https://sqs.us-east-1.amazonaws.com/123456789012/YourQueue"; // Replace as needed
  return await sendToQueue(queueUrl, message);
};
