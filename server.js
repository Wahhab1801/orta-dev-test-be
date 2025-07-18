import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swaggerConfig.js";

import userRouter from "./routes/userRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";
import shiftsRouter from "./routes/shiftsRoute.js";

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
mongoose.set("strictQuery", true);

//middlewares
app.use(express.json());
app.use(cors());

//db config
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connected");
    }
  }
);

//api endpoints
app.use("/api/user", userRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);
app.use("/api/shifts", shiftsRouter);
// Swagger Docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
