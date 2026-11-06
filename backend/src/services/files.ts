import prisma from '../lib/prisma';
import type { File } from '@prisma/client';
import { NotFound, Forbidden } from '../errors';
import { getOwnedFolder } from './folder';
import type { UpdateFileBody } from '../types/file';


export const getOwnedFile = async (userId: string, id: string): Promise<File> => {
    const targetFile = await prisma.file.findUnique({
        where: {
            id,
        }
    })

    if(!targetFile) throw new NotFound();
    if(targetFile.userId !== userId) throw new Forbidden();

    return targetFile;
}

export const deleteFile = async (userId: string, id:string) => {
    await getOwnedFile(userId,id);
    return prisma.file.delete({
        where:{
            id,
        }
    });
}

export async function appendToFile(userId: string, id: string,text: string ){
    const targetFile = await getOwnedFile(userId,id);
    const newContent = targetFile.content + text;
    return prisma.file.update({
        where: {
            id,
        },
        data: {
            content: newContent,
        }
    });
}

export async function listFiles(userId: string, folderId?: string | null) {
    const where = folderId === undefined ? { userId } : { userId, folderId };

    return prisma.file.findMany({
        where,
        select: {
            id: true,
            name: true,
            folderId: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: { createdAt: 'asc' },
    });
}

export async function createFile(userId: string,name:string,content:string,folderId:string | null){
    if(folderId) await getOwnedFolder(userId,folderId);
    return prisma.file.create({
        data: {
            name,
            content,
            folderId,
            userId,
        }
    });
}

export async function updateFile(userId: string, id: string, data: UpdateFileBody) {
    await getOwnedFile(userId, id);

    if (data.folderId) await getOwnedFolder(userId, data.folderId);

    return prisma.file.update({
        where: { id },
        data,
    });
}
