const {
  deleteTaskFromDynamo,
  deleteTaskFromRDS,
  deleteAttachmentFromS3,
  sendMessageToQueue,
} = require("./service");

/**
 * Orchestrates deletion of a task from all related resources.
 * @param {string} task_id - The ID of the task to delete
 */
exports.handleDeleteTask = async (task_id) => {
  // First, retrieve the task (to get the attachment URL if it exists)
  const task = await deleteTaskFromDynamo(task_id); // This should return the deleted task metadata

  // Delete attachment from S3 if it exists
  if (task?.attachment_url) {
    await deleteAttachmentFromS3(task.attachment_url);
  }

  // Delete task-user relationship from RDS
  await deleteTaskFromRDS(task_id);

  // Send delete notification to SQS
  await sendMessageToQueue({
    task_id,
    type: "task_deleted",
    timestamp: new Date().toISOString(),
  });
};
