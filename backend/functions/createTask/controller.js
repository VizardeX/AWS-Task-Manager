const { v4: uuidv4 } = require("uuid");
const { saveTaskToDynamo } = require("./service");
const { saveTaskToRDS } = require("./service");
const { uploadFileToS3 } = require("./service");
const { sendMessageToQueue } = require("./service");

/**
 * Handles the business logic for creating a task.
 * @param {Object} data - Incoming task data from API Gateway
 */
exports.handleCreateTask = async (data) => {
  // Basic validation (expand as needed)
  if (!data.title || !data.user_id) {
    throw new Error("Missing required fields: title or user_id");
  }

  // Generate unique task ID
  const task_id = uuidv4();

  // Prepare the task metadata for DynamoDB
  const taskMetadata = {
    task_id,
    title: data.title,
    description: data.description || "",
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    attachment_url: "", // placeholder for now
    owner_id: data.user_id,
  };

  // handle file attachment if present
  if (data.file && data.file.name && data.file.content) {
    const s3Result = await uploadFileToS3(data.file, task_id);
    taskMetadata.attachment_url = s3Result.url;
  }

  // Save to DynamoDB 
  await saveTaskToDynamo(taskMetadata);

  // Save relation to RDS 
  await saveTaskToRDS(task_id, data.user_id);

  // send a message to the SQS queue for notifications
  await sendMessageToQueue({
    task_id,
    user_id: data.user_id,
    type: "task_created",
    timestamp: new Date().toISOString(),
  });

  return taskMetadata;
};
