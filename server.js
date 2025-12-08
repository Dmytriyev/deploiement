import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import db from "./db/db.js";
import cors from "cors";
import postRoutes from "./routes/post.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
db().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// routes----------
app.use("/post", postRoutes);
