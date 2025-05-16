const { getTasksByUser } = require("./service");

/**
 * Retrieves all tasks for a specific user.
 * @param {string} user_id - User to filter by
 */
exports.handleGetAllTasks = async (user_id) => {
  if (!user_id) throw new Error("Missing user_id");
  return await getTasksByUser(user_id);
};
