const AWS = require("aws-sdk");

// Initialize DynamoDB DocumentClient
const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Put an item into a DynamoDB table.
 * @param {string} tableName - The name of the DynamoDB table.
 * @param {Object} item - The item to store.
 */
exports.putItem = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
  };

  try {
    await dynamo.put(params).promise();
    console.log(`Item inserted into ${tableName}`);
    return item;
  } catch (error) {
    console.error("DynamoDB putItem error:", error);
    throw new Error("Failed to save task to DynamoDB");
  }
};
