import { faker } from "@faker-js/faker/.";
import type { FastifyInstance } from "fastify";
import request from "supertest";
import { prismaClient } from "#/lib/prisma";
import { hashPassword } from "#/utils/password-hash";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
	const email = faker.internet.email();
	const password = faker.internet.password();

	const hashedPassword = await hashPassword(password);

	await prismaClient.org.create({
		data: {
			name: faker.word.words(),
			email,
			password: hashedPassword,
			manager_name: faker.person.fullName(),
			whatsapp: faker.phone.number(),
			address: faker.location.streetAddress(),
			cep: faker.location.zipCode("########"),
			city: faker.location.city(),
		},
	});

	const authResponse = await request(app.server).post("/orgs/login").send({
		email,
		password,
	});

	const { token } = authResponse.body;

	return { token };
}
