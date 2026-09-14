import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { SignatureLevelEnum, TokenEnum } from "../../common/enum/index.js";

import { findOne } from "./../repository/index.js";
import {
  ACCESS_SYSTEM_TOKEN_SIGNATURE,
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_USER_TOKEN_SIGNATURE,
  REFRESH_SYSTEM_TOKEN_SIGNATURE,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_USER_TOKEN_SIGNATURE,
} from "./../../config.js";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/errors.exceptions.js";
import { get, revokeTokenKey, set } from "../services/index.js";

export const privileges = (user) => {
  return user.privileges.map((pre) => {
    return pre.code;
  });
};

export const generateToken = async ({
  payload,
  secret = ACCESS_USER_TOKEN_SIGNATURE,
  options = { expiresIn: Number(ACCESS_TOKEN_EXPIRES_IN) },
} = {}) => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = async ({
  token,
  secret = ACCESS_USER_TOKEN_SIGNATURE,
} = {}) => {
  return jwt.verify(token, secret);
};
export const detectSignatureLevel = async (system) => {
  let signatureLevel = SignatureLevelEnum.Bearer;
  switch (system) {
    case true:
      signatureLevel = SignatureLevelEnum.System;
      break;
    default:
      signatureLevel = SignatureLevelEnum.Bearer;
      break;
  }

  return signatureLevel;
};

export const getSignatures = async (
  signatureLevel = SignatureLevelEnum.Bearer,
) => {
  const signatures = {
    access_signature: "",
    refresh_signature: "",
  };
  console.log({ signatureLevel });

  switch (signatureLevel) {
    case SignatureLevelEnum.System:
      signatures.access_signature = ACCESS_SYSTEM_TOKEN_SIGNATURE;
      signatures.refresh_signature = REFRESH_SYSTEM_TOKEN_SIGNATURE;
      break;

    default:
      signatures.access_signature = ACCESS_USER_TOKEN_SIGNATURE;
      signatures.refresh_signature = REFRESH_USER_TOKEN_SIGNATURE;
      break;
  }

  return signatures;
};

export const createLoginCredentials = async (user) => {
  const signatureLevel = await detectSignatureLevel(
    privileges(user).some((code) => code >= 8000),
  );
  const signatures = await getSignatures(signatureLevel);
  console.log({ signatures });

  const jwtid = randomUUID();
  const access_token = await generateToken({
    payload: { _id: user._id },
    secret: signatures.access_signature,
    options: { expiresIn: Number(ACCESS_TOKEN_EXPIRES_IN), jwtid },
  });

  const refresh_token = await generateToken({
    payload: { _id: user._id },
    secret: signatures.refresh_signature,
    options: { expiresIn: Number(REFRESH_TOKEN_EXPIRES_IN), jwtid },
  });
  return { access_token, refresh_token };
};

export const decodeToken = async ({
  model: UserModel,
  authorization,
  tokenType = TokenEnum.Access,
  lang = "ar",
} = {}) => {
  const [bearerKey, token] = authorization.split(" ");
  if (!bearerKey || !token) {
    return UnauthorizedException({
      message:
        lang == "en"
          ? "missing token parts"
          : "برجاء ادخل ال authorization  بشكل صحيح ",
    });
  }
  const signatures = await getSignatures(bearerKey);
  console.log({ signatures });

  const decoded = await verifyToken({
    token,
    secret:
      tokenType === TokenEnum.Refresh
        ? signatures.refresh_signature
        : signatures.access_signature,
  });

  if (!decoded?._id || !decoded?.iat) {
    return BadRequestException({
      message:
        lang == "en" ? "invalid token payload" : "خطاء في محتوي ال token",
    });
  }
  if (decoded.jti && (await get(revokeTokenKey(decoded._id, decoded.jti)))) {
    return UnauthorizedException({
      message:
        lang == "en"
          ? "invalid or old login credentials kindly login again"
          : "عفوا لاكن هذه السشن منتهيه الصلاحيه برجاء اعاده  تسجيل الدخول من جديد",
    });
  }

  const user = await findOne({
    model: UserModel,
    filter: { _id: decoded._id },
    options: {
      populate: [{ path: "privileges", select: "code" }],
    },
  });
  if (!user) {
    return NotFoundException({
      message: lang == "en" ? "Not registered account" : "حساب غير مسجل",
    });
  }

  if ((user.changeCredentialsTime?.getTime() || 0) > decoded.iat * 1000) {
    return NotFoundException({
      message: lang == "en" ? "Not registered account" : "حساب غير مسجل",
    });
  }

  return { user, decoded };
};

export const createRevokeToken = async (decoded) => {
  await set(
    revokeTokenKey(decoded._id, decoded.jti),
    decoded.jti,
    decoded.iat + Number(REFRESH_TOKEN_EXPIRES_IN),
  );
};
