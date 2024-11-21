import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import type { Org, Prisma } from "@prisma/client";

import { CreateOrgUseCase } from "#/data/usecases/create-org-usecase";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";

function createOrgRepositoryStub(): IOrgRepository {
	class OrgRepositoryStub implements IOrgRepository {
		async create(data: Prisma.OrgCreateInput): Promise<Org> {
			return {
				...data,
				id: randomUUID(),
				created_at: new Date(),
				updated_at: new Date(),
			};
		}
	}
	return new OrgRepositoryStub();
}

function makeSut() {
	const orgRepositoryStub = createOrgRepositoryStub();
	const sut = new CreateOrgUseCase(orgRepositoryStub);

	return { sut };
}

function createFakeOrgData() {
	return {
		address: faker.location.streetAddress(),
		cep: faker.location.countryCode(),
		city: faker.location.city(),
		email: faker.internet.email(),
		manager_name: faker.person.fullName(),
		name: faker.word.words(2),
		password: faker.internet.password(),
		whatsapp: faker.phone.number(),
	};
}

describe("Create Org Usecase", () => {
	test("Should create an org and return it", async () => {
		const { sut } = makeSut();
		const orgData = createFakeOrgData();
		const { org } = await sut.execute(orgData);

		expect(org.id).toEqual(expect.any(String));
	});

	test("Should encrypt the password before saving it", async () => {
		const { sut } = makeSut();
		const orgData = createFakeOrgData();
		const { org } = await sut.execute(orgData);

		expect(org.password).not.toEqual(orgData.password);
	});
});
