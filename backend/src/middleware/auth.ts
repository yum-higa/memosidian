import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { MissingJwt } from '../errors';

export const verifyToken = async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'No Token Provided' });
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new MissingJwt;

    try {
        const decoded = jwt.verify(token, secret)
        if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
            request.user = { userId: decoded.userId as string };
        }
        else {
            return reply.status(401).send({ error: 'invalid token' });
        }
    } catch {
        return reply.status(401).send({ error: 'Invalid token'});
    }
}