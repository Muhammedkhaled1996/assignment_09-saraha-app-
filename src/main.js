import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import cors from "cors";
import { globalErrorHandling } from "./middleware/error.middleware.js";
import {
  userModule,
  messageModule,
  authenticationModule,
} from "./modules/index.js";
import { bootstrapDB } from "./DB/connections.js";
import { PORT } from "./config.js";
const app = express();
const port = PORT;

bootstrapDB(app, port);

app.use(cors(), express.json());

app.get("/", (req, res, next) => {
  res.send({ message: "Welcome to saraha app" });
});

app.use("/auth", authenticationModule);
app.use("/users", userModule);
app.use("/messages", messageModule);

app.use("{/*dummy}", (req, res) =>
  res.status(404).send({ message: "Invalid app router" }),
);

app.use(globalErrorHandling);
