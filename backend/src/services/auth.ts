import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { EmailInUse,InvalidCredentials,MissingJwt } from '../errors';

//this function shouldn't be exposed, thats why no export decralation
const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new MissingJwt();

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

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
        }
    });

    const token = generateToken(user.id);
    return { token }
}

const dummyHashPromise: Promise<string> = bcrypt.hash('__timing_dummy__',10);

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    const hash = user?.password ?? await dummyHashPromise;
    const isValid = await bcrypt.compare(password, hash);

    if (!isValid || !user) throw new InvalidCredentials;

    const token = generateToken(user.id);

    return { token }
}

//todo
// タイミング攻撃の理解
// bcrypt.compareの理解