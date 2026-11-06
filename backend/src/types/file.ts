// file.schema.ts の各スキーマに対応するリクエストの型。スキーマを変えたらこちらも直すこと
export type FileParams = {
    id: string;
};

export type CreateFileBody = {
    name: string;
    content?: string;
    folderId?: string | null;
};

export type UpdateFileBody = {
    name?: string;
    content?: string;
    folderId?: string | null;
};

export type AppendFileBody = {
    text: string;
};

export type ListFilesQuery = {
    folderId?: string;
};
