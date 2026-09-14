import { Router } from "express";
import { login, signup } from "./users.services.js";
import {successResponce} from "../../common/utils/index.js"

const router = Router();

router.post("/signup", async (req, res, next) => {
  const data = await signup(req.body);
  return successResponce({ res, data, status: 201 });
});

router.post("/login", async (req, res, next) => {
  const data = await login(req.body);
  return successResponce({ res, data });
});

export default router;
