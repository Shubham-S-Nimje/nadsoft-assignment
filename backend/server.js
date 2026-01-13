const app = require("./app");
const { sequelize, syncDatabase } = require("./models");

const PORT = process.env.PORT || 5000;

// database connection
const startServer = async () => {
  try {
    // connection testing
    await sequelize.authenticate();
    console.log("Database connection successful");

    // await syncDatabase();

    // start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
};

startServer();

//  shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  await sequelize.close();
  console.log("Database connection closed");
  process.exit(0);
});
