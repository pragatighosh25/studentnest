import app from "./src/app.js";
import mongoose from "mongoose";

if (process.env.NODE_ENV !== "production") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected 🟢");
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => {
      console.error("Mongo connection error 🔴", err);
    });
}


