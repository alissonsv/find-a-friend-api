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

	test("Should be able to get pet details joined with org details", async () => {
		const org = await prismaClient.org.create({
			data: {
				name: faker.word.words(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				manager_name: faker.person.fullName(),
				whatsapp: faker.phone.number(),
				address: faker.location.streetAddress(),
				cep: faker.location.zipCode("########"),
				city: faker.location.city(),
			},
		});

		const pet = await prismaClient.pet.create({
			data: {
				name: faker.word.words(),
				about: faker.word.words(),
				age: "ADULT",
				energy_level: "MEDIUM",
				environment: "MEDIUM",
				size: "MEDIUM",
				requirements: [faker.word.sample(), faker.word.sample()],
				org_id: org.id,
			},
		});

		const petDetailsResponse = await request(app.server).get(`/pets/${pet.id}`);

		expect(petDetailsResponse.statusCode).toBe(200);
		expect(petDetailsResponse.body.pet.id).toEqual(pet.id);
		expect(petDetailsResponse.body.pet.org.id).toEqual(org.id);
	});

	test("Should return 404 if pet does not exists", async () => {
		await request(app.server).get("/pets/123123123").expect(404);
	});
});
