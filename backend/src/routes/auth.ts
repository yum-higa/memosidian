import { type FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { REPL_MODE_SLOPPY } from 'node:repl';
import { loginUser, registerUser } from '../services/auth';

export default async function authRoutes(fastify: FastifyInstance){
    fastify.post('/register', { schema: registerSchema }, async (request, reply)=>{
        const { email, password } = request.body as { email: string, password: string }
        const { token } = await registerUser(email, password);
        //201はsuccessfully created
        return reply.status(201).send({ token });
    });

    fastify.post('/login',{ schema:loginSchema }, async (request, reply) =>{
        const { email, password } = request.body as { email: string, password: string};
        const { token } = await loginUser( email,password );
        //statusを省略すると自動的に200になる
        return reply.send({ token });
    })
}

//next action: middleware imp