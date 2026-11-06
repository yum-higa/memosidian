import { type FastifyInstance } from 'fastify';
import { getOwnedFile, listFiles } from '../services/files';
import { getFileSchema, listFilesSchema } from '../schemas/file.schema';
import type { FileParams, ListFilesQuery } from '../types/file';
import { Forbidden } from '../errors';

export default async function fileRoutes (fastify: FastifyInstance){
    fastify.get<{ Querystring: ListFilesQuery }>('/', { schema: listFilesSchema }, async (request) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        const { folderId } = request.query;
        // 空文字は「フォルダ未所属のみ」の意味なので null に変換する
        return listFiles(user.userId, folderId === '' ? null : folderId);
    });

    fastify.get<{ Params: FileParams }>('/:id', { schema: getFileSchema }, async (request) => {
        const user = request.user;
        if (!user) throw new Forbidden();
        const { id } = request.params;
        return getOwnedFile(user.userId, id);
    });

}
