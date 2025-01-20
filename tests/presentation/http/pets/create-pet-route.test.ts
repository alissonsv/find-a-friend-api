import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "#/app";
import { createAndAuthenticateOrg } from "#/tests/utils/test/create-and-authenticate-org";

describe("Create Pet (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("Should be able to create a new pet", async () => {
		const { token } = await createAndAuthenticateOrg(app);

		await request(app.server)
			.post("/pets")
			.auth(token, { type: "bearer" })
			.send({
				name: faker.word.words(),
				about: faker.word.words(),
				age: "ADULT",
				energyLevel: "MEDIUM",
				environment: "MEDIUM",
				size: "MEDIUM",
				requirements: [faker.word.sample(), faker.word.sample()],
				orgId: randomUUID(),
			})
			.expect(201);
	});
});
