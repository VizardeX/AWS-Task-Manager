const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" }); 

// Initialize DynamoDB DocumentClient
const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Inserts an item into DynamoDB.
 * @param {string} tableName - Table name
 * @param {Object} item - The item to store
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
    throw new Error("Failed to save item to DynamoDB");
  }
};

/**
 * Updates specified fields in an existing item in DynamoDB.
 * @param {string} tableName - The name of the table
 * @param {string} task_id - The task ID (Partition Key)
 * @param {Object} updates - Key-value pairs of fields to update
 */
exports.updateItem = async (tableName, task_id, updates) => {
  // Build the UpdateExpression and ExpressionAttributeValues
  const updateKeys = Object.keys(updates);
  const updateExpressions = updateKeys.map((key, i) => `#field${i} = :value${i}`); // tells DynamoDB what fields to change
  const expressionAttributeNames = {}; // tells DynamoDB what the field names are to avoid reserved word collisions
  const expressionAttributeValues = {}; // tells DynamoDB what the new values are

  updateKeys.forEach((key, i) => {
    expressionAttributeNames[`#field${i}`] = key;
    expressionAttributeValues[`:value${i}`] = updates[key];
  });

  const params = {
    TableName: tableName,
    Key: { task_id },
    UpdateExpression: `SET ${updateExpressions.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamo.update(params).promise();
    console.log("DynamoDB updateItem result:", result);
    return result.Attributes;
  } catch (error) {
    console.error("DynamoDB updateItem error:", error);
    throw new Error("Failed to update item in DynamoDB");
  }
};

/**
 * Deletes a task from DynamoDB by task_id and returns the deleted item.
 * @param {string} tableName - The name of the DynamoDB table
 * @param {string} task_id - The ID of the task to delete
 */
exports.deleteItem = async (tableName, task_id) => {
  const params = {
    TableName: tableName,
    Key: { task_id },
    ReturnValues: "ALL_OLD", // Returns the deleted item
  };

  try {
    const result = await dynamo.delete(params).promise();
    console.log("Deleted item from DynamoDB:", result.Attributes);
    return result.Attributes;
  } catch (error) {
    console.error("DynamoDB deleteItem error:", error);
    throw new Error("Failed to delete item from DynamoDB");
  }
};

/**
 * Retrieves a task from DynamoDB by task_id.
 * @param {string} tableName - The name of the DynamoDB table
 * @param {string} task_id - The ID of the task to retrieve
 * @returns {Object|null} The task item or null if not found
 */
exports.getItem = async (tableName, task_id) => {
  const params = {
    TableName: tableName,
    Key: { task_id },
  };

  try {
    const result = await dynamo.get(params).promise();
    console.log("Retrieved item from DynamoDB:", result.Item);
    return result.Item || null;
  } catch (error) {
    console.error("DynamoDB getItem error:", error);
    throw new Error("Failed to retrieve item from DynamoDB");
  }
};

