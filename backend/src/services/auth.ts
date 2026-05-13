import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { EmailInUse,MissingJwt } from '../errors';

const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw MissingJwt();

    return jwt.sign( { userId }, secret, { expiresIn: '7d'});
}

export async function registerUser(email: string, password: string){
    const existing = await prisma.user.findUnique(
        {
            where: { email }
        }
    );

    if (existing) {
        throw new EmailInUse();
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = prisma.user.create({
        data: {
            email,
            password: hashed,
        }
    });

    return { id: user.id, email: user.email }
    //ログイン、レジスターハンドルを思考
}