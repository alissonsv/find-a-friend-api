import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "#/app";
import { prismaClient } from "#/lib/prisma";
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

		console.log(token);

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

		await prismaClient.org.deleteMany();
	});

	test("Should return 409 if email is already taken", async () => {
		const email = faker.internet.email();

		await request(app.server)
			.post("/orgs")
			.send({
				name: faker.word.words(2),
				email,
				password: faker.internet.password(),
				managerName: faker.person.fullName(),
				whatsapp: faker.phone.number(),
				address: faker.location.streetAddress(),
				cep: faker.location.zipCode("########"),
				city: faker.location.city(),
			});

		await request(app.server)
			.post("/orgs")
			.send({
				name: faker.word.words(2),
				email,
				password: faker.internet.password(),
				managerName: faker.person.fullName(),
				whatsapp: faker.phone.number(),
				address: faker.location.streetAddress(),
				cep: faker.location.zipCode("########"),
				city: faker.location.city(),
			})
			.expect(409);

		await prismaClient.org.deleteMany();
	});
});
