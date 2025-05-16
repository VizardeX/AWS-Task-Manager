require("dotenv").config();
const { handler } = require("./index");
const event = require("../../events/sample-delete-task.json");

handler(event)
  .then((res) => {
    console.log("Lambda Response:");
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err) => {
    console.error("Lambda Error:", err);
  });
