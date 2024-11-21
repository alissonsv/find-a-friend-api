import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
	return argon2.hash(password, {
		type: argon2.argon2i,
	});
}

export async function verifyPassword(
	hashedPassword: string,
	password: string,
): Promise<boolean> {
	return argon2.verify(hashedPassword, password);
}
