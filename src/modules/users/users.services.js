import { create, findOne } from "../../common/repository/index.js";
import {
  compared,
  decryption,
  encryption,
  hashed,
} from "../../common/security/index.js";
import { UserModel } from "./../../DB/module/user.model.js";
import {
  ConflictException,
  NotFoundException,
} from "./../../common/exceptions/index.js";

export const signup = async ({ email, password, userName, phone }) => {
  const userExists = await findOne({
    model: UserModel,
    filter: { email },
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
    },
    lean: true,
  });
  return account;
};

export const login = async ({ email, password }) => {
  let account = await findOne({
    model: UserModel,
    filter: { email },
  });

  if (!account) {
    throw NotFoundException({
      message: "Invalid user email",
    });
  }
  const match = await compared({
    plainText: password,
    ciperText: account.password,
  });
  if (!match) {
    throw NotFoundException({
      message: "Invalid user password",
    });
  }

  account.phone = await decryption(account.phone);
  return account;
};
