import { prismaClient } from "../src/lib/prisma";

async function deleteAllData() {
	const modelNames = Object.keys(prismaClient).filter(
		(key) => !["_", "$"].includes(key[0]),
	);

	for (let i = 0; i < modelNames.length; i++) {
		const modelName = modelNames[i];

		// biome-ignore lint/suspicious/noExplicitAny: used to allow modelName
		await (prismaClient as any)[modelName].deleteMany();
	}
}

beforeAll(async () => {
	await deleteAllData();
});

afterEach(async () => {
	await deleteAllData();
});
