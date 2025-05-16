const { deleteItem } = require("../../utils/dynamo");
const { deleteRelation } = require("../../utils/rds");
const { deleteObject } = require("../../utils/s3");
const { sendToQueue } = require("../../utils/sqs");

/**
 * Delete a task from DynamoDB and return the deleted item.
 * @param {string} task_id - ID of the task to delete
 */
exports.deleteTaskFromDynamo = async (task_id) => {

  const tableName = process.env.DYNAMO_TABLE_NAME || "TaskMetadata";

  const deletedItem = await deleteItem(tableName, task_id);
  return deletedItem;
};

/**
 * Delete the user-task relation from RDS.
 * @param {string} task_id - ID of the task to remove from RDS
 */
exports.deleteTaskFromRDS = async (task_id) => {
  const sql = `DELETE FROM task_user WHERE task_id = $1`;
  await deleteRelation(sql, [task_id]);
};

/**
 * Delete a file from S3 based on its full URL.
 * @param {string} attachmentUrl - The full S3 file URL
 */
exports.deleteAttachmentFromS3 = async (attachmentUrl) => {
  // Extract bucket and key from the URL
  const url = new URL(attachmentUrl);
  const key = decodeURIComponent(url.pathname.slice(1)); // remove leading slash
  const bucket = process.env.S3_BUCKET_NAME || "task-attachments-bucket1";

  await deleteObject(bucket, key);
};

/**
 * Send a deletion notification to SQS.
 * @param {Object} message - Message payload
 */
exports.sendMessageToQueue = async (message) => {
  return await sendToQueue(process.env.SQS_QUEUE_URL, message);
};