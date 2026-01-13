const express = require("express");

const app = express();
const PORT = 4000;

// route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
