const folderResponse = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        parentId: { type: 'string', nullable: true },
        userId: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
    }
}

export const listFoldersSchema = {
    response: {
        200: { type: 'array', items: folderResponse }
    },
}

export const createFolderSchema = {
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 255 },
            parentId: { type: 'string', nullable: true }
        },
        additionalProperties: false
    },
    response: { 201: folderResponse },
}

export const updateFolderSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 255 },
      parentId: { type: 'string', nullable: true }
    },
    additionalProperties: false,
    minProperties: 1
  },
  response: { 200: folderResponse }
}

export const deleteFolderSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } }
  }
}