import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import index from "./routes";
import { dbURL } from "./config/db.config";

require("express-async-errors");

const app = express();
const port = process.env.PORT || 3001;
app.set("port", port);

// connect to mongodb
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`connected to db and app started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`some thing went wrong:- ${error.message}`);
    process.exit();
  });

const swaggerDocument = YAML.load(`${process.cwd()}/server/swagger.yaml`);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", index);

app.use((err, req, res, next) => {
  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "note already exists",
    });
  }

  if (err.name === "CastError") {
    return res.status(404).json({
      success: false,
      message: "note not found",
    });
  }

  /* istanbul ignore next */
  return res.status(400).json({
    success: false,
    message: err.message,
  });
});

export default app;
