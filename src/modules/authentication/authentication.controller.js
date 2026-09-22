import { Router } from "express";
import { authentication } from "../../middleware/authentication.middleware.js";
import { successResponce } from "./../../common/utils/success.responce.js";
import { Profile, rotateToken, update } from "./authentication.services.js";
import { TokenEnum } from "../../common/enum/TokenEnum.js";

const router = Router();

router.get("/", authentication(), async (req, res, next) => {
  const data = await Profile(req.user);
  return successResponce({ res, data });
});

router.patch("/", authentication(), async (req, res, next) => {
  const data = await update(req.user, req.body);
  return successResponce({ res, data });
});

router.post(
  "/rotate-token",
  authentication(TokenEnum.Refresh),
  async (req, res, next) => {
    const data = await rotateToken(req.payload,req.user);
    return successResponce({ res, data });
  },
);

export default router;
