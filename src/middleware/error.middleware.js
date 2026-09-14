/*  تشفير كلمة المرور باستخدام argon2

import argon2 from "argon2";
export const hashPassword = async (password) => {
  try {
    const hashedValue = await argon2.hash(password, {
      type: argon2.argon2id, // 1️⃣ النوع الموصى به
      memoryCost: 65536, // 2️⃣ استهلاك الذاكرة: 64 ميجابايت (بالكيلوبايت)
      timeCost: 3, // 3️⃣ عدد الدورات عبر الذاكرة
      parallelism: 4, // 4️⃣ عدد المسارات (Threads)
    });
    return hashedValue;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password", { cause: { status: 500 } });
  }
};

// 1. دالة التحقق
export const verifyPassword = async (hashedPassword, plainPassword) => {
  try {
    // ترجع true إذا كانت كلمة المرور صحيحة، و false إذا كانت خاطئة
    return await argon2.verify(hashedPassword, plainPassword);
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Failed to verify password", { cause: { status: 500 } });
  }
};

// 2. تجربة عملية
const storedHash = await hashPassword("myPassword123");

// محاولة دخول بكلمة مرور صحيحة
const isCorrect = await verifyPassword(storedHash, "myPassword123");
console.log(isCorrect); // true

// محاولة دخول بكلمة مرور خاطئة
const isWrong = await verifyPassword(storedHash, "wrongPassword");PPPP
console.log(isWrong); // false
*/

/* Node.js crypto وتستخدم لتشفير وفك تشفير البيانات باستخدام خوارزميات التشفير المختلفة. في هذا المثال، يتم استخدام خوارزمية AES-256-CBC لتشفير وفك تشفير النصوص.

import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32) 
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const message = "Hello World";
const encrypted = encrypt(message);
const decrypted = decrypt(encrypted);

console.log({ encrypted, decrypted });
*/

/*
// استخدام مكتبة CryptoJS لتشفير وفك تشفير النصوص باستخدام خوارزمية AES. في هذا المثال، يتم تعريف مفتاح سري ثابت (secretKey) لتشفير وفك تشفير النصوص. يتم استخدام دالتين encrypt و decrypt لتشفير وفك تشفير النصوص على التوالي.
import CryptoJS from 'crypto-js';

const secretKey = "my-secret-key";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const message = "Hello World";
const encrypted = encrypt(message);
const decrypted = decrypt(encrypted);

console.log({ encrypted, decrypted });
*/

import { NODE_ENV } from "../config.js";

//Fixed  error  structure
export const globalErrorHandling = (error, req, res, next) => {
  const status = error.cause?.status ?? 500;
  const mood = NODE_ENV == "production";
  const defaultErrorMessage = "something went wrong Sever error";
  const displayErrorMessage = error.message || defaultErrorMessage;
  return res.status(status).json({
    error_message: mood
      ? status == 500
        ? defaultErrorMessage
        : displayErrorMessage
      : displayErrorMessage,
    cause: error.cause || undefined,
    stack: mood ? undefined : error.stack,
  });
};
