import { Router } from "express";
import { successResponce } from "../../common/utils/index.js";

import { Profile, update } from "./users.services.js";

import { authentication } from "../../middleware/authentication.middleware.js";

const router = Router();

router.get("/", authentication(), async (req, res, next) => {
  const data = await Profile(req.user);
  return successResponce({ res, data });
});

router.patch("/", authentication(), async (req, res, next) => {
  const data = await update(req.user, req.body);
  return successResponce({ res, data });
});


export default router;
