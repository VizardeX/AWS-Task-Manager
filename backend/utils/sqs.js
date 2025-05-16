const AWS = require("aws-sdk");

const sqs = new AWS.SQS();

/**
 * Sends a message to an SQS queue.
 * @param {string} queueUrl - The full URL of the target SQS queue.
 * @param {Object} message - The message payload to send (must be serializable).
 */
exports.sendToQueue = async (queueUrl, message) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  };

  try {
    const result = await sqs.sendMessage(params).promise();
    console.log("Message sent to SQS:", result.MessageId);
    return result;
  } catch (error) {
    console.error("SQS sendMessage error:", error);
    throw new Error("Failed to send message to SQS");
  }
};


