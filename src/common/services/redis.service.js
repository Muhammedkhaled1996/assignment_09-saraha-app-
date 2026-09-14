import Redis from "ioredis";

export const revokeTokenKey = (userId, jti) => {
  return `revoked_token:${userId}:${jti}`;
};

const redisClient = new Redis(); // الاتصال بـ Redis

export const set = async (key, value, expireInSeconds) => {
  // EX تعني تحديد مدة الصلاحية بالثواني
  return await redisClient.set(key, value, "EX", expireInSeconds);
};

export const get = async (key) => {
  return await redisClient.get(key);
};
