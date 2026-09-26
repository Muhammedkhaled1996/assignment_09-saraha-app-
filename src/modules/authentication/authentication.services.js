import { providerEnum } from "../../common/enum/porvider.enum.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/errors.exceptions.js";
import {
  create,
  createOne,
  findOne,
} from "../../common/repository/db.repository.js";
import { createLoginCredentials } from "../../common/security/token.security.js";
import { ACCESS_TOKEN_EXPIRES_IN, WEB_CLIENT_IDS } from "../../config.js";
import { UserModel, UserPrivilege } from "../../DB/module/user.model.js";
import { OAuth2Client } from "google-auth-library";
import { compared, hashed } from "./../../common/security/hash.security.js";
import { encryption } from "../../common/security/encryption.security.js";

const client = new OAuth2Client();

async function verifyGoogleAccount(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: WEB_CLIENT_IDS,
  });
  const payload = ticket.getPayload();
  return payload;
}

export const signup = async (
  { email, password, confirmPassword, userName, phone, privileges = [] },
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
      confirmPassword: await hashed({ plainText: confirmPassword }),
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
    filter: { email, provider: providerEnum.SYSTEM },
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

export const siginUpWithGmail = async ({ idToken }, issuer) => {
  const { name, email, picture, email_verified } =
    await verifyGoogleAccount(idToken);

  if (!email_verified) {
    throw BadRequestException({ message: "Email not verified" });
  }

  const existAccount = await findOne({ model: UserModel, filter: { email } });

  if (existAccount) {
    if (existAccount.provider != providerEnum.GOOGLE) {
      throw ConflictException({ message: "Invalid account provider" });
    }
    return {
      status: 200,
      data: await createLoginCredentials(existAccount, issuer),
    };
  }

  const user = await createOne({
    model: UserModel,
    data: {
      userName: name,
      email,
      confirmEmail: new Date(),
      provider: providerEnum.GOOGLE,
      image: picture,
    },
  });

  return { status: 201, data: await createLoginCredentials(user, issuer) };
};
