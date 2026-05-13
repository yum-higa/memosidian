import Fastify, { type FastifyError } from 'fastify'
import authRoutes from './routes/auth'

const fastify = Fastify({logger: true});

fastify.setErrorHandler((error: FastifyError, request,reply) =>{
    if (error.validation) {
        return reply.status(400).send({ error: 'invalid request body' });
    }
    const statusCode = error.statusCode ?? 500;
    return reply.status(statusCode).send({ error: error.message });
})

fastify.register(authRoutes, { prefix: '/api/auth'});

const start = async ()=> {
    try{
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();