const { sendNotification } = require("./service");

/**
 * Handles an incoming task notification message.
 * @param {Object} message - The message payload from SQS
 */
exports.handleNotification = async (message) => {
  const { task_id, user_id, type, timestamp, fields_changed } = message;

  if (!task_id || !type) {
    throw new Error("Invalid message format");
  }

  // Construct a simple notification message
  let content = `Task ${task_id} has been ${type.replace("task_", "")}.`;

  if (fields_changed && Array.isArray(fields_changed)) {
    content += ` Updated fields: ${fields_changed.join(", ")}`;
  }

  content += ` (Event time: ${timestamp})`;

  // Simulate sending the notification (to console, email, etc.)
  await sendNotification(user_id, content);
};
