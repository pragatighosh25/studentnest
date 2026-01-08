
import app from "./src/app.js";
import mongoose from "mongoose";


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected 🟢");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("Mongo connection error 🔴", err);
  });

