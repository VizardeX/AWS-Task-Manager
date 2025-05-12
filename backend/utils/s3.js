// s3.js

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

/**
 * Uploads a file to S3.
 * @param {string} bucketName - Name of the S3 bucket.
 * @param {string} key - File path/key in the bucket (e.g., "attachments/task123/file.txt").
 * @param {string} base64Content - Base64-encoded content of the file.
 */
exports.putObject = async (bucketName, key, base64Content) => {
  const buffer = Buffer.from(base64Content, "base64");

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ACL: "public-read", // or "private" based on your use case
  };

  try {
    await s3.putObject(params).promise();
    console.log(`File uploaded to S3: ${key}`);
    return { key };
  } catch (error) {
    console.error("S3 putObject error:", error);
    throw new Error("Failed to upload file to S3");
  }
};
