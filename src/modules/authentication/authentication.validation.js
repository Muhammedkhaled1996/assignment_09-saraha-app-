import { z } from "zod";

export const login = z.strictObject({
  email: z.email(),
  password: z.string().min(6).max(16),
});

export const signup = login
  .safeExtend({
    userName: z.string(),
    confirmPassword: z.string().min(6).max(16),
    phone: z.e164(),
  })
  .superRefine((data, ctx) => {
    if (data.password != data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "password mismatch confirmPassword",
      });
    }
    if (!data.userName.includes(" ")) {
      ctx.addIssue({
        code: "custom",
        path: ["userName"],
        message: "userName must includes space between firstName and lastName",
      });
    }
  });

//   .refine(
//     (data) => {
//       return data.password == data.confirmPassword;
//     },
//     { message: "password mismatch confirmPassword", path: ["confirmPassword"] },
//   );
