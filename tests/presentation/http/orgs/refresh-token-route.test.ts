import { faker } from "@faker-js/faker/.";
import request from "supertest";
import { app } from "#/app";

describe("Refresh Token Route (e2e)", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	test("Should be able to refresh a token", async () => {
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

		const authResponse = await request(app.server).post("/orgs/login").send({
			email,
			password,
		});

		const cookies = authResponse.get("Set-Cookie");

		expect(cookies).toBeDefined();

		const response = await request(app.server)
			.patch("/orgs/token/refresh")
			.set("Cookie", cookies as string[])
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
		expect(response.get("Set-Cookie")).toEqual([
			expect.stringContaining("refreshToken="),
		]);
	});
});
