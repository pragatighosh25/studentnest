import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import ownerRoutes from "./routes/owner.routes.js";
import pgRoutes from "./routes/pg.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudentNest backend running 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/admin", adminRoutes);

export default app;
