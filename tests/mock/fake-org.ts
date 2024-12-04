import { randomUUID } from "node:crypto";

import { faker } from "@faker-js/faker/.";
import type { Org } from "@prisma/client";

export const fakeOrg: Org = {
	id: randomUUID(),
	address: faker.location.streetAddress(),
	cep: faker.location.countryCode(),
	city: faker.location.city(),
	email: faker.internet.email(),
	manager_name: faker.person.fullName(),
	name: faker.word.words(2),
	password: faker.internet.password(),
	whatsapp: faker.phone.number(),
	created_at: new Date(),
	updated_at: new Date(),
};
