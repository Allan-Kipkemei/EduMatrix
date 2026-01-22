const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Routes = require("./routes/route.js");

const PORT = 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB connection (hardcoded URI)
mongoose
  .connect(
  ("mongodb+srv://allankiplagatkipkemei_db_user:YqqyzsmBVuuGxcq1@cluster0.qshthor.mongodb.net/"),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use("/", Routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
