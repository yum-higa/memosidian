import {type FastifyInstance, type FastifyRequest, type FastifyReply} from 'fastify';
import { listFolders } from '../services/folder';
import { listFoldersSchema } from '../schemas/folder.schema';
import { Forbidden } from '../errors';

export default async function folderRoutes (fastify: FastifyInstance){
    fastify.get('/', {schema: listFoldersSchema }, async (request: FastifyRequest) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        return listFolders(user.userId);
    });

}