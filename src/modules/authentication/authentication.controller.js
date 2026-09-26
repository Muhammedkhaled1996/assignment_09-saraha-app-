import { Router } from "express";
import { successResponce } from "./../../common/utils/success.responce.js";
import {
  signup,
  login,
  privilege,
  rotateToken,
  siginUpWithGmail,
} from "./authentication.services.js";
import { TokenEnum } from "../../common/enum/TokenEnum.js";
import {
  authentication,
  authorization,
} from "./../../middleware/authentication.middleware.js";
import { userRole } from "../../common/enum/userRole.enum.js";
import * as validators from "./authentication.validation.js";
import { validation } from "../../middleware/validation.middleware.js";

const router = Router();

// signup with system
router.post(
  "/signup",
  validation(validators.signup),
  async (req, res, next) => {
    const data = await signup(req.validate, `${req.protocol}://${req.host}`);
    return successResponce({ res, data, status: 201 });
  },
);

// login with system
router.post("/login", validation(validators.login), async (req, res, next) => {
  const data = await login(req.validate, `${req.protocol}://${req.host}`);
  return successResponce({ res, data });
});

// Create privileges for users
router.post(
  "/privilege",
  authentication(),
  authorization(userRole.admin),
  async (req, res, next) => {
    const data = await privilege(req.body);
    return successResponce({ res, data });
  },
);

// rotate-token
router.post(
  "/rotate-token",
  authentication(TokenEnum.Refresh),
  async (req, res, next) => {
    const data = await rotateToken(req.payload, req.user);
    return successResponce({ res, data });
  },
);

// sigin with gmail
router.post("/sigup-with-gmail", async (req, res, next) => {
  const { status, data } = await siginUpWithGmail(
    req.body,
    `${req.protocol}://${req.host}`,
  );
  return successResponce({ res, data, status });
});

export default router;
