import prisma from '../lib/prisma';
import type { Folder } from '@prisma/client';
import { NotFound, Forbidden, InvalidFolderHierarchy } from '../errors';

const getOwnedFolder = async (userId: string, id: string): Promise<Folder> => {
    const targetFolder = await prisma.folder.findUnique({
        where:{
            id,
        }
    });
    if (!targetFolder) throw new NotFound();
    if (targetFolder.userId !== userId) throw new Forbidden();

    return targetFolder;
};

// 壊れたデータで祖先を辿り続けないための保険
const MAX_FOLDER_DEPTH = 100;

// parent を id の子孫にすると閉じたループができるので、parent の祖先を辿って id が現れないか確認する
const assertNoCycle = async (id: string, parent: Folder) => {
    let cursor = parent.parentId;
    let depth = 0;

    while (cursor) {
        if (cursor === id) throw new InvalidFolderHierarchy();
        if (++depth > MAX_FOLDER_DEPTH) throw new InvalidFolderHierarchy();

        const ancestor = await prisma.folder.findUnique({
            where: { id: cursor },
            select: { parentId: true },
        });
        cursor = ancestor?.parentId ?? null;
    }
};

export async function listFolders(userId: string) {
    return prisma.folder.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
    });
};

export async function createFolder(userId: string, name: string, parentId: string | null){
    if (parentId) await getOwnedFolder(userId, parentId);

    return prisma.folder.create({
        data: { name, parentId, userId },
    });
};

export async function updateFolder(
    userId: string,
    id: string,
    data: { name?: string; parentId?: string | null }
){
    // このフォルダが存在するか、自分のフォルダかをチェック
    await getOwnedFolder(userId,id);

    if (data.parentId === id) {
        throw new InvalidFolderHierarchy();
    }
    if (data.parentId) {
        const parent = await getOwnedFolder(userId, data.parentId);
        await assertNoCycle(id, parent);
    }
    return prisma.folder.update({
        where :{ id } ,
        data
    })
}

export async function deleteFolder (
    userId: string,
    id: string,
){
    await getOwnedFolder(userId,id);
    return prisma.folder.delete({
        where: { id }
    });
}