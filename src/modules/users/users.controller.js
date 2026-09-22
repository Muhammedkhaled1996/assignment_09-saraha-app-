import { Router } from "express";
import { login, privilege, signup } from "./users.services.js";
import { successResponce } from "../../common/utils/index.js";
import {
  authentication,
  authorization,
} from "../../middleware/authentication.middleware.js";
import { userRole } from "./../../common/enum/index.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const data = await signup(req.body, `${req.protocol}://${req.host}`);
  return successResponce({ res, data, status: 201 });
});

router.post("/login", async (req, res, next) => {
  const data = await login(req.body, `${req.protocol}://${req.host}`);
  return successResponce({ res, data });
});

router.post(
  "/privilege",
  authentication(),
  authorization(userRole.admin),
  async (req, res, next) => {
    const data = await privilege(req.body);
    return successResponce({ res, data });
  },
);

export default router;
