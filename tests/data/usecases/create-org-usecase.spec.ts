import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import type { Org, Prisma } from "@prisma/client";

import { OrgAlreadyExistsError } from "#/data/errors/org-already-exists";
import { CreateOrgUseCase } from "#/data/usecases/create-org-usecase";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { fakeOrg } from "#/tests/mock/fake-org";

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

		async findByEmail(_email: string): Promise<Org | null> {
			return null;
		}
	}

	return new OrgRepositoryStub();
}

function makeSut() {
	const orgRepositoryStub = createOrgRepositoryStub();
	const sut = new CreateOrgUseCase(orgRepositoryStub);

	return { sut, orgRepositoryStub };
}

function createFakeOrgData() {
	return {
		address: faker.location.streetAddress(),
		cep: faker.location.countryCode(),
		city: faker.location.city(),
		email: faker.internet.email(),
		managerName: faker.person.fullName(),
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

	test("Should throw OrgAlreadyExistsError if email is taken", async () => {
		const { sut, orgRepositoryStub } = makeSut();
		const orgData = createFakeOrgData();

		jest
			.spyOn(orgRepositoryStub, "findByEmail")
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(fakeOrg);

		await sut.execute(orgData);
		await expect(() => sut.execute(orgData)).rejects.toThrow(
			new OrgAlreadyExistsError(),
		);
	});
});
