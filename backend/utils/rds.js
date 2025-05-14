const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT || 5432,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
});

/**
 * Executes a SQL query (INSERT, DELETE, etc.).
 * @param {string} sql - The SQL statement
 * @param {Array} values - The parameter values
 */
exports.insertTaskRelation = async (sql, values) => {
  try {
    const result = await pool.query(sql, values);
    return result;
  } catch (error) {
    console.error("RDS insertTaskRelation error:", error);
    throw new Error("Failed to insert task relation into RDS");
  }
};

exports.deleteRelation = async (sql, values) => {
  try {
    const result = await pool.query(sql, values);
    return result;
  } catch (error) {
    console.error("RDS deleteRelation error:", error);
    throw new Error("Failed to delete task relation from RDS");
  }
};
