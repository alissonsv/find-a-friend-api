import { hashPassword, verifyPassword } from "#/utils/password-hash";

describe("PasswordHash", () => {
	it("Should hash a password successfully", async () => {
		await expect(hashPassword("test123")).resolves.not.toEqual("test123");
	});

	it("Should verify if a password is valid", async () => {
		const originalPassword = "test123";
		const hashedPassword = await hashPassword(originalPassword);

		await expect(
			verifyPassword(hashedPassword, originalPassword),
		).resolves.toEqual(true);
	});
});
