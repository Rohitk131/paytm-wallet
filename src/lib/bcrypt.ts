import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function comparePassword(
    inputPassword: string,
    storedPassword: string
): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
}
