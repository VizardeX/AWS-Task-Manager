const mysql = require("mysql2/promise"); // or replace with 'pg' if you're using PostgreSQL

// Create a connection pool (reuse across calls)
// IMPORTANT: Replace with your actual RDS credentials and config
const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  waitForConnections: true,
  connectionLimit: 5,
});

/**
 * Insert a task-user relationship into the RDS database.
 * @param {string} sql - The SQL query string
 * @param {Array} values - Parameterized values (e.g., [task_id, user_id])
 */
exports.insertTaskRelation = async (sql, values) => {
  try {
    const [result] = await pool.execute(sql, values);
    console.log("Inserted task-user relation into RDS");
    return result;
  } catch (error) {
    console.error("RDS insertTaskRelation error:", error);
    throw new Error("Failed to insert task relation into RDS");
  }
};

/**
 * Deletes a task-user relationship from RDS.
 * @param {string} sql - The DELETE SQL query
 * @param {Array} values - Query parameters (e.g., [task_id])
 */
exports.deleteRelation = async (sql, values) => {
  try {
    const [result] = await pool.execute(sql, values);
    console.log("Deleted task-user relation from RDS");
    return result;
  } catch (error) {
    console.error("RDS deleteRelation error:", error);
    throw new Error("Failed to delete relation from RDS");
  }
};
