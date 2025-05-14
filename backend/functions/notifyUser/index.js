const { handleNotification } = require("./controller");


//Lambda handler triggered by SQS event.
//Processes each message asynchronously.

exports.handler = async (event) => {
  const results = [];

  for (const record of event.Records) {
    try {
      const message = JSON.parse(record.body);
      await handleNotification(message);
      results.push({ messageId: record.messageId, status: "processed" });
    } catch (error) {
      console.error("Failed to process message:", error);
      results.push({ messageId: record.messageId, status: "failed" });
    }
  }

  return { results };
};
