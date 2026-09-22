import mongoose from "mongoose";
import { create, find, findOne } from "../../common/repository/index.js";
import {
  compared,
  createLoginCredentials,
  encryption,
  hashed,
} from "../../common/security/index.js";
import { UserModel, UserPrivilege } from "./../../DB/module/user.model.js";
import {
  ConflictException,
  NotFoundException,
} from "./../../common/exceptions/index.js";

export const signup = async (
  { email, password, userName, phone, privileges = [] },
  issuer,
) => {
  const userExists = await findOne({
    model: UserModel,
    filter: { email },
    populate: [{ path: "privileges", select: "code" }],
  });
  if (userExists) {
    throw ConflictException({
      message: "User already exists",
    });
  }

  const account = await create({
    model: UserModel,
    data: {
      email,
      password: await hashed({ plainText: password }),
      userName,
      phone: await encryption(phone),
      privileges,
    },
  });

  const { access_token, refresh_token } = await createLoginCredentials(
    account[0],
    issuer,
  );
  return { access_token, refresh_token };
};

export const login = async ({ email, password }, issuer) => {
  const user = await findOne({
    model: UserModel,
    filter: { email },
    populate: [{ path: "privileges", select: "code" }],
  });
  if (!user) {
    throw NotFoundException({
      message: "Invalid credantials",
    });
  }

  const ciperPassword = user.password;

  const match = await compared({
    ciperText: ciperPassword,
    plainText: password,
  });
  if (!match) {
    throw NotFoundException({
      message: "Invalid credantials",
    });
  }

  const { access_token, refresh_token } = await createLoginCredentials(
    user,
    issuer,
  );
  return { access_token, refresh_token };
};

export const privilege = async ({ name, code }) => {
  const privilegeExists = await findOne({
    model: UserPrivilege,
    filter: { name, code },
  });
  if (privilegeExists) {
    throw ConflictException({
      message: "Privilege Exists",
    });
  }

  const privilege = await create({
    model: UserPrivilege,
    data: {
      name,
      code,
    },
  });
  return privilege;
};
