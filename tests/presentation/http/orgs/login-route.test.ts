import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "#/app";

describe("Login Route (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("Should be able to login", async () => {
		const email = faker.internet.email();
		const password = faker.internet.password({ length: 10 });

		await request(app.server)
			.post("/orgs")
			.send({
				name: faker.word.words(2),
				email,
				password,
				managerName: faker.person.fullName(),
				whatsapp: faker.phone.number(),
				address: faker.location.streetAddress(),
				cep: faker.location.zipCode("########"),
				city: faker.location.city(),
			});

		const response = await request(app.server).post("/orgs/login").send({
			email,
			password,
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});

	test("Should return 401 if credentials are invalid", async () => {
		await request(app.server)
			.post("/orgs/login")
			.send({
				email: "mail@mail.com",
				password: "123123",
			})
			.expect(401);
	});
});
