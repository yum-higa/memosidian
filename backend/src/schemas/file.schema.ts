const idParams = {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } }
}

const fileMetadata = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        folderId: { type: 'string', nullable: true },
        userId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    }
}

const fileWithContent = {
    type: 'object',
    properties: {
        ...fileMetadata.properties,
        content: { type: 'string' },
    }
}

export const listFilesSchema = {
    // クエリ文字列は常に string で届く。空文字は「フォルダ未所属のみ」の意味でルート層が null に変換する
    querystring: {
        type: 'object',
        properties: {
            folderId: { type: 'string' }
        },
        additionalProperties: false
    },
    response: {
        200: { type: 'array', items: fileMetadata }
    },
}

export const getFileSchema = {
    params: idParams,
    response: { 200: fileWithContent },
}

export const createFileSchema = {
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 255 },
            content: { type: 'string' },
            folderId: { type: 'string', nullable: true }
        },
        additionalProperties: false
    },
    response: { 201: fileWithContent },
}

export const updateFileSchema = {
    params: idParams,
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 255 },
            content: { type: 'string' },
            folderId: { type: 'string', nullable: true }
        },
        additionalProperties: false,
        minProperties: 1
    },
    response: { 200: fileWithContent },
}

export const deleteFileSchema = {
    params: idParams,
}

export const appendFileSchema = {
    params: idParams,
    body: {
        type: 'object',
        required: ['text'],
        properties: {
            text: { type: 'string', minLength: 1 }
        },
        additionalProperties: false
    },
    response: { 200: fileWithContent },
}
