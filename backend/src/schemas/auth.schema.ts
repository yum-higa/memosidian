export const registerSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8},
        },
        additionalProperties: false
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                token: { type: 'string' },
            },
        },
    },
}

export const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
    },
}