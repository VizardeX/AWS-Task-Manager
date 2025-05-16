// service.js

/**
 * Simulates sending a notification (log, email, etc.).
 * Replace this with actual SNS/email logic in the future.
 * 
 * @param {string} user_id - The ID of the user to notify
 * @param {string} message - The notification message
 */
exports.sendNotification = async (user_id, message) => {
  // For now, we'll simulate by logging
  console.log(`Notification for user [${user_id}]: ${message}`);

  // In a real system, we'd do:
  // - Send an email via SES or third-party service
  // - Send a push notification
  // - Log to an analytics/event system
};
