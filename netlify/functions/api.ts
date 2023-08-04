import express, { Router } from "express";
import serverless from "serverless-http";
import api from "../../server/api";
const app = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use("/api/", api);

export const handler = serverless(app);
