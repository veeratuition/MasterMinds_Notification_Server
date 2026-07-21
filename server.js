const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const notificationRoutes = require("./routes/notification");
app.use("/api/notification", notificationRoutes);

app.get("/", (req, res) => {
  res.send("✅ Master Minds Notification Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});