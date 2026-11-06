// folder.schema.ts の各スキーマに対応するリクエストの型。スキーマを変えたらこちらも直すこと
export type CreateFolderBody = {
    name: string;
    parentId?: string | null;
};

export type UpdateFolderBody = {
    name?: string;
    parentId?: string | null;
};

export type FolderParams = {
    id: string;
};
