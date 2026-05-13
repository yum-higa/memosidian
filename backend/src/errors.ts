import createError from "@fastify/error";

export const EmailInUse = createError('EMAIL_IN_USE', 'Email is already in use',409);
export const InvalidCredentials = createError('INVALID_CREDENTIALS','Invalid credentials', 401);
export const MissingJwt = createError('JWT_SECRET_MISSING', 'JWT_SECRET is missing', 500);
