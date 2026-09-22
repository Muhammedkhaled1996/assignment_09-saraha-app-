import {
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/errors.exceptions.js";
import { createLoginCredentials } from "../../common/security/token.security.js";
import { ACCESS_TOKEN_EXPIRES_IN } from "../../config.js";
import { UserModel } from "../../DB/module/user.model.js";

export const Profile = (user) => {
  return user;
};

export const update = async (user, { userName }) => {
  const existingUser = await UserModel.findById(user.id);

  if (!existingUser) {
    throw NotFoundException("user not found");
  }

  existingUser.userName = userName;
  await existingUser.save();

  return existingUser;
};

export const rotateToken = async (payload, user) => {
  const accessExpiresIn = (payload.iat + ACCESS_TOKEN_EXPIRES_IN) * 1000;
  const currentTime = Date.now() + 5 * 60000;

  if (currentTime < accessExpiresIn) {
    throw ConflictException({
      message:
        "Sorry we cannot create new login credentials while current access token still within valid time range",
    });
  }

  const { access_token, refresh_token } = await createLoginCredentials(user);

  return { access_token, refresh_token };
};
