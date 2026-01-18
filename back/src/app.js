import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import pgRoutes from "./routes/pg.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import ownerPGRoutes from "./routes/ownerPG.routes.js";
import publicPgRoutes from "./routes/publicPG.routes.js";

const app = express();

/* ✅ CORS (update your frontend domain later) */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://studentnest-nine.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

/* ✅ MongoDB connect (works for Vercel serverless too) */
if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected 🟢"))
    .catch((err) => console.error("Mongo connection error 🔴", err));
}

/* ✅ Health / root route */
app.get("/", (req, res) => {
  res.send("StudentNest backend running 🚀");
});

/* ✅ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/owner", ownerPGRoutes);
app.use("/api", publicPgRoutes);

export default app;
