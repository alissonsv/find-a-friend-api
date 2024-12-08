import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "#/app";
import { prismaClient } from "#/lib/prisma";

describe("Register Org (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("Should be able to register a new org", async () => {
		await request(app.server)
			.post("/orgs")
			.send({
				name: faker.word.words(2),
				email: faker.internet.email(),
				password: faker.internet.password(),
				managerName: faker.person.fullName(),
				whatsapp: faker.phone.number(),
				address: faker.location.streetAddress(),
				cep: faker.location.zipCode("########"),
				city: faker.location.city(),
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
