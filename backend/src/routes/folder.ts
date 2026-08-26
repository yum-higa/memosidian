import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';
import { createFolder, listFolders, updateFolder } from '../services/folder';
import { createFolderSchema, listFoldersSchema, updateFolderSchema } from '../schemas/folder.schema';
import type { CreateFolderBody, FolderParams, UpdateFolderBody } from '../types/folder';
import { Forbidden, NotFound } from '../errors';

export default async function folderRoutes (fastify: FastifyInstance){
    fastify.get('/', {schema: listFoldersSchema }, async (request: FastifyRequest) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        return listFolders(user.userId);
    });

    fastify.post<{ Body: CreateFolderBody }>('/', { schema: createFolderSchema }, async (request, reply) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        const { name, parentId } = request.body;
        const folder = await createFolder(user.userId, name, parentId ?? null);
        return reply.status(201).send(folder);
    });

    fastify.patch<{ Params: FolderParams, Body: UpdateFolderBody }>('/:id', { schema: updateFolderSchema }, async(request) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        const {id} = request.params;
        return updateFolder(user.userId,id,request.body);
    });

}