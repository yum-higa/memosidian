import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export default async function authRoutes(fastify: FastifyInstance){

    fastify.setErrorHandler((error, request, reply) =>{
        reply.status(500).send({ ok: false });
    });

    fastify.post('/register', async (request, reply) => {
        const { email, password } = request.body as { email}
    });
}