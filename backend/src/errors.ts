import createError from "@fastify/error";

export const EmailInUse = createError('EMAIL_IN_USE', 'Email is already in use',409);
export const InvalidCredentials = createError('INVALID_CREDENTIALS','Invalid credentials', 401);
export const MissingJwt = createError('JWT_SECRET_MISSING', 'JWT_SECRET is missing', 500);
export const NotFound = createError('NOT_FOUND', 'RESOURCE NOT FOUND', 404);
export const Forbidden = createError('FORBIDDEN', 'you do not have permission for this action', 403);
export const InvalidFolderHierarchy = createError('INVALID_FOLDER_HIERARCHY', 'a folder cannot be its own ancestor', 400);
